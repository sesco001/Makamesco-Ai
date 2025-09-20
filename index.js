const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
  res.send("MAKAMESCO MD IS ALIVE ");
});

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});

"use strict";

// WhatsApp bot implementation using Baileys library
const {
  default: makeWASocket,
  fetchLatestBaileysVersion,
  useMultiFileAuthState,
  makeInMemoryStore,
  makeCacheableSignalKeyStore,
  delay,
  jidDecode,
  getContentType,
  decodeJid
} = require('@whiskeysockets/baileys');

const logger = require("@whiskeysockets/baileys/lib/Utils/logger").default.child({});
logger.level = "silent";
const pino = require("pino");
const { Boom } = require("@hapi/boom");
const conf = require("./set");
const axios = require("axios");
const fs = require('fs-extra');
const path = require("path");
const FileType = require("file-type");
const { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');

// Import utility functions
const {
  verifierEtatJid,
  recupererActionJid
} = require("./lib/antilien");

const {
  atbverifierEtatJid,
  atbrecupererActionJid
} = require("./lib/antibot");

const {
  sendMessage,
  getContextInfo
} = require('./fredi/context');

const evt = require(__dirname + "/fredi/ezra");

const {
  isUserBanned,
  addUserToBanList,
  removeUserFromBanList
} = require("./lib/banUser");

const {
  addGroupToBanList,
  isGroupBanned,
  removeGroupFromBanList
} = require("./lib/banGroup");

const {
  isGroupOnlyAdmin,
  addGroupToOnlyAdminList,
  removeGroupFromOnlyAdminList
} = require("./lib/onlyAdmin");

const { reagir } = require(__dirname + "/fredi/app");

// Initialize session
const session = conf.session.replace(/MAKAMESCO-MD<=>/g, '');
const prefixe = conf.PREFIXE;

// Authentication function
async function authentification() {
  try {
    if (!fs.existsSync(__dirname + '/scan/creds.json')) {
      console.log("Connecting...");
      await fs.writeFileSync(__dirname + "/scan/creds.json", atob(session), "utf8");
    } else if (fs.existsSync(__dirname + '/scan/creds.json') && session != "zokk") {
      await fs.writeFileSync(__dirname + '/scan/creds.json', atob(session), "utf8");
    }
  } catch (error) {
    console.log("Invalid Session " + error);
    return;
  }
}

authentification();

// Initialize store
const store = makeInMemoryStore({
  logger: pino().child({
    level: "silent",
    stream: "store"
  })
});

setTimeout(() => {
  authentification();
  
  async function initializeBot() {
    const { version, isLatest } = await fetchLatestBaileysVersion();
    const { state, saveCreds } = await useMultiFileAuthState(__dirname + "/scan");
    
    const socketConfig = {
      version,
      logger: pino({ level: 'silent' }),
      browser: ['Lucky-Md-Xforce', "safari", "1.0.0"],
      printQRInTerminal: true,
      fireInitQueries: false,
      shouldSyncHistoryMessage: true,
      downloadHistory: true,
      syncFullHistory: true,
      generateHighQualityLinkPreview: true,
      markOnlineOnConnect: false,
      keepAliveIntervalMs: 30000,
      auth: {
        creds: state.creds,
        keys: makeCacheableSignalKeyStore(state.keys, logger)
      },
      getMessage: async (key) => {
        if (store) {
          const msg = await store.loadMessage(key.remoteJid, key.id, undefined);
          return msg.message || undefined;
        }
        return { conversation: "An Error Occurred, Repeat Command!" };
      }
    };
    
    const sock = makeWASocket(socketConfig);
    store.bind(sock.ev);

    // Auto-bio functionality
    const bioMessages = [
      "🛠️ Learning never ends — debug life!",
      "🔥 Bot powered by memes & dreams 😎",
      "🎯 Skills don't sleep... neither do bots 🤖",
      "💡 Every day is a code update day!",
      "📅 Stay productive — even in downtime!",
      "😂 If bots had feelings... mine would be busy.",
      "🚀 Running like a boss at 1000 scripts/sec.",
      "🌍 Global bot vibes from TZ 🇹🇿",
      "📚 Guide, Help, Fun, Repeat.",
      "🤹 Life is a mix of memes & miracles.",
      "👀 Watching you like console logs 👨‍💻",
      "📌 Daily desk goals: Build, Break, Fix, Repeat.",
      "🎭 This bot has more personalities than your ex.",
      "👑 Bot: MAKAMESCO-MD | AI: MAKA AI",
      "✨ Today is yours. Make it *legendary*.",
      "📊 Performance: 100% Efficiency (maybe 💀)",
      "⚙️ Built with ❤️ by MAKAMESCO",
      "🎮 Skills unlocked: AI | Code | Meme | Hustle"
    ];
    
    let bioIndex = 0;
    
    setInterval(async () => {
      if (conf.AUTO_BIO === 'yes') {
        const currentTime = new Date().toLocaleString("en-KE", {
          timeZone: "Africa/Nairobi",
          weekday: "long",
          year: "numeric",
          month: 'long',
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false
        });
        
        const bioMessage = bioMessages[bioIndex];
        const status = `🤖 Marcas Md is Active\n📅 ${currentTime}\n${bioMessage}`;
        
        await sock.updateProfileStatus(status);
        console.log("✅ Updated Bio:\n" + status);
        bioIndex = (bioIndex + 1) % bioMessages.length;
      }
    }, 60000);

    // Anti-call functionality
    sock.ev.on('call', async (call) => {
      if (conf.ANTI_CALL === 'yes') {
        const callId = call[0].id;
        const from = call[0].from;
        
        await sock.rejectCall(callId, from);
        
        if (!global.callResponses) {
          global.callResponses = {};
        }
        
        if (!global.callResponses[from]) {
          global.callResponses[from] = { count: 0 };
        }
        
        const callData = global.callResponses[from];
        callData.count++;
        
        const responses = {
          1: [
            `📞 Hello 👋! I'm ${conf.BOT}. Please avoid calling, my owner ${conf.OWNER_NAME} prefers messages. Thank you!\n\nPowered by ${conf.DEV}`,
            `🚫 Please don't call. ${conf.BOT} is a bot, not a voice assistant.\n\nPowered by ${conf.DEV}`,
            `Hi! 🙏 Kindly don't call. My creator ${conf.OWNER_NAME} has disabled calling. Just message me.\n\n~ ${conf.BOT}`
          ],
          2: [
            `⚠️ You've called again. Calls are not allowed. Please text.\n\nPowered by ${conf.DEV}`,
            "Reminder: No calls allowed 🚫. Kindly send your message instead.",
            "You're trying again? 😅 This bot does not accept calls. Just type your message."
          ],
          3: [
            "📵 Third time calling! Respect the rules and drop a message please.",
            "Hey friend, this is the 3rd call. Please avoid that 🙏.",
            "Still calling? 😔 Please understand, texting is preferred."
          ]
        };
        
        const responseLevel = callData.count >= 3 ? 3 : callData.count;
        const possibleResponses = responses[responseLevel];
        const response = possibleResponses[Math.floor(Math.random() * possibleResponses.length)];
        
        try {
          await sock.sendMessage(from, { text: response });
        } catch (error) {
          console.error("Error sending anti-call message:", error);
        }
      }
    });

    // Auto-reply functionality
    let autoReplyMessage = `Hello👋, I'm ${conf.BOT} on board. My owner ${conf.OWNER_NAME} currently unavailable👁️. Please leave a message, and we will get back to you as soon as possible🤝. Thanks To ${conf.DEV}`;
    let repliedUsers = new Set();
    
    sock.ev.on("messages.upsert", async ({ messages }) => {
      const message = messages[0];
      if (!message.message) return;
      
      const text = message.message.conversation || message.message.extendedTextMessage?.text;
      const sender = message.key.remoteJid;
      
      // Command to change auto-reply message
      if (text && text.match(/^[^\w\s]/) && message.key.fromMe) {
        const prefix = text[0];
        const cmd = text.slice(1).split(" ")[0];
        const args = text.slice(prefix.length + cmd.length).trim();
        
        if (cmd === "setautoreply" && args) {
          autoReplyMessage = args;
          await sock.sendMessage(sender, {
            text: `Auto-reply message has been updated to:\n"${autoReplyMessage}"`
          });
          return;
        }
      }
      // antibad 
        if (conf.ANTI_BAD === "yes") {
      _0x3b3709.ev.on("messages.upsert", async _0x465c95 => {
        const {
          messages: _0x3636b1,
          type: _0x31b57c
        } = _0x465c95;
        if (_0x31b57c !== "notify") {
          return;
        }
        for (const _0x3d274b of _0x3636b1) {
          try {
            if (!_0x3d274b.message || _0x3d274b.key.fromMe) {
              continue;
            }
            const _0x1559fc = _0x3d274b.key.remoteJid;
            const _0x536d88 = _0x1559fc.endsWith("@g.us");
            const _0x42ec04 = _0x3d274b.message.conversation || _0x3d274b.message.extendedTextMessage?.["text"] || _0x3d274b.message.imageMessage?.["caption"] || _0x3d274b.message.videoMessage?.["caption"] || '';
            if (containsBadText(_0x42ec04)) {
              await _0x3b3709.sendMessage(_0x1559fc, {
                'text': "🚫 *Inappropriate language detected!*\nYour message has been removed."
              }, {
                'quoted': _0x3d274b
              });
              await _0x3b3709.sendMessage(_0x1559fc, {
                'delete': {
                  'remoteJid': _0x1559fc,
                  'fromMe': false,
                  'id': _0x3d274b.key.id,
                  'participant': _0x3d274b.key.participant || (_0x536d88 ? _0x3d274b.key.participant : _0x1559fc)
                }
              });
              console.log("⚠️ Deleted bad message from " + _0x1559fc);
            }
          } catch (_0x3c21d0) {
            console.error("❌ ANTI_BAD Error:", _0x3c21d0);
          }
        }
      });
    } else {
      console.log("ANTI_BAD is off. Enable it in conf settings to activate.");
    }
      // antibug
      if (conf.ANTI_BUG === "yes") {
      _0x3b3709.ev.on("messages.upsert", async _0x2cb4cf => {
        const {
          messages: _0x275621,
          type: _0x21812e
        } = _0x2cb4cf;
        if (_0x21812e !== "notify") {
          return;
        }
        for (const _0xdb4133 of _0x275621) {
          try {
            if (!_0xdb4133.message || _0xdb4133.key.fromMe) {
              continue;
            }
            const _0x260a2c = _0xdb4133.key.remoteJid;
            const _0x52018f = _0xdb4133.key.participant || _0xdb4133.key.remoteJid;
            const _0x147780 = JSON.stringify(_0xdb4133.message);
            const _0x465a0e = _0xdb4133.message.conversation || _0xdb4133.message.extendedTextMessage?.["text"] || '';
            if (isAntiBugOn(_0x260a2c) && containsBug(_0x147780)) {
              await _0x3b3709.sendMessage(_0x260a2c, {
                'delete': {
                  'remoteJid': _0xdb4133.key.remoteJid,
                  'fromMe': false,
                  'id': _0xdb4133.key.id,
                  'participant': _0xdb4133.key.participant || _0xdb4133.key.remoteJid
                }
              });
              await _0x3b3709.sendMessage(_0x260a2c, {
                'text': "🚫 @" + _0x52018f.split('@')[0] + ", your message was deleted because it contained *bug/crash content* that can harm chats.",
                'mentions': [_0x52018f]
              });
              if (conf.ANTI_BUG_REPORT_TO) {
                await _0x3b3709.sendMessage(conf.ANTI_BUG_REPORT_TO, {
                  'text': "📢 *Anti-Bug Report*\n\n👤 User: @" + _0x52018f.split('@')[0] + "\n💬 Message: " + _0x465a0e + "\n⚡ Action: Deleted due to bug/crash content.",
                  'mentions': [_0x52018f]
                });
              }
              console.log("🚫 Deleted buggy message from " + _0x52018f + " in chat " + _0x260a2c);
            }
          } catch (_0x682c74) {
            console.error("❌ Failed to process anti-bug message:", _0x682c74);
          }
        }
      });
    } else {
      console.warn("⚠️ ANTI_BUG is disabled in conf settings.");
    }
    let _0x15e730 = {};
       if (fs.existsSync("./fredie/anti.json")) {
      _0x15e730 = JSON.parse(fs.readFileSync("./fredie/anti.json"));
    } else {
      _0x15e730 = {
        'ANTI_MENTION_GROUP': "off",
        'reportTo': ''
      };
      fs.writeFileSync("./fredie/anti.json", JSON.stringify(_0x15e730, null, 2));
    }
    _0x3b3709.ev.on("messages.upsert", async ({
      messages: _0x584d68
    }) => {
      const _0x5bec05 = _0x584d68[0];
      if (!_0x5bec05 || !_0x5bec05.message || _0x5bec05.key.fromMe) {
        return;
      }
      if (_0x15e730.ANTI_MENTION_GROUP === 'on') {
        const _0x59f62f = _0x5bec05.message.extendedTextMessage?.["contextInfo"]?.["mentionedJid"] || [];
        const _0x118ef9 = _0x5bec05.key.participant || _0x5bec05.key.remoteJid;
        const _0x414d53 = _0x5bec05.message.conversation || _0x5bec05.message.extendedTextMessage?.["text"] || '';
        for (const _0x11bd6b of _0x59f62f) {
          if (_0x11bd6b.endsWith("@g.us")) {
            try {
              await _0x3b3709.sendMessage(_0x5bec05.key.remoteJid, {
                'delete': _0x5bec05.key
              });
              console.log("🚫 Message deleted: Group was mentioned.");
              await _0x3b3709.sendMessage(_0x5bec05.key.remoteJid, {
                'text': "🚫 @" + _0x118ef9.split('@')[0] + ", your message was deleted because *mentioning other groups is not allowed here.*",
                'mentions': [_0x118ef9]
              });
              if (_0x15e730.reportTo) {
                await _0x3b3709.sendMessage(_0x15e730.reportTo, {
                  'text': "📢 *Anti-Mention Report*\n\n👤 User: @" + _0x118ef9.split('@')[0] + "\n💬 Message: " + _0x414d53 + "\n⚡ Action: Deleted for mentioning another group.",
                  'mentions': [_0x118ef9]
                });
              }
            } catch (_0x52e00c) {
              console.error("❌ Error deleting message:", _0x52e00c);
            }
            break;
          }
        }
      }
    });
    if (!fs.existsSync("./fredie/anti.json")) {
      fs.writeFileSync("./fredie/anti.json", JSON.stringify({}, null, 2));
    }
    if (!fs.existsSync("./fredie/warns.json")) {
      fs.writeFileSync("./fredie/warns.json", JSON.stringify({}, null, 2));
    }
    const _0x3c7b4c = /\b(?:https?:\/\/|www\.|[a-zA-Z0-9-]+\.[a-z]{2,}(?:\/\S*)?|wa\.me\/|t\.me\/|chat\.whatsapp\.com\/|bit\.ly\/|tinyurl\.com\/)[^\s]*/gi;
    _0x3b3709.ev.on("messages.upsert", async ({
      messages: _0x328b2d
    }) => {
      const _0x49298e = _0x328b2d[0];
      if (!_0x49298e || !_0x49298e.message || _0x49298e.key.fromMe) {
        return;
      }
      let _0x7d71df = JSON.parse(fs.readFileSync("./fredie/anti.json"));
      let _0xa4541b = JSON.parse(fs.readFileSync("./fredie/warns.json"));
      const _0x287168 = _0x49298e.message.conversation || _0x49298e.message.extendedTextMessage?.["text"] || _0x49298e.message.imageMessage?.["caption"] || _0x49298e.message.videoMessage?.["caption"] || '';
      const _0x2e7915 = _0x49298e.key.participant || _0x49298e.key.remoteJid;
      
      // Send auto-reply
      if (conf.AUTO_REPLY === "yes" && !repliedUsers.has(sender) && !message.key.fromMe && !sender.includes("@g.us")) {
        await sock.sendMessage(sender, { text: autoReplyMessage });
        repliedUsers.add(sender);
      }
    });

      //antilink
      if (_0x7d71df.ANTI_LINK_GROUP?.["status"] === 'on') {
        if (_0x3c7b4c.test(_0x287168)) {
          const _0x34bc6e = _0x7d71df.ANTI_LINK_GROUP.action || "delete";
          if (_0x34bc6e === "delete") {
            await _0x3b3709.sendMessage(_0x49298e.key.remoteJid, {
              'delete': _0x49298e.key
            });
            await _0x3b3709.sendMessage(_0x49298e.key.remoteJid, {
              'text': "🚫 Link deleted from @" + _0x2e7915.split('@')[0],
              'mentions': [_0x2e7915]
            });
          }
          if (_0x34bc6e === "warn") {
            _0xa4541b[_0x2e7915] = (_0xa4541b[_0x2e7915] || 0) + 1;
            fs.writeFileSync("./fredie/warns.json", JSON.stringify(_0xa4541b, null, 2));
            await _0x3b3709.sendMessage(_0x49298e.key.remoteJid, {
              'text': "⚠️ @" + _0x2e7915.split('@')[0] + " warned for sending a link.\nWarns: " + _0xa4541b[_0x2e7915] + '/5',
              'mentions': [_0x2e7915]
            });
            if (_0xa4541b[_0x2e7915] >= 5) {
              await _0x3b3709.groupParticipantsUpdate(_0x49298e.key.remoteJid, [_0x2e7915], "remove");
              await _0x3b3709.sendMessage(_0x49298e.key.remoteJid, {
                'text': "⛔ @" + _0x2e7915.split('@')[0] + " removed after 5 warns.",
                'mentions': [_0x2e7915]
              });
              delete _0xa4541b[_0x2e7915];
              fs.writeFileSync("./fredie/warns.json", JSON.stringify(_0xa4541b, null, 2));
            }
          }
          if (_0x34bc6e === "remove") {
            await _0x3b3709.groupParticipantsUpdate(_0x49298e.key.remoteJid, [_0x2e7915], "remove");
            await _0x3b3709.sendMessage(_0x49298e.key.remoteJid, {
              'text': "⛔ @" + _0x2e7915.split('@')[0] + " removed for sending a link.",
              'mentions': [_0x2e7915]
            });
          }
          if (_0x7d71df.ANTI_LINK_GROUP.reportTo) {
            await _0x3b3709.sendMessage(_0x7d71df.ANTI_LINK_GROUP.reportTo, {
              'text': "📢 Anti-Link Report:\n👤 User: @" + _0x2e7915.split('@')[0] + "\n💬 Message: " + _0x287168 + "\n⚡ Action: " + _0x34bc6e,
              'mentions': [_0x2e7915]
            });
          }
        }
      }
    });
    let _0x59d6a7 = {};
    // antitag
    if (fs.existsSync("./fredie/anti.json")) {
      _0x59d6a7 = JSON.parse(fs.readFileSync("./fredie/anti.json"));
    }
    _0x3b3709.ev.on("messages.upsert", async ({
      messages: _0x416ac4
    }) => {
      const _0x172d21 = _0x416ac4[0];
      if (!_0x172d21 || !_0x172d21.message || _0x172d21.key.fromMe || _0x172d21.key.remoteJid === "status@broadcast") {
        return;
      }
      if (_0x59d6a7.ANTI_TAG !== 'on') {
        return;
      }
      const _0x38df67 = _0x172d21.message?.["extendedTextMessage"]?.["contextInfo"]?.["mentionedJid"] || [];
      const _0xc93cf1 = _0x38df67.length > 0;
      if (_0xc93cf1) {
        try {
          await _0x3b3709.sendMessage(_0x172d21.key.remoteJid, {
            'delete': _0x172d21.key
          });
          console.log("🚫 Deleted message with tag/mention.");
          await _0x3b3709.sendMessage(_0x172d21.key.remoteJid, {
            'text': "⚠️ Your message was deleted because tagging/mentioning users is not allowed here."
          }, {
            'quoted': _0x172d21
          });
        } catch (_0x4232fd) {
          console.error("❌ Error deleting tagged message:", _0x4232fd);
        }
      }
    });
    // Anti-delete functionality
    if (conf.LUCKY_ADM === "yes") {
      console.log("🛡️ Makamesco Md AntiDelete is ACTIVE!");
    }
    
    sock.ev.on('messages.upsert', async ({ messages }) => {
      if (conf.LUCKY_ADM !== "yes") return;
      
      const msg = messages[0];
      if (!msg.message) return;
      
      const key = msg.key;
      const chatId = key.remoteJid;
      
      if (chatId === "status@broadcast") return;
      
      if (!store.chats[chatId]) {
        store.chats[chatId] = [];
      }
      
      store.chats[chatId].push(msg);
      
      if (store.chats[chatId].length > 25) {
        store.chats[chatId].shift();
      }
      
      if (msg.message?.protocolMessage?.type === 0) {
        const deletedMsgKey = msg.message.protocolMessage.key;
        const chatMessages = store.chats[chatId];
        const deletedMsg = chatMessages.find(m => m.key.id === deletedMsgKey.id);
        
        if (!deletedMsg) return;
        
        try {
          const deleter = msg.key.participant || msg.key.remoteJid;
          const originalSender = deletedMsg.key.participant || deletedMsg.key.remoteJid;
          const isGroup = chatId.endsWith("@g.us");
          
          let groupInfo = '';
          if (isGroup) {
            try {
              const groupMetadata = await sock.groupMetadata(chatId);
              groupInfo = `\n• Group: ${groupMetadata.subject}`;
            } catch (error) {
              console.error("Error fetching group metadata:", error);
              groupInfo = "\n• Group information unavailable.";
            }
          }
          
          const antiDeleteMessage = `🫧 *Makamesc Md antiDelete* 🫧\n` +
            `• Deleted by: @${deleter.split('@')[0]}\n` +
            `• Original sender: @${originalSender.split('@')[0]}\n` +
            `${groupInfo}\n` +
            `• Chat type: ${isGroup ? 'Group' : "Private"}`;
          
          const messageOptions = {
            mentions: [deleter, originalSender]
          };
          
          if (deletedMsg.message.conversation) {
            await sendMessage(sock, chatId, msg, {
              text: antiDeleteMessage + `\n\n📝 *Deleted Text:*\n${deletedMsg.message.conversation}`,
              ...messageOptions
            });
          } else if (deletedMsg.message.extendedTextMessage) {
            await sendMessage(sock, chatId, msg, {
              text: antiDeleteMessage + `\n\n📝 *Deleted Text:*\n${deletedMsg.message.extendedTextMessage.text}`,
              ...messageOptions
            });
          } else if (deletedMsg.message.imageMessage) {
            const caption = deletedMsg.message.imageMessage.caption || '';
            const imagePath = await sock.downloadAndSaveMediaMessage(deletedMsg.message.imageMessage);
            
            await sendMessage(sock, chatId, msg, {
              image: { url: imagePath },
              caption: antiDeleteMessage + `\n\n🖼️ *Image Caption:*\n${caption}`,
              ...messageOptions
            });
          } else if (deletedMsg.message.videoMessage) {
            const caption = deletedMsg.message.videoMessage.caption || '';
            const videoPath = await sock.downloadAndSaveMediaMessage(deletedMsg.message.videoMessage);
            
            await sendMessage(sock, chatId, msg, {
              video: { url: videoPath },
              caption: antiDeleteMessage + `\n\n🎥 *Video Caption:*\n${caption}`,
              ...messageOptions
            });
          } else if (deletedMsg.message.audioMessage) {
            const audioPath = await sock.downloadAndSaveMediaMessage(deletedMsg.message.audioMessage);
            
            await sendMessage(sock, chatId, msg, {
              audio: { url: audioPath },
              mimetype: "audio/ogg",
              ptt: true,
              caption: antiDeleteMessage + `\n\n🎤 *Voice Message Deleted*`,
              ...messageOptions
            });
          } else if (deletedMsg.message.stickerMessage) {
            const stickerPath = await sock.downloadAndSaveMediaMessage(deletedMsg.message.stickerMessage);
            
            await sendMessage(sock, chatId, msg, {
              sticker: { url: stickerPath },
              caption: antiDeleteMessage,
              ...messageOptions
            });
          } else {
            await sendMessage(sock, chatId, msg, {
              text: antiDeleteMessage + `\n\n⚠️ *An unsupported message type was deleted.*`,
              ...messageOptions
            });
          }
        } catch (error) {
          console.error("🔥 AntiDelete Error:", error);
        }
      }
    });
    // Antiedit function
     const originalContent = getContent(originalMsg.message);
      const editedContent = getContent(editedMsg);

      // Only proceed if content actually changed
      if (originalContent === editedContent) {
        console.log(chalk.yellow(`[ANTIEDIT] No content change detected for ${editId}`));
        continue;
      }

      const notificationMessage = `*⚠️📌 MAKAMESCO ᴀɴᴛɪᴇᴅɪᴛ 📌⚠️*\n\n` +
                               `👤 *sᴇɴᴅᴇʀ:* @${sender.split('@')[0]}\n` +
                               `📄 *ᴏʀɪɢɪɴᴀʟ ᴍᴇssᴀɢᴇ:* ${originalContent}\n` +
                               `✏️ *ᴇᴅɪᴛᴇᴅ ᴍᴇssᴀɢᴇ:* ${editedContent}\n` +
                               `🧾 *ᴄʜᴀᴛ ᴛʏᴘᴇ:* ${isGroup ? 'Group' : 'DM'}`;

      const sendTo = currentAntiedit === 'private' ? client.user.id : chat;
      await client.sendMessage(sendTo, { 
        text: notificationMessage,
        mentions: [sender]
      });

      // Update tracking with timestamp
      processedEdits.set(editId, [now, originalContent, editedContent]);
      console.log(chalk.green(`[ANTIEDIT] Reported edit from ${senderName}`));
    }

    // Cleanup old entries
    for (const [id, data] of processedEdits) {
      if (now - data[0] > 60000) { // 1 minute retention
        processedEdits.delete(id);
      }
    }
  } catch (err) {
    console.error(chalk.red('[ANTIEDIT ERROR]', err.stack));
  }
});

    // Auto-react functionality
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    let lastReactionTime = 0;
    
    const wordEmojiMap = {
      'hello': ['👋', '🙂', '😊', "🙋‍♂️", "🙋‍♀️"],
      'hi': ['👋', '🙂', '😁', '🙋‍♂️', "🙋‍♀️"],
      "good morning": ['🌅', '🌞', '☀️', '🌻', '🌼'],
      // ... (rest of the word-emoji mappings)
    };
    
    const randomEmojis = ['😎', '🔥', '💥', '💯', '✨', '🌟', '🌈', '⚡', '💎', '🌀', '👑', '🎉', '🎊', '🦄', '👽', '🛸', '🚀', '🦋', '💫', '🍀', '🎶', '🎧', '🎸', '🎤', '🏆', '🏅', '🌍', '🌎', '🌏', '🎮', '🎲', '💪', "🏋️", '🥇', '👟', '🏃', '🚴', '🚶', '🏄', '⛷️', "🕶️", '🧳', '🍿', '🍿', '🥂', '🍻', '🍷', '🍸', '🥃', '🍾', '🎯', '⏳', '🎁', '🎈', '🎨', '🌻', '🌸', '🌺', '🌹', '🌼', '🌞', '🌝', '🌜', '🌙', '🌚', '🍀', '🌱', '🍃', '🍂', '🌾', '🐉', '🐍', '🦓', '🦄', '🦋', '🦧', '🦘', '🦨', '🦡', '🐉', '🐅', '🐆', '🐓', '🐢', '🐊', '🐠', '🐟', '🐡', '🦑', '🐙', '🦀', '🐬', '🦕', '🦖', '🐾', '🐕', '🐈', '🐇', '🐾', '🐁', '🐀', "🐿️"];
    
    const getEmojiForText = text => {
      const words = text.split(/\s+/);
      for (const word of words) {
        const emoji = getEmojiForWord(word.toLowerCase());
        if (emoji) return emoji;
      }
      return randomEmojis[Math.floor(Math.random() * randomEmojis.length)];
    };
    
    const getEmojiForWord = word => {
      const emojis = wordEmojiMap[word.toLowerCase()];
      if (emojis && emojis.length > 0) {
        return emojis[Math.floor(Math.random() * emojis.length)];
      }
      return null;
    };
    
    if (conf.AUTO_REACT_STATUS === "yes") {
      console.log("AUTO_REACT_STATUS is enabled. Listening for status updates...");
      
      sock.ev.on("messages.upsert", async ({ messages }) => {
        for (const msg of messages) {
          if (msg.key && msg.key.remoteJid === "status@broadcast") {
            console.log("Detected status update from:", msg.key.remoteJid);
            
            const currentTime = Date.now();
            if (currentTime - lastReactionTime < 5000) {
              console.log("Throttling reactions to prevent overflow.");
              continue;
            }
            
            const botId = sock.user && sock.user.id ? sock.user.id.split(':')[0] + "@s.whatsapp.net" : null;
            if (!botId) {
              console.log("Bot's user ID not available. Skipping reaction.");
              continue;
            }
            
            const statusText = msg?.message?.conversation || '';
            const emoji = getEmojiForText(statusText) || randomEmojis[Math.floor(Math.random() * randomEmojis.length)];
            
            if (emoji) {
              await sock.sendMessage(msg.key.remoteJid, {
                react: {
                  key: msg.key,
                  text: emoji
                }
              }, {
                statusJidList: [msg.key.participant, botId]
              });
              
              lastReactionTime = currentTime;
              console.log(`Successfully reacted with '${emoji}' to status update by ${msg.key.remoteJid}`);
            }
            
            await sleep(2000);
          }
        }
      });
    }
    
    if (conf.AUTO_REACT === "yes") {
      console.log("AUTO_REACT is enabled. Listening for regular messages...");
      
      sock.ev.on("messages.upsert", async ({ messages }) => {
        for (const msg of messages) {
          if (msg.key && msg.key.remoteJid) {
            const currentTime = Date.now();
            if (currentTime - lastReactionTime < 5000) {
              console.log("Throttling reactions to prevent overflow.");
              continue;
            }
            
            const messageText = msg?.message?.conversation || '';
            const emoji = getEmojiForText(messageText) || randomEmojis[Math.floor(Math.random() * randomEmojis.length)];
            
            if (emoji) {
              await sock.sendMessage(msg.key.remoteJid, {
                react: {
                  text: emoji,
                  key: msg.key
                }
              }).then(() => {
                lastReactionTime = currentTime;
                console.log(`Successfully reacted with '${emoji}' to message by ${msg.key.remoteJid}`);
              }).catch(error => {
                console.error("Failed to send reaction:", error);
              });
            }
            
            await sleep(2000);
          }
        }
      });
    }
    
    // Auto-save contacts functionality
    async function createAndSendVCard(jid, namePrefix) {
      try {
        const number = jid.split('@')[0];
        let counter = 1;
        let contactName = namePrefix + " " + counter;
        
        while (Object.values(store.contacts).some(contact => contact.name === contactName)) {
          counter++;
          contactName = namePrefix + " " + counter;
        }
        
        const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:${contactName}\nTEL;type=CELL;type=VOICE;waid=${number}:+${number}\nEND:VCARD\n`;
        const vcfPath = './' + contactName + ".vcf";
        
        fs.writeFileSync(vcfPath, vcard);
        
        await sock.sendMessage(conf.NUMERO_OWNER + "@s.whatsapp.net", {
          document: { url: vcfPath },
          mimetype: 'text/vcard',
          fileName: contactName + ".vcf",
          caption: `Contact saved as ${contactName}. Please import this vCard to add the number to your contacts.\n\n MAKAMESCO-MD`
        });
        
        console.log(`vCard created and sent for: ${contactName} (${jid})`);
        fs.unlinkSync(vcfPath);
        return contactName;
      } catch (error) {
        console.error(`Error creating or sending vCard for ${name}:`, error.message);
      }
    }
    
    sock.ev.on('messages.upsert', async ({ messages }) => {
      if (conf.AUTO_SAVE_CONTACTS !== "yes") return;
      
      const msg = messages[0];
      if (!msg.message) return;
      
      const sender = msg.key.remoteJid;
      
      if (sender.endsWith("@s.whatsapp.net") && (!store.contacts[sender] || !store.contacts[sender].name)) {
        const contactName = await createAndSendVCard(sender, 'MAKAMESCO-MD');
        store.contacts[sender] = { name: contactName };
        
        await sock.sendMessage(sender, {
          text: `Ssup Your name has been saved as "${contactName}" in my account.\n\nMAKAMESCO-MD`
        });
        
        console.log(`Contact ${contactName} has been saved and notified.`);
      }
    });
    
    // Main message handler
    sock.ev.on("messages.upsert", async ({ messages }) => {
      const msg = messages[0];
      if (!msg.message) return;
      
      // Helper function to decode JID
      const decodeJid = (jid) => {
        if (!jid) return jid;
        if (/:\d+@/gi.test(jid)) {
          const decoded = jidDecode(jid) || {};
          return decoded.user && decoded.server ? decoded.user + '@' + decoded.server : jid;
        }
        return jid;
      };
      
      // Extract message content
      const contentType = getContentType(msg.message);
      const messageText = 
        contentType == "conversation" ? msg.message.conversation :
        contentType == "imageMessage" ? msg.message.imageMessage?.caption :
        contentType == "videoMessage" ? msg.message.videoMessage?.caption :
        contentType == "extendedTextMessage" ? msg.message?.extendedTextMessage?.text :
        contentType == "buttonsResponseMessage" ? msg?.message?.buttonsResponseMessage?.selectedButtonId :
        contentType == "listResponseMessage" ? msg.message?.listResponseMessage?.singleSelectReply?.selectedRowId :
        contentType == "messageContextInfo" ? msg?.message?.buttonsResponseMessage?.selectedButtonId || 
          msg.message?.listResponseMessage?.singleSelectReply?.selectedRowId || msg.text : '';
      
      const chatId = msg.key.remoteJid;
      const botId = decodeJid(sock.user.id);
      const botNumber = botId.split('@')[0];
      const isGroup = chatId?.endsWith('@g.us');
      
      const groupInfo = isGroup ? await sock.groupMetadata(chatId) : '';
      const groupName = isGroup ? groupInfo.subject : '';
      
      const quotedMessage = msg.message.extendedTextMessage?.contextInfo?.quotedMessage;
      const quotedParticipant = decodeJid(msg.message?.extendedTextMessage?.contextInfo?.participant);
      
      const messageSender = isGroup ? 
        (msg.key.participant ? msg.key.participant : msg.participant) : 
        chatId;
      
      if (msg.key.fromMe) {
        messageSender = botId;
      }
      
      const participant = isGroup ? msg.key.participant : '';
      
      // Get sudo numbers
      const { getAllSudoNumbers } = require("./lib/sudo");
      const senderName = msg.pushName;
      const sudoNumbers = await getAllSudoNumbers();
      
      const ownerNumbers = [
        botNumber, 
        "255752593977", 
        "254756965035", 
        "254769995625", 
        conf.NUMERO_OWNER
      ].map(num => num.replace(/[^0-9]/g) + "@s.whatsapp.net");
      
      const allSuperUsers = ownerNumbers.concat(sudoNumbers);
      const isSuperUser = allSuperUsers.includes(messageSender);
      const isDev = ["255752593977", "254756965035", "254769995625"]
        .map(num => num.replace(/[^0-9]/g) + "@s.whatsapp.net")
        .includes(messageSender);
      
      // Reply function
      function reply(text) {
        sock.sendMessage(chatId, { text }, { quoted: msg });
      }
      
      console.log("\tLUCKY MESSAGES");
      console.log("=========== NEW CONVERSATION ===========");
      if (isGroup) {
        console.log("MESSAGE FROM GROUP : " + groupName);
      }
      console.log(`MESSAGE SENT BY : [${senderName} : ${messageSender.split('@s.whatsapp.net')[0]} ]`);
      console.log("MESSAGE TYPE : " + contentType);
      console.log("==================TEXT==================");
      console.log(messageText);
      
      // Helper function to get group admins
      function getGroupAdmins(participants) {
        let admins = [];
        for (let participant of participants) {
          if (participant.admin == null) continue;
          admins.push(participant.id);
        }
        return admins;
      }
      
      // Set presence based on config
      const presenceStatus = conf.ETAT;
      if (presenceStatus == 1) {
        await sock.sendPresenceUpdate("available", chatId);
      } else if (presenceStatus == 2) {
        await sock.sendPresenceUpdate('composing', chatId);
      } else if (presenceStatus == 3) {
        await sock.sendPresenceUpdate('recording', chatId);
      } else {
        await sock.sendPresenceUpdate("unavailable", chatId);
      }
      
      const groupParticipants = isGroup ? await groupInfo.participants : '';
      let groupAdmins = isGroup ? getGroupAdmins(groupParticipants) : '';
      
      const isAdmin = isGroup ? groupAdmins.includes(messageSender) : false;
      const isBotAdmin = isGroup ? groupAdmins.includes(botId) : false;
      
      const args = messageText ? messageText.trim().split(/ +/).slice(1) : null;
      const isCmd = messageText ? messageText.startsWith(prefixe) : false;
      const cmd = isCmd ? messageText.slice(1).trim().split(/ +/).shift().toLowerCase() : false;
      
      const botPics = conf.URL.split(',');
      
      function getRandomBotPic() {
        const randomIndex = Math.floor(Math.random() * botPics.length);
        return botPics[randomIndex];
      }
      
      // Context object for command handlers
      const context = {
        superUser: isSuperUser,
        dev: isDev,
        verifGroupe: isGroup,
        mbre: groupParticipants,
        membreGroupe: participant,
        verifAdmin: isAdmin,
        infosGroupe: groupInfo,
        nomGroupe: groupName,
        auteurMessage: messageSender,
        nomAuteurMessage: senderName,
        idBot: botId,
        verifEzraAdmin: isBotAdmin,
        prefixe: prefixe,
        arg: args,
        repondre: reply,
        mtype: contentType,
        groupeAdmin: getGroupAdmins,
        msgRepondu: quotedMessage,
        auteurMsgRepondu: quotedParticipant,
        ms: msg,
        mybotpic: getRandomBotPic
      };
      
      // Auto-read messages
      if (conf.AUTO_READ === "yes") {
        sock.ev.on("messages.upsert", async ({ messages }) => {
          for (const message of messages) {
            if (!message.key.fromMe) {
              await sock.readMessages([message.key]);
            }
          }
        });
      }
      
      // Auto-block users in PM
      if (!isSuperUser && chatId === messageSender && conf.AUTO_BLOCK === "yes") {
        sock.sendMessage(messageSender, {
          text: `🚫am blocking you because you have violated ${conf.OWNER_NAME} policies🚫!`
        });
        await sock.updateBlockStatus(messageSender, "block");
      }
      
      // Handle eval commands
      if (messageText && messageText.startsWith('<')) {
        if (!isSuperUser) {
          return reply(`Only for my ${conf.DEV} or ${conf.OWNER_NAME} to use this command 🚫`);
        }
        
        try {
          let result = await eval(messageText.slice(1));
          if (typeof result !== "string") {
            result = require('util').inspect(result);
          }
          await reply(result);
        } catch (error) {
          await reply(String(error));
        }
      }
      
      if (messageText && messageText.startsWith('>')) {
        if (!isSuperUser) {
          await sock.sendMessage(chatId, {
            text: "This command is only for the owner or FrediEzra to execute 🚫",
            contextInfo: {
              externalAdReply: {
                title: conf.BOT,
                body: conf.OWNER_NAME,
                sourceUrl: conf.GURL,
                thumbnailUrl: conf.URL,
                mediaType: 1,
                showAdAttribution: true,
                renderLargerThumbnail: false
              }
            }
          });
          return;
        }
        
        try {
          let result = await eval(messageText.slice(1));
          if (typeof result !== "string") {
            result = require("util").inspect(result);
          }
          await reply(result);
        } catch (error) {
          await reply(String(error));
        }
      }
      
      // Chatbot functionality
      let lastChatbotTime = 0;
      if (!isSuperUser && chatId === messageSender && conf.CHAT_BOT === "yes") {
        console.log("🤖 Chatbot is active");
        try {
          const currentTime = Date.now();
          if (currentTime - lastChatbotTime < 10000) return;
          
          const response = await axios.get("https://apis-keith.vercel.app/ai/gpt", {
            params: { q: messageText },
            timeout: 10000
          });
          
          if (response.data?.status && response.data?.result) {
            const replyText = '_' + response.data.result + '_';
            await sock.sendMessage(chatId, {
              text: replyText,
              mentions: [messageSender]
            }, { quoted: msg });
            
            lastChatbotTime = currentTime;
          }
        } catch (error) {
          console.error("Chatbot error:", error);
        }
      }
      
      // Auto-reply to status updates
      if (msg.key && msg.key.remoteJid === 'status@broadcast' && conf.AUTO_STATUS_REPLY === "yes") {
        const statusSender = msg.key.participant;
        const replyText = '' + conf.AUTO_STATUS_TEXT;
        
        await sock.sendMessage(statusSender, {
          text: replyText,
          react: { text: '🤦', key: msg.key }
        }, { quoted: msg });
      }
      
      // Auto-read status updates
      if (msg.key && msg.key.remoteJid === 'status@broadcast' && conf.AUTO_READ_STATUS === 'yes') {
        await sock.readMessages([msg.key]);
      }
      
      // Auto-download status updates
      if (msg.key && msg.key.remoteJid === "status@broadcast" && conf.AUTO_DOWNLOAD_STATUS === "yes") {
        if (msg.message.extendedTextMessage) {
          var statusText = msg.message.extendedTextMessage.text;
          await sock.sendMessage(botId, { text: statusText }, { quoted: msg });
        } else if (msg.message.imageMessage) {
          var caption = msg.message.imageMessage.caption;
          var imagePath = await sock.downloadAndSaveMediaMessage(msg.message.imageMessage);
          
          await sock.sendMessage(botId, {
            image: { url: imagePath },
            caption: caption
          }, { quoted: msg });
        } else if (msg.message.videoMessage) {
          var caption = msg.message.videoMessage.caption;
          var videoPath = await sock.downloadAndSaveMediaMessage(msg.message.videoMessage);
          
          await sock.sendMessage(botId, {
            video: { url: videoPath },
            caption: caption
          }, { quoted: msg });
        }
      }
      
      // Skip messages from specific group
      if (!isDev && chatId == "120363158701337904@g.us") {
        return;
      }
      
      // Update user data for level system
      if (messageText && messageSender.endsWith("s.whatsapp.net")) {
        const { ajouterOuMettreAJourUserData } = require('./lib/level');
        try {
          await ajouterOuMettreAJourUserData(messageSender);
        } catch (error) {
          console.error(error);
        }
      }
      
      // Handle mentions
      try {
        if (msg.message[contentType].contextInfo.mentionedJid && 
            (msg.message[contentType].contextInfo.mentionedJid.includes(botId) || 
            msg.message[contentType].contextInfo.mentionedJid.includes(conf.NUMERO_OWNER + "@s.whatsapp.net"))) {
          
          if (chatId == '120363158701337904@g.us') return;
          if (isSuperUser) {
            console.log("hummm");
            return;
          }
          
          let mentionData = require('./lib/mention');
          let mentionSettings = await mentionData.recupererToutesLesValeurs();
          let mentionConfig = mentionSettings[0];
          
          if (mentionConfig.status === "non") {
            console.log("mention pas actifs");
            return;
          }
          
          let response;
          if (mentionConfig.type.toLocaleLowerCase() === 'image') {
            response = {
              image: { url: mentionConfig.url },
              caption: mentionConfig.message
            };
          } else if (mentionConfig.type.toLocaleLowerCase() === "video") {
            response = {
              video: { url: mentionConfig.url },
              caption: mentionConfig.message
            };
          } else if (mentionConfig.type.toLocaleLowerCase() === "sticker") {
            let sticker = new Sticker(mentionConfig.url, {
              pack: conf.NOM_OWNER,
              type: StickerTypes.FULL,
              categories: ['🤩', '🎉'],
              id: "12345",
              quality: 70,
              background: "transparent"
            });
            
            const stickerBuffer = await sticker.toBuffer();
            response = { sticker: stickerBuffer };
          } else if (mentionConfig.type.toLocaleLowerCase() === 'audio') {
            response = {
              audio: { url: mentionConfig.url },
              mimetype: "audio/mp4"
            };
          }
          
          sock.sendMessage(chatId, response, { quoted: msg });
        }
      } catch (error) {}
      
      // Anti-link functionality
      try {
        const isAntiLinkEnabled = await verifierEtatJid(chatId);
        
        if (messageText.includes('https://') && isGroup && isAntiLinkEnabled) {
          console.log("lien detecté");
          
          const isBotAdmin = isGroup ? groupAdmins.includes(botId) : false;
          if (isSuperUser || isAdmin || !isBotAdmin) {
            console.log("je fais rien");
            return;
          }
          
          const deleteKey = {
            remoteJid: chatId,
            fromMe: false,
            id: msg.key.id,
            participant: messageSender
          };
          
          var warningMessage = "lien detected, \n";
          var sticker = new Sticker("https://raw.githubusercontent.com/mr-X-force/LUCKY-MD-XFORCE/main/media/remover.gif", {
            pack: "FrediEzra",
            author: conf.OWNER_NAME,
            type: StickerTypes.FULL,
            categories: ['🤩', '🎉'],
            id: '12345',
            quality: 50,
            background: "#000000"
          });
          
          await sticker.toFile('st1.webp');
          
          var action = await recupererActionJid(chatId);
          
          if (action === "remove") {
            warningMessage += "message deleted \n @" + messageSender.split('@')[0] + " removed from group.";
            
            await sock.sendMessage(chatId, { sticker: fs.readFileSync('st1.webp') });
            await delay(800);
            
            await sock.sendMessage(chatId, {
              text: warningMessage,
              mentions: [messageSender]
            }, { quoted: msg });
            
            try {
              await sock.groupParticipantsUpdate(chatId, [messageSender], "remove");
            } catch (error) {
              console.log("antiien " + error);
            }
            
            await sock.sendMessage(chatId, { delete: deleteKey });
            await fs.unlink('st1.webp');
          } else if (action === "delete") {
            warningMessage += "message deleted \n @" + messageSender.split('@')[0] + " avoid sending link.";
            
            await sock.sendMessage(chatId, {
              text: warningMessage,
              mentions: [messageSender]
            }, { quoted: msg });
            
            await sock.sendMessage(chatId, { delete: deleteKey });
            await fs.unlink("st1.webp");
          } else if (action === "warn") {
            const { getWarnCountByJID, ajouterUtilisateurAvecWarnCount } = require("./lib/warn");
            
            let warnCount = await getWarnCountByJID(messageSender);
            let maxWarns = conf.WARN_COUNT;
            
            if (warnCount >= maxWarns) {
              var finalWarning = "link detected , you will be remove because of reaching warn-limit";
              
              await sock.sendMessage(chatId, {
                text: finalWarning,
                mentions: [messageSender]
              }, { quoted: msg });
              
              await sock.groupParticipantsUpdate(chatId, [messageSender], "remove");
              await sock.sendMessage(chatId, { delete: deleteKey });
            } else {
              var remainingWarns = maxWarns - warnCount;
              var warning = "link detected , your warn_count was upgrade ;\n rest : " + remainingWarns + " ";
              
              await ajouterUtilisateurAvecWarnCount(messageSender);
              await sock.sendMessage(chatId, {
                text: warning,
                mentions: [messageSender]
              }, { quoted: msg });
              
              await sock.sendMessage(chatId, { delete: deleteKey });
            }
          }
        }
      } catch (error) {
        console.log("lib err " + error);
      }
      
      // Anti-bot functionality
      try {
        const isBotMessage = 
          msg.key?.id?.startsWith("BAES") && msg.key?.id?.length === 16 ||
          msg.key?.id?.startsWith("BAE5") && msg.key?.id?.length === 16;
        
        if (isBotMessage) {
          if (contentType === "reactionMessage") {
            console.log("Je ne reagis pas au reactions");
            return;
          }
          
          const isAntiBotEnabled = await atbverifierEtatJid(chatId);
          if (!isAntiBotEnabled) return;
          
          if (isAdmin || messageSender === botId) {
            console.log("je fais rien");
            return;
          }
          
          const deleteKey = {
            remoteJid: chatId,
            fromMe: false,
            id: msg.key.id,
            participant: messageSender
          };
          
          var warningMessage = "bot detected, \n";
          var sticker = new Sticker("https://raw.githubusercontent.com/mr-X-force/LUCKY-MD-XFORCE/main/media/remover.gif", {
            pack: "FredieTech",
            author: conf.OWNER_NAME,
            type: StickerTypes.FULL,
            categories: ['🤩', '🎉'],
            id: "12345",
            quality: 50,
            background: "#000000"
          });
          
          await sticker.toFile("st1.webp");
          var action = await atbrecupererActionJid(chatId);
          
          if (action === "remove") {
            warningMessage += "message deleted \n @" + messageSender.split('@')[0] + " removed from group.";
            
            await sock.sendMessage(chatId, { sticker: fs.readFileSync("st1.webp") });
            await delay(800);
            
            await sock.sendMessage(chatId, {
              text: warningMessage,
              mentions: [messageSender]
            }, { quoted: msg });
            
            try {
              await sock.groupParticipantsUpdate(chatId, [messageSender], 'remove');
            } catch (error) {
              console.log("antibot " + error);
            }
            
            await sock.sendMessage(chatId, { delete: deleteKey });
            await fs.unlink('st1.webp');
          } else if (action === 'delete') {
            warningMessage += "message delete \n @" + messageSender.split('@')[0] + " Avoid sending link.";
            
            await sock.sendMessage(chatId, {
              text: warningMessage,
              mentions: [messageSender]
            }, { quoted: msg });
            
            await sock.sendMessage(chatId, { delete: deleteKey });
            await fs.unlink("st1.webp");
          } else if (action === 'warn') {
            const { getWarnCountByJID, ajouterUtilisateurAvecWarnCount } = require("./lib/warn");
            
            let warnCount = await getWarnCountByJID(messageSender);
            let maxWarns = conf.WARN_COUNT;
            
            if (warnCount >= maxWarns) {
              var finalWarning = "bot detected ;you will be remove because of reaching warn-limit";
              
              await sock.sendMessage(chatId, {
                text: finalWarning,
                mentions: [messageSender]
              }, { quoted: msg });
              
              await sock.groupParticipantsUpdate(chatId, [messageSender], "remove");
              await sock.sendMessage(chatId, { delete: deleteKey });
            } else {
              var remainingWarns = maxWarns - warnCount;
              var warning = "bot detected , your warn_count was upgrade ;\n rest : " + remainingWarns + " ";
              
              await ajouterUtilisateurAvecWarnCount(messageSender);
              await sock.sendMessage(chatId, {
                text: warning,
                mentions: [messageSender]
              }, { quoted: msg });
              
              await sock.sendMessage(chatId, { delete: deleteKey });
            }
          }
        }
      } catch (error) {
        console.log(".... " + error);
      }
      
      // Command handling
      if (isCmd) {
        const command = evt.cm.find(cmd => cmd.nomCom === cmd);
        
        if (command) {
          try {
            if (conf.MODE.toLocaleLowerCase() != "yes" && !isSuperUser) {
              return;
            }
            
            if (!isSuperUser && chatId === messageSender && conf.PM_PERMIT === 'yes') {
              reply("You don't have acces to commands here");
              return;
            }
            
            if (!isSuperUser && isGroup) {
              let isGroupBanned = await isGroupBanned(chatId);
              if (isGroupBanned) return;
            }
            
            if (!isAdmin && isGroup) {
              let isAdminOnly = await isGroupOnlyAdmin(chatId);
              if (isAdminOnly) return;
            }
            
            if (!isSuperUser) {
              let isUserBanned = await isUserBanned(messageSender);
              if (isUserBanned) {
                reply("You are banned from bot commands");
                return;
              }
            }
            
            // React to command
            reagir(chatId, sock, msg, command.reaction);
            
            // Execute command
            command.fonction(chatId, sock, context);
          } catch (error) {
            console.log("😡😡 " + error);
            sock.sendMessage(chatId, { text: "😡😡 " + error }, { quoted: msg });
          }
        }
      }
    });
    
    // Group participants update handler
    const { recupevents } = require("./lib/welcome");
    
    sock.ev.on("group-participants.update", async (update) => {
      console.log(update);
      
      let profilePic;
      try {
        profilePic = await sock.profilePictureUrl(update.id, "image");
      } catch {
        profilePic = 'https://files.catbox.moe/3o37c5.jpeg';
      }
      
      try {
        const groupMetadata = await sock.groupMetadata(update.id);
        
        // Welcome message
        if (update.action == "add" && (await recupevents(update.id, "welcome")) == 'on') {
          let welcomeMessage = "👋 Hello\n";
          let participants = update.participants;
          
          for (let participant of participants) {
            welcomeMessage += ` *@${participant.split('@')[0]}* Welcome to Our Official Group,`;
          }
          
          welcomeMessage += "You might want to read the group Description to avoid getting removed...";
          
          sock.sendMessage(update.id, {
            image: { url: profilePic },
            caption: welcomeMessage,
            mentions: participants
          });
        } 
        // Goodbye message
        else if (update.action == "remove" && (await recupevents(update.id, "goodbye")) == 'on') {
          let goodbyeMessage = "one or somes member(s) left group;\n";
          let participants = update.participants;
          
          for (let participant of participants) {
            goodbyeMessage += '@' + participant.split('@')[0] + "\n";
          }
          
          sock.sendMessage(update.id, {
            text: goodbyeMessage,
            mentions: participants
          });
        } 
        // Anti-promote
        else if (update.action == "promote" && (await recupevents(update.id, "antipromote")) == 'on') {
          if (update.author == groupMetadata.owner || 
              update.author == conf.NUMERO_OWNER + "@s.whatsapp.net" || 
              update.author == decodeJid(sock.user.id) || 
              update.author == update.participants[0]) {
            console.log("Cas de superUser je fais rien");
            return;
          }
          
          await sock.groupParticipantsUpdate(update.id, [update.author, update.participants[0]], "demote");
          
          sock.sendMessage(update.id, {
            text: `@${update.author.split('@')[0]} has violated the anti-promotion rule, therefore both ${update.author.split('@')[0]} and @${l[0].split('@')[0]} have been removed from administrative rights.`,
            mentions: [update.author, update.participants[0]]
          });
        } 
        // Anti-demote
        else if (update.action == "demote" && (await recupevents(update.id, "antidemote")) == 'on') {
          if (update.author == groupMetadata.owner || 
              update.author == conf.NUMERO_OWNER + "@s.whatsapp.net" || 
              update.author == decodeJid(sock.user.id) || 
              update.author == update.participants[0]) {
            console.log("Cas de superUser je fais rien");
            return;
          }
          
          await sock.groupParticipantsUpdate(update.id, [update.author], 'demote');
          await sock.groupParticipantsUpdate(update.id, [update.participants[0]], "promote");
          
          sock.sendMessage(update.id, {
            text: `@${update.author.split('@')[0]} has violated the anti-demotion rule by removing @${update.participants[0].split('@')[0]}. Consequently, he has been stripped of administrative rights.`,
            mentions: [update.author, update.participants[0]]
          });
        }
      } catch (error) {
        console.error(error);
      }
    });
    
    // Auto-mute functionality
    async function setupAutoMute() {
      const cron = require("node-cron");
      const { getCron } = require("./lib/cron");
      
      let cronJobs = await getCron();
      console.log(cronJobs);
      
      if (cronJobs.length > 0) {
        for (let i = 0; i < cronJobs.length; i++) {
          if (cronJobs[i].mute_at != null) {
            let timeParts = cronJobs[i].mute_at.split(':');
            console.log(`etablissement d'un automute pour ${cronJobs[i].group_id} a ${timeParts[0]} H ${timeParts[1]}`);
            
            cron.schedule(`${timeParts[1]} ${timeParts[0]} * * *`, async () => {
              await sock.groupSettingUpdate(cronJobs[i].group_id, "announcement");
              
              sock.sendMessage(cronJobs[i].group_id, {
                image: { url: "./media/chrono.webp" },
                caption: "Hello, it's time to close the group; sayonara."
              });
            }, { timezone: 'Africa/Nairobi' });
          }
          
          if (cronJobs[i].unmute_at != null) {
            let timeParts = cronJobs[i].unmute_at.split(':');
            console.log(`etablissement d'un autounmute pour ${cronJobs[i].group_id} a ${timeParts[0]} H ${timeParts[1]}`);
            
            cron.schedule(`${timeParts[1]} ${timeParts[0]} * * *`, async () => {
              await sock.groupSettingUpdate(cronJobs[i].group_id, "not_announcement");
              
              sock.sendMessage(cronJobs[i].group_id, {
                image: { url: "./media/chrono.webp" },
                caption: "Hello, it's time to open the group; welcome back."
              });
            }, { timezone: 'Africa/Nairobi' });
          }
        }
      }
    }
    
    setupAutoMute();
    
    // Save credentials when updated
    sock.ev.on('creds.update', saveCreds);
    
    // Connection update handler
    sock.ev.on('connection.update', (update) => {
      const { connection, lastDisconnect } = update;
      
      if (connection === 'close') {
        const shouldReconnect = (lastDisconnect.error)?.output?.statusCode !== 401;
        console.log('connection closed due to ', lastDisconnect.error, ', reconnecting ', shouldReconnect);
        
        if (shouldReconnect) {
          initializeBot();
        }
      } else if (connection === 'open') {
        console.log('opened connection');
      }
    });
  }
  
  initializeBot();
}, 1000);
