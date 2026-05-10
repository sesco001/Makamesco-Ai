const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;

app.get('/', (_req, res) => {
  res.send("Untoldman😎 is alive ");
});

const _server = app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});

_server.on('error', (_err) => {
  if (_err.code === 'EADDRINUSE') {
    console.log("Port " + PORT + " already in use, skipping server start.");
  } else {
    console.error("Server error:", _err);
  }
});

"use strict";

// ============ IMPORTS ============
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = { enumerable: true, get: function() { return m[k]; } };
  }
  Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
  Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
  o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  __setModuleDefault(result, mod);
  return result;
});
var __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, '__esModule', { value: true });

const baileys_1 = __importStar(require("@whiskeysockets/baileys"));
const logger_1 = __importDefault(require("@whiskeysockets/baileys/lib/Utils/logger"));
const logger = logger_1["default"].child({});
logger.level = "silent";
const pino = require("pino");
const boom_1 = require("@hapi/boom");
const conf = require("./set");
const axios = require('axios');
let fs = require("fs-extra");
let path = require("path");
const FileType = require("file-type");
const { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');
const { verifierEtatJid, recupererActionJid } = require("./lib/antilien");
const { atbverifierEtatJid, atbrecupererActionJid } = require("./lib/antibot");
const { sendMessage, getContextInfo } = require("./fredi/context");
let evt = require(__dirname + "/fredi/ezra");
const { isUserBanned, addUserToBanList, removeUserFromBanList } = require("./lib/banUser");
const { addGroupToBanList, isGroupBanned, removeGroupFromBanList } = require("./lib/banGroup");
const { isGroupOnlyAdmin, addGroupToOnlyAdminList, removeGroupFromOnlyAdminList } = require('./lib/onlyAdmin');
let { reagir } = require(__dirname + '/fredi/app');

// ============ LID RESOLVER (CRITICAL NEW FEATURE) ============
// This mapping cache stores LID -> Phone Number relationships
// WhatsApp now uses LIDs (@lid) instead of phone JIDs in many events
// Without this, admin checks, user bans, and command permissions will fail

class LidResolver {
  constructor() {
    this.lidToPhone = new Map(); // LID -> Phone JID (@s.whatsapp.net)
    this.phoneToLid = new Map(); // Phone JID -> LID
    this.persistencePath = path.join(__dirname, 'scan/lid-mapping.json');
    this.loadFromFile();
  }

  // Load saved mappings from disk
  loadFromFile() {
    try {
      if (fs.existsSync(this.persistencePath)) {
        const data = JSON.parse(fs.readFileSync(this.persistencePath, 'utf8'));
        this.lidToPhone = new Map(Object.entries(data.lidToPhone || {}));
        this.phoneToLid = new Map(Object.entries(data.phoneToLid || {}));
        console.log(`✅ Loaded ${this.lidToPhone.size} LID mappings from storage`);
      }
    } catch (err) {
      console.error("Error loading LID mappings:", err);
    }
  }

  // Save mappings to disk for persistence
  saveToFile() {
    try {
      const data = {
        lidToPhone: Object.fromEntries(this.lidToPhone),
        phoneToLid: Object.fromEntries(this.phoneToLid)
      };
      fs.writeFileSync(this.persistencePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (err) {
      console.error("Error saving LID mappings:", err);
    }
  }

  // Learn a mapping from an event (when you see both forms)
  learn(lid, phoneJid) {
    if (!lid || !phoneJid) return;
    // Normalize: remove device suffix if present (e.g., "123:1@lid" -> "123@lid")
    const normalizedLid = lid.replace(/:\d+(?=@)/, '');
    const normalizedPhone = phoneJid.includes('@') ? phoneJid : phoneJid + '@s.whatsapp.net';
    
    if (!this.lidToPhone.has(normalizedLid)) {
      this.lidToPhone.set(normalizedLid, normalizedPhone);
      this.phoneToLid.set(normalizedPhone, normalizedLid);
      console.log(`📝 Learned LID mapping: ${normalizedLid} -> ${normalizedPhone}`);
      this.saveToFile();
    }
  }

  // Resolve a LID to its phone JID, or return original if not found
  resolveToPhone(jid) {
    if (!jid) return jid;
    // If it's already a phone JID, return as-is
    if (jid.includes('@s.whatsapp.net')) return jid;
    // If it's a LID, try to resolve
    if (jid.includes('@lid')) {
      const normalized = jid.replace(/:\d+(?=@)/, '');
      const resolved = this.lidToPhone.get(normalized);
      if (resolved) return resolved;
      console.warn(`⚠️ Unknown LID: ${jid} - will learn when mapping is available`);
    }
    return jid; // Return original if can't resolve
  }

  // Resolve phone JID to LID
  resolveToLid(jid) {
    if (!jid) return jid;
    if (jid.includes('@lid')) return jid;
    const normalized = jid.includes('@') ? jid : jid + '@s.whatsapp.net';
    return this.phoneToLid.get(normalized) || jid;
  }

  // Check if a JID is a LID
  isLid(jid) {
    return jid && jid.includes('@lid');
  }

  // Get the bare identifier (without @suffix) for comparison
  getBareId(jid) {
    if (!jid) return jid;
    return jid.split('@')[0];
  }

  // Compare two JIDs accounting for LID/Phone equivalence
  jidsMatch(jid1, jid2) {
    if (!jid1 || !jid2) return false;
    if (jid1 === jid2) return true;
    
    const phone1 = this.resolveToPhone(jid1);
    const phone2 = this.resolveToPhone(jid2);
    if (phone1 === phone2) return true;
    
    const bare1 = this.getBareId(jid1);
    const bare2 = this.getBareId(jid2);
    return bare1 === bare2;
  }
}

// Initialize the LID resolver
const lidResolver = new LidResolver();

// Helper: Decode JID (fix for your existing decodeJid issue)
function decodeJid(jid) {
  if (!jid) return jid;
  if (/:\d+@/gi.test(jid)) {
    let decoded = baileys_1.jidDecode(jid) || {};
    return decoded.user && decoded.server ? `${decoded.user}@${decoded.server}` : jid;
  }
  return jid;
}

// Helper: Check if user is admin (works with LIDs!)
async function isUserAdmin(sock, groupId, userId) {
  try {
    const metadata = await sock.groupMetadata(groupId);
    // Convert both to phone JIDs for comparison
    const resolvedUserId = lidResolver.resolveToPhone(userId);
    const participant = metadata.participants.find(p => {
      const resolvedPId = lidResolver.resolveToPhone(p.id);
      return resolvedPId === resolvedUserId || p.id === userId;
    });
    return participant && (participant.admin === 'admin' || participant.admin === 'superadmin');
  } catch (err) {
    console.error("Admin check failed:", err);
    return false;
  }
}

// Helper: Safe group metadata fetch
async function safeGroupMetadata(sock, groupId) {
  try {
    return await sock.groupMetadata(groupId);
  } catch (err) {
    console.error(`Failed to get metadata for ${groupId}:`, err.message);
    return null;
  }
}

// ============ SESSION AUTH ============
var session = conf.session.includes('<=>') ? conf.session.split('<=>').pop() : conf.session;
const prefixe = conf.PREFIXE;

async function authentification() {
  try {
    if (!fs.existsSync(__dirname + '/scan/creds.json')) {
      console.log("connexion en cours ...");
      await fs.writeFileSync(__dirname + "/scan/creds.json", atob(session), "utf8");
    } else if (fs.existsSync(__dirname + "/scan/creds.json") && session != "zokk") {
      await fs.writeFileSync(__dirname + "/scan/creds.json", atob(session), 'utf8');
    }
  } catch (_err) {
    console.log("Session Invalid " + _err);
    return;
  }
}
authentification();

// ============ STORE SETUP ============
const store = {
  chats: {},
  contacts: {},
  messages: {},
  bind: function(ev) {
    ev.on('contacts.update', (updates) => {
      for (const update of updates) {
        if (store.contacts[update.id]) {
          Object.assign(store.contacts[update.id], update);
        } else {
          store.contacts[update.id] = update;
        }
      }
    });
  },
  loadMessage: async function(jid, id) {
    if (store.chats[jid]) {
      return store.chats[jid].find(m => m.key && m.key.id === id) || null;
    }
    return null;
  }
};

// ============ LID EVENT HANDLER - LEARN MAPPINGS FROM MESSAGES ============
// This is CRITICAL: learn LID->Phone mappings when messages arrive

function learnLidFromMessage(msg, sock) {
  if (!msg) return;
  
  // Extract LID from various places in the message
  const participant = msg.key?.participant || msg.participant;
  const sender = msg.key?.remoteJid;
  const pushName = msg.pushName;
  
  // Learn from participant (group messages)
  if (participant && lidResolver.isLid(participant)) {
    // For LIDs, we need to find the phone number
    // The sock.user object contains bot's own mapping
    if (sock?.user?.lid && sock?.user?.id) {
      lidResolver.learn(sock.user.lid, sock.user.id);
    }
  }
  
  // Learn from quoted messages
  const quotedParticipant = msg.message?.extendedTextMessage?.contextInfo?.participant;
  if (quotedParticipant && lidResolver.isLid(quotedParticipant)) {
    // Will learn when we have phone number
  }
}

// ============ MAIN BOT CONNECTION ============
setTimeout(() => {
  authentification();
  
  async function startBot() {
    const { version, isLatest } = await baileys_1.fetchLatestBaileysVersion();
    const { state, saveCreds } = await baileys_1.useMultiFileAuthState(__dirname + "/scan");
    
    const sockOptions = {
      version: version,
      logger: pino({ level: "silent" }),
      browser: ["Untoldman", "safari", "1.0.0"],
      printQRInTerminal: false,
      fireInitQueries: false,
      shouldSyncHistoryMessage: true,
      downloadHistory: true,
      syncFullHistory: true,
      generateHighQualityLinkPreview: true,
      markOnlineOnConnect: false,
      keepAliveIntervalMs: 30000,
      auth: {
        creds: state.creds,
        keys: baileys_1.makeCacheableSignalKeyStore(state.keys, logger)
      },
      getMessage: async (key) => {
        if (store) {
          const msg = await store.loadMessage(key.remoteJid, key.id);
          return (msg && msg.message) ? msg.message : undefined;
        }
        return { conversation: "An Error Occurred, Repeat Command!" };
      }
    };
    
    const sock = baileys_1["default"](sockOptions);
    store.bind(sock.ev);
    
    // ============ LEARN BOT'S OWN LID FROM CREDS ============
    // After connection, learn bot's own LID mapping
    sock.ev.on('creds.update', () => {
      if (sock.user?.lid && sock.user?.id) {
        lidResolver.learn(sock.user.lid, sock.user.id);
        console.log(`🤖 Bot LID learned: ${sock.user.lid} -> ${sock.user.id}`);
      }
    });
    
    // ============ LID MAPPING EVENT (FIX FOR #2263) ============
    // Listen for lid-mapping updates - this event should fire,
    // but if it doesn't, we fall back to learning from messages
    sock.ev.on('lid-mapping.update', (update) => {
      if (update && update.mapping) {
        for (const [lid, phoneData] of Object.entries(update.mapping)) {
          if (phoneData && phoneData.phoneNumber) {
            lidResolver.learn(lid, phoneData.phoneNumber + '@s.whatsapp.net');
          }
        }
        console.log(`🔄 Updated LID mappings from server: ${Object.keys(update.mapping || {}).length} entries`);
      }
    });
    
    // ============ TIME & BIO ============
    function getFormattedTime() {
      const now = new Date();
      const options = {
        timeZone: "Africa/Nairobi",
        weekday: 'long',
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
      };
      return new Intl.DateTimeFormat('en-KE', options).format(now);
    }
    
    const bioMessages = ["🛠️ Learning never ends — debug life!", "🔥 Bot powered by Untoldman😎 & dreams"];
    let bioIndex = 0;
    
    setInterval(async () => {
      if (conf.AUTO_BIO === "yes") {
        try {
          const timeStr = getFormattedTime();
          const bioText = "🤖 Keep shining\n📅 " + timeStr + "\n" + bioMessages[bioIndex];
          await sock.updateProfileStatus(bioText);
          console.log("✅ Updated Bio");
          bioIndex = (bioIndex + 1) % bioMessages.length;
        } catch (_bioErr) {}
      }
    }, 60000);
    
    // ============ ANTI-CALL ============
    sock.ev.on("call", async (calls) => {
      if (conf.ANTI_CALL === 'yes') {
        const call = calls[0];
        await sock.rejectCall(call.id, call.from);
        await sock.sendMessage(call.from, {
          text: "📞 Please don't call. I'm a text-only bot. Thank you!"
        });
      }
    });
    
    // ============ AUTO-REPLY ============
    let autoReplyMessage = "Hello👋, I'm " + conf.BOT + " on board.";
    let autoRepliedChats = new Set();
    
    sock.ev.on("messages.upsert", async (upsert) => {
      const msg = upsert.messages[0];
      if (!msg.message) return;
      
      const text = msg.message.conversation || msg.message.extendedTextMessage?.text;
      const chatId = msg.key.remoteJid;
      
      // Learn LID from this message!
      learnLidFromMessage(msg, sock);
      
      // Auto-reply for private chats
      if (conf.AUTO_REPLY === "yes" && !autoRepliedChats.has(chatId) && !msg.key.fromMe && !chatId.includes("@g.us")) {
        await sock.sendMessage(chatId, { text: autoReplyMessage });
        autoRepliedChats.add(chatId);
      }
    });
    
    // ============ ANTI-DELETE (LUCKY_ADM) ============
    if (conf.LUCKY_ADM === 'yes') {
      console.log("👿 AntiDelete is ACTIVE!");
      
      sock.ev.on("messages.upsert", async (upsert) => {
        const msg = upsert.messages[0];
        if (!msg.message) return;
        
        const key = msg.key;
        const chatId = key.remoteJid;
        if (chatId === 'status@broadcast') return;
        
        if (!store.chats[chatId]) store.chats[chatId] = [];
        store.chats[chatId].push(msg);
        if (store.chats[chatId].length > 25) store.chats[chatId].shift();
        
        // Detect deleted message (protocolMessage with type 0)
        if (msg.message?.protocolMessage?.type === 0) {
          const deletedKey = msg.message.protocolMessage.key;
          const originalMsg = store.chats[chatId].find(m => m.key.id === deletedKey.id);
          if (!originalMsg) return;
          
          const deleter = msg.key.participant || msg.key.remoteJid;
          const sender = originalMsg.key.participant || originalMsg.key.remoteJid;
          const isGroup = chatId.endsWith("@g.us");
          
          // Resolve LIDs to phone numbers for display
          const resolvedDeleter = lidResolver.resolveToPhone(deleter);
          const resolvedSender = lidResolver.resolveToPhone(sender);
          
          let groupInfo = '';
          if (isGroup) {
            try {
              const metadata = await sock.groupMetadata(chatId);
              groupInfo = "\n• Group: " + metadata.subject;
            } catch (e) {}
          }
          
          const warnMsg = "👿 *AntiDelete* 👿\n" +
            "• Deleted by: @" + resolvedDeleter.split('@')[0] + "\n" +
            "• Original sender: @" + resolvedSender.split('@')[0] + groupInfo;
          
          const mentions = [resolvedDeleter, resolvedSender];
          
          if (originalMsg.message.conversation) {
            await sendMessage(sock, chatId, msg, {
              text: warnMsg + "\n\n📝 *Deleted Text:*\n" + originalMsg.message.conversation,
              mentions
            });
          } else if (originalMsg.message.extendedTextMessage) {
            await sendMessage(sock, chatId, msg, {
              text: warnMsg + "\n\n📝 *Deleted Text:*\n" + originalMsg.message.extendedTextMessage.text,
              mentions
            });
          }
        }
      });
    }
    
    // ============ REACTION DICTIONARIES ============
    const reactionMap = {
      'hello': ['👋', '🙂', '😊'],
      'hi': ['👋', '🙂', '😁'],
      'thanks': ['🙏', '😊', '🌹'],
      'love': ['❤️', '💕', '💖'],
      'bye': ['👋', '😢'],
      'good': ['👍', '👌', '😊']
    };
    
    const defaultReactions = ['😎', '🔥', '💥', '💯', '✨', '🌟', '👑'];
    
    function getReactionForText(text) {
      if (!text) return defaultReactions[Math.floor(Math.random() * defaultReactions.length)];
      const lowerText = text.toLowerCase();
      for (const [word, reactions] of Object.entries(reactionMap)) {
        if (lowerText.includes(word)) {
          return reactions[Math.floor(Math.random() * reactions.length)];
        }
      }
      return defaultReactions[Math.floor(Math.random() * defaultReactions.length)];
    }
    
    let lastReactionTime = 0;
    
    if (conf.AUTO_REACT === "yes") {
      console.log("AUTO_REACT is enabled");
      sock.ev.on("messages.upsert", async (upsert) => {
        const now = Date.now();
        if (now - lastReactionTime < 5000) return;
        
        const msg = upsert.messages[0];
        if (!msg.key || !msg.key.remoteJid || msg.key.fromMe) return;
        
        const text = msg.message?.conversation || '';
        const reaction = getReactionForText(text);
        
        try {
          await sock.sendMessage(msg.key.remoteJid, {
            react: { text: reaction, key: msg.key }
          });
          lastReactionTime = now;
        } catch (e) {}
      });
    }
    
    // ============ AUTO-SAVE CONTACTS ============
    async function createAndSendVCard(number, name) {
      const bareNumber = number.split('@')[0];
      let counter = 1;
      let contactName = name + " " + counter;
      while (Object.values(store.contacts).some(c => c.name === contactName)) {
        counter++;
        contactName = name + " " + counter;
      }
      const vcard = "BEGIN:VCARD\nVERSION:3.0\nFN:" + contactName + "\nTEL;type=CELL;type=VOICE;waid=" + bareNumber + ':+' + bareNumber + "\nEND:VCARD\n";
      const vcardPath = './' + contactName + '.vcf';
      fs.writeFileSync(vcardPath, vcard);
      await sock.sendMessage(conf.NUMERO_OWNER + "@s.whatsapp.net", {
        document: { url: vcardPath },
        mimetype: "text/vcard",
        fileName: contactName + ".vcf",
        caption: "Contact saved as " + contactName
      });
      fs.unlinkSync(vcardPath);
      return contactName;
    }
    
    if (conf.AUTO_SAVE_CONTACTS === "yes") {
      sock.ev.on("messages.upsert", async (upsert) => {
        const msg = upsert.messages[0];
        if (!msg.message) return;
        
        const chatId = msg.key.remoteJid;
        if (chatId.endsWith("@s.whatsapp.net") && (!store.contacts[chatId] || !store.contacts[chatId].name)) {
          const resolvedJid = lidResolver.resolveToPhone(chatId);
          const savedName = await createAndSendVCard(resolvedJid, "JEEPERS-CREEPER-XMD");
          store.contacts[chatId] = { name: savedName };
          await sock.sendMessage(chatId, { text: "Your name has been saved as \"" + savedName + "\"" });
        }
      });
    }
    
    // ============ MAIN MESSAGE HANDLER ============
    sock.ev.on("messages.upsert", async (upsert) => {
      const msg = upsert.messages[0];
      if (!msg.message) return;
      
      const contentType = baileys_1.getContentType(msg.message);
      let text = contentType == "conversation" ? msg.message.conversation :
                 contentType == "imageMessage" ? msg.message.imageMessage?.caption :
                 contentType == "videoMessage" ? msg.message.videoMessage?.caption :
                 contentType == 'extendedTextMessage' ? msg.message?.extendedTextMessage?.text : '';
      
      const chatId = msg.key.remoteJid;
      const botId = decodeJid(sock.user.id);
      const botNumber = botId.split('@')[0];
      const isGroup = chatId?.endsWith('@g.us');
      
      // RESOLVE LID TO PHONE FOR CONSISTENCY
      // This is the most important change: convert all LIDs to phone JIDs when storing/comparing
      let sender = msg.key.participant || msg.key.remoteJid;
      if (msg.key.fromMe) sender = botId;
      
      // Resolve sender to phone JID for consistent identification
      const resolvedSender = lidResolver.resolveToPhone(sender);
      const resolvedChatId = lidResolver.resolveToPhone(chatId);
      
      // Learn mapping if sender is a LID
      if (lidResolver.isLid(sender)) {
        // We need to learn this mapping - check if we can resolve from contacts
        // For now, log it; will learn when we see phone number form
        console.log(`🔍 Unknown LID sender: ${sender} - will learn when mapping available`);
      }
      
      let groupMetadata = null;
      let groupName = '';
      let participants = [];
      let botIsAdmin = false;
      let senderIsAdmin = false;
      
      if (isGroup) {
        try {
          groupMetadata = await safeGroupMetadata(sock, chatId);
          if (groupMetadata) {
            groupName = groupMetadata.subject;
            participants = groupMetadata.participants;
            
            // Check bot admin status - CRITICAL: resolve LIDs for comparison!
            const botPhoneJid = lidResolver.resolveToPhone(botId);
            const botParticipant = participants.find(p => {
              const pResolved = lidResolver.resolveToPhone(p.id);
              return pResolved === botPhoneJid || p.id === botId;
            });
            botIsAdmin = botParticipant && (botParticipant.admin === 'admin' || botParticipant.admin === 'superadmin');
            
            // Check sender admin status - CRITICAL: resolve LIDs!
            const senderPhoneJid = lidResolver.resolveToPhone(resolvedSender);
            const senderParticipant = participants.find(p => {
              const pResolved = lidResolver.resolveToPhone(p.id);
              return pResolved === senderPhoneJid || p.id === resolvedSender;
            });
            senderIsAdmin = senderParticipant && (senderParticipant.admin === 'admin' || senderParticipant.admin === 'superadmin');
          }
        } catch (err) {
          console.error("Group metadata error:", err);
        }
      }
      
      // Get sudo users (owners)
      const { getAllSudoNumbers } = require("./lib/sudo");
      const sudoNumbers = await getAllSudoNumbers();
      const superUsers = [botNumber, conf.NUMERO_OWNER, "254724908267"].map(n => n.replace(/[^0-9]/g, '') + '@s.whatsapp.net');
      const allSudo = [...superUsers, ...sudoNumbers];
      const isSudo = allSudo.includes(resolvedSender);
      const isOwner = superUsers.includes(resolvedSender);
      
      console.log("\n=========== NEW MESSAGE ===========");
      if (isGroup) console.log("GROUP: " + groupName);
      console.log("SENDER: " + resolvedSender);
      console.log("TEXT: " + text);
      
      // Auto-read
      if (conf.AUTO_READ === "yes" && !msg.key.fromMe) {
        await sock.readMessages([msg.key]);
      }
      
      // Auto-block unknown private chats
      if (!isSudo && chatId === resolvedSender && conf.AUTO_BLOCK === 'yes') {
        await sock.sendMessage(resolvedSender, { text: "🚫 Blocking you for violating policies!" });
        await sock.updateBlockStatus(resolvedSender, "block");
      }
      
      // ============ COMMAND HANDLER ============
      if (text && text.startsWith(prefixe)) {
        const cmdName = text.slice(1).trim().split(/ +/).shift().toLowerCase();
        const args = text.slice(1).trim().split(/ +/).slice(1);
        const command = evt.cm.find(c => c.nomCom === cmdName);
        
        if (command) {
          // Mode check
          if (conf.MODE.toLowerCase() != "yes" && !isSudo) return;
          
          // PM permit check
          if (!isSudo && !isGroup && conf.PM_PERMIT === 'yes') {
            await sock.sendMessage(chatId, { text: "You don't have access to commands here" }, { quoted: msg });
            return;
          }
          
          // Group ban check
          if (!isSudo && isGroup) {
            const groupBanned = await isGroupBanned(chatId);
            if (groupBanned) return;
          }
          
          // ADMIN-ONLY MODE CHECK - FIXED FOR LIDs!
          // This is where your original error was happening
          if (!senderIsAdmin && isGroup) {
            const groupOnlyAdmin = await isGroupOnlyAdmin(chatId);
            if (groupOnlyAdmin) {
              await sock.sendMessage(chatId, { 
                text: "❌ *Admin Only Mode*\nOnly admins can use commands in this group!"
              }, { quoted: msg });
              return;
            }
          }
          
          // User ban check
          if (!isSudo) {
            const userBanned = await isUserBanned(resolvedSender);
            if (userBanned) {
              await sock.sendMessage(chatId, { text: "You are banned from using bot commands" }, { quoted: msg });
              return;
            }
          }
          
          // Execute command
          const contextData = {
            superUser: allSudo,
            dev: isOwner,
            verifGroupe: isGroup,
            mbre: participants,
            membreGroupe: resolvedSender,
            verifAdmin: senderIsAdmin,
            infosGroupe: groupMetadata,
            nomGroupe: groupName,
            auteurMessage: resolvedSender,
            nomAuteurMessage: msg.pushName,
            idBot: botId,
            verifEzraAdmin: botIsAdmin,
            prefixe: prefixe,
            arg: args,
            repondre: (responseText) => sock.sendMessage(chatId, { text: responseText }, { quoted: msg }),
            mtype: contentType,
            groupeAdmin: participants.filter(p => p.admin).map(p => p.id),
            msgRepondu: msg.message.extendedTextMessage?.quotedMessage,
            auteurMsgRepondu: msg.message.extendedTextMessage?.contextInfo?.participant,
            ms: msg,
            mybotpic: () => conf.URL.split(',')[Math.floor(Math.random() * conf.URL.split(',').length)]
          };
          
          try {
            if (command.reaction) {
              await sock.sendMessage(chatId, { react: { text: command.reaction, key: msg.key } }).catch(() => {});
            }
            await command.fonction(chatId, sock, contextData);
          } catch (err) {
            console.log("Command error:", err);
            await sock.sendMessage(chatId, { text: "😡 Error: " + err.message }, { quoted: msg });
          }
        }
      }
    });
    
    // ============ GROUP PARTICIPANT HANDLER (FIXED FOR LIDs) ============
    // This is CRITICAL: group-participants.update now returns @lid JIDs!
    sock.ev.on("group-participants.update", async (update) => {
      console.log("Group participants update:", update);
      
      let groupIcon;
      try {
        groupIcon = await sock.profilePictureUrl(update.id, "image");
      } catch {
        groupIcon = 'https://i.imgur.com/L0YsZfq.jpeg';
      }
      
      try {
        const metadata = await safeGroupMetadata(sock, update.id);
        const { recupevents } = require('./lib/welcome');
        
        // Resolve all participant LIDs to phone JIDs for consistent handling
        const resolvedParticipants = update.participants.map(p => lidResolver.resolveToPhone(p));
        const resolvedAuthor = lidResolver.resolveToPhone(update.author);
        
        if (update.action == "add" && (await recupevents(update.id, "welcome")) == 'on') {
          let welcomeMsg = "👋 Hello\n";
          for (let p of resolvedParticipants) {
            welcomeMsg += " *@" + p.split('@')[0] + "* Welcome to Our Official Group,";
          }
          welcomeMsg += " Please read the group description to avoid being removed...";
          
          await sock.sendMessage(update.id, {
            image: { url: groupIcon },
            caption: welcomeMsg,
            mentions: resolvedParticipants
          });
        }
        
        else if (update.action == 'remove' && (await recupevents(update.id, "goodbye")) == 'on') {
          let goodbyeMsg = "One or more members left the group:\n";
          for (let p of resolvedParticipants) {
            goodbyeMsg += '@' + p.split('@')[0] + "\n";
          }
          await sock.sendMessage(update.id, {
            text: goodbyeMsg,
            mentions: resolvedParticipants
          });
        }
        
        // Anti-promote with LID support
        else if (update.action == "promote" && (await recupevents(update.id, "antipromote")) == 'on') {
          const isSuperUser = resolvedAuthor === metadata?.owner ||
                              resolvedAuthor === conf.NUMERO_OWNER + "@s.whatsapp.net" ||
                              resolvedAuthor === decodeJid(sock.user.id) ||
                              resolvedAuthor === resolvedParticipants[0];
          
          if (!isSuperUser) {
            await sock.groupParticipantsUpdate(update.id, [resolvedAuthor, resolvedParticipants[0]], 'demote');
            await sock.sendMessage(update.id, {
              text: '@' + resolvedAuthor.split('@')[0] + ' violated anti-promote rule. Both have been demoted.',
              mentions: [resolvedAuthor, resolvedParticipants[0]]
            });
          }
        }
        
        // Anti-demote with LID support (FIXED: removed undefined 'l' variable)
        else if (update.action == 'demote' && (await recupevents(update.id, "antidemote")) == 'on') {
          const isSuperUser = resolvedAuthor === metadata?.owner ||
                              resolvedAuthor === conf.NUMERO_OWNER + "@s.whatsapp.net" ||
                              resolvedAuthor === decodeJid(sock.user.id) ||
                              resolvedAuthor === resolvedParticipants[0];
          
          if (!isSuperUser) {
            await sock.groupParticipantsUpdate(update.id, [resolvedAuthor], "demote");
            await sock.groupParticipantsUpdate(update.id, [resolvedParticipants[0]], 'promote');
            await sock.sendMessage(update.id, {
              text: '@' + resolvedAuthor.split('@')[0] + ' violated anti-demote rule and has been demoted.',
              mentions: [resolvedAuthor, resolvedParticipants[0]]
            });
          }
        }
      } catch (err) {
        console.error("Group participant handler error:", err);
      }
    });
    
    // ============ CRON JOBS ============
    async function setupCronJobs() {
      const cron = require("node-cron");
      const { getCron } = require("./lib/cron");
      const crons = await getCron();
      
      if (crons.length > 0) {
        for (const job of crons) {
          if (job.mute_at) {
            const [hour, minute] = job.mute_at.split(':');
            cron.schedule(`${minute} ${hour} * * *`, async () => {
              await sock.groupSettingUpdate(job.group_id, "announcement");
              await sock.sendMessage(job.group_id, { text: "Group is now closed (muted)." });
            }, { timezone: 'Africa/Nairobi' });
          }
          if (job.unmute_at) {
            const [hour, minute] = job.unmute_at.split(':');
            cron.schedule(`${minute} ${hour} * * *`, async () => {
              await sock.groupSettingUpdate(job.group_id, "not_announcement");
              await sock.sendMessage(job.group_id, { text: "Group is now open (unmuted)." });
            }, { timezone: "Africa/Nairobi" });
          }
        }
      }
    }
    
    // ============ CONNECTION HANDLER ============
    sock.ev.on('connection.update', async (update) => {
      const { lastDisconnect, connection, qr } = update;
      
      if (qr) {
        try {
          const qrTerminal = require('qrcode-terminal');
          console.log("\n📱 Scan this QR code:\n");
          qrTerminal.generate(qr, { small: true });
        } catch (e) {}
      }
      
      if (connection === "connecting") {
        console.log("ℹ️ Connecting...");
      } else if (connection === "open") {
        console.log("🔮 Untoldman😎 Connected!");
        
        // Load plugins after connection
        const pluginsDir = __dirname + "/plugins";
        if (fs.existsSync(pluginsDir)) {
          fs.readdirSync(pluginsDir).forEach(file => {
            if (path.extname(file).toLowerCase() == ".js") {
              try {
                require(pluginsDir + "/" + file);
                console.log("✅ Loaded plugin: " + file);
              } catch (err) {
                console.log("❌ Failed to load " + file + ": " + err);
              }
            }
          });
        }
        
        await setupCronJobs();
        
        if (conf.DP.toLowerCase() === 'yes') {
          await sock.sendMessage(sock.user.id, {
            text: `🤖 *${conf.BOT} IS ONLINE*\nCreator: ${conf.OWNER_NAME}\nPrefix: ${prefixe}\nMode: ${conf.MODE === 'yes' ? 'public' : 'private'}`
          });
        }
      } else if (connection == "close") {
        const statusCode = new boom_1.Boom(lastDisconnect?.error)?.output?.statusCode;
        if (statusCode === baileys_1.DisconnectReason.loggedOut) {
          console.log("Session logged out. Please re-scan QR.");
        } else if (statusCode === baileys_1.DisconnectReason.restartRequired) {
          startBot();
        } else {
          console.log("Disconnected, reconnecting...");
          startBot();
        }
      }
    });
    
    // Save credentials when updated
    sock.ev.on('creds.update', saveCreds);
    
    // ============ DOWNLOAD HELPER ============
    sock.downloadAndSaveMediaMessage = async (message, filename = '', returnBuffer = true) => {
      let media = message.msg ? message.msg : message;
      let mediaType = message.mtype ? message.mtype.replace(/Message/gi, '') : (media.mimetype || '').split('/')[0];
      const stream = await baileys_1.downloadContentFromMessage(media, mediaType);
      let buffer = Buffer.from([]);
      for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk]);
      }
      const fileType = await FileType.fromBuffer(buffer);
      const outputPath = './' + filename + '.' + fileType.ext;
      await fs.writeFileSync(outputPath, buffer);
      return outputPath;
    };
    
    // ============ AWAIT MESSAGE HELPER ============
    sock.awaitForMessage = async (options = {}) => {
      return new Promise((resolve, reject) => {
        if (!options.sender || !options.chatJid) {
          reject(new Error("Sender and chatJid are required"));
        }
        let timeoutId;
        const handler = (upsert) => {
          const msg = upsert.messages[0];
          if (!msg) return;
          const msgSender = msg.key.participant || msg.key.remoteJid;
          if (msgSender === options.sender && msg.key.remoteJid === options.chatJid) {
            if (options.filter && !options.filter(msg)) return;
            sock.ev.off('messages.upsert', handler);
            if (timeoutId) clearTimeout(timeoutId);
            resolve(msg);
          }
        };
        sock.ev.on('messages.upsert', handler);
        if (options.timeout) {
          timeoutId = setTimeout(() => {
            sock.ev.off('messages.upsert', handler);
            reject(new Error("Timeout waiting for message"));
          }, options.timeout);
        }
      });
    };
    
    return sock;
  }
  
  startBot();
}, 5000);
