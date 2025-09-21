const express = require("express");
const app = express();
const PORT = process.env.PORT || 0x1f40;
app.get('/', (_0x35dd0f, _0x166360) => {
  _0x166360.send("maka is alive ");
});
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
"use strict";
var __createBinding = this && this.__createBinding || (Object.create ? function (_0x1e208b, _0x8538bc, _0x17b6f5, _0x5881a6) {
  if (_0x5881a6 === undefined) {
    _0x5881a6 = _0x17b6f5;
  }
  var _0x258594 = Object.getOwnPropertyDescriptor(_0x8538bc, _0x17b6f5);
  if (!_0x258594 || ("get" in _0x258594 ? !_0x8538bc.__esModule : _0x258594.writable || _0x258594.configurable)) {
    _0x258594 = {
      'enumerable': true,
      'get': function () {
        return _0x8538bc[_0x17b6f5];
      }
    };
  }
  Object.defineProperty(_0x1e208b, _0x5881a6, _0x258594);
} : function (_0x2da4ef, _0x1c2cc7, _0x2d7be3, _0x3d51fd) {
  if (_0x3d51fd === undefined) {
    _0x3d51fd = _0x2d7be3;
  }
  _0x2da4ef[_0x3d51fd] = _0x1c2cc7[_0x2d7be3];
});
var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (_0x59c455, _0x3c9a51) {
  Object.defineProperty(_0x59c455, "default", {
    'enumerable': true,
    'value': _0x3c9a51
  });
} : function (_0x383fd6, _0x343dc5) {
  _0x383fd6["default"] = _0x343dc5;
});
var __importStar = this && this.__importStar || function (_0x40007f) {
  if (_0x40007f && _0x40007f.__esModule) {
    return _0x40007f;
  }
  var _0x4011a6 = {};
  if (_0x40007f != null) {
    for (var _0xdf5381 in _0x40007f) if (_0xdf5381 !== "default" && Object.prototype.hasOwnProperty.call(_0x40007f, _0xdf5381)) {
      __createBinding(_0x4011a6, _0x40007f, _0xdf5381);
    }
  }
  __setModuleDefault(_0x4011a6, _0x40007f);
  return _0x4011a6;
};
var __importDefault = this && this.__importDefault || function (_0x5bd8a6) {
  return _0x5bd8a6 && _0x5bd8a6.__esModule ? _0x5bd8a6 : {
    'default': _0x5bd8a6
  };
};
Object.defineProperty(exports, "__esModule", {
  'value': true
});
const baileys_1 = __importStar(require('@whiskeysockets/baileys'));
const logger_1 = __importDefault(require("@whiskeysockets/baileys/lib/Utils/logger"));
const logger = logger_1["default"].child({});
logger.level = "silent";
const pino = require("pino");
const boom_1 = require("@hapi/boom");
const conf = require("./set");
const axios = require("axios");
let fs = require('fs-extra');
let path = require("path");
const FileType = require("file-type");
const {
  Sticker,
  createSticker,
  StickerTypes
} = require('wa-sticker-formatter');
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
let evt = require(__dirname + "/fredi/ezra");
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
let {
  reagir
} = require(__dirname + "/fredi/app");
var session = conf.session.replace(/MAKAMESCO-MD<=>/g, '');
const prefixe = conf.PREFIXE;
async function authentification() {
  try {
    if (!fs.existsSync(__dirname + '/scan/creds.json')) {
      console.log("connexion en cour ...");
      await fs.writeFileSync(__dirname + "/scan/creds.json", atob(session), "utf8");
    } else if (fs.existsSync(__dirname + '/scan/creds.json') && session != "zokk") {
      await fs.writeFileSync(__dirname + '/scan/creds.json', atob(session), "utf8");
    }
  } catch (_0x1e323c) {
    console.log("Session Invalid " + _0x1e323c);
    return;
  }
}
authentification();
0x0;
const store = baileys_1.makeInMemoryStore({
  'logger': pino().child({
    'level': "silent",
    'stream': "store"
  })
});
setTimeout(() => {
  authentification();
  async function _0x1a14b3() {
    0x0;
    const {
      version: _0x557fa9,
      isLatest: _0x1dfd36
    } = await baileys_1.fetchLatestBaileysVersion();
    0x0;
    const {
      state: _0x51c8b6,
      saveCreds: _0xf05aa0
    } = await baileys_1.useMultiFileAuthState(__dirname + "/scan");
    0x0;
    const _0xc1432b = {
      'version': _0x557fa9,
      'logger': pino({
        'level': 'silent'
      }),
      'browser': ['jeepers-creeper-xmd', "safari", "1.0.0"],
      'printQRInTerminal': true,
      'fireInitQueries': false,
      'shouldSyncHistoryMessage': true,
      'downloadHistory': true,
      'syncFullHistory': true,
      'generateHighQualityLinkPreview': true,
      'markOnlineOnConnect': false,
      'keepAliveIntervalMs': 0x7530,
      'auth': {
        'creds': _0x51c8b6.creds,
        'keys': baileys_1.makeCacheableSignalKeyStore(_0x51c8b6.keys, logger)
      },
      'getMessage': async _0x49250c => {
        if (store) {
          const _0x37c0f8 = await store.loadMessage(_0x49250c.remoteJid, _0x49250c.id, undefined);
          return _0x37c0f8.message || undefined;
        }
        return {
          'conversation': "An Error Occurred, Repeat Command!"
        };
      }
    };
    0x0;
    const _0x4656f9 = baileys_1["default"](_0xc1432b);
    store.bind(_0x4656f9.ev);
    function _0x4bdc67() {
      const _0x3a7830 = new Date();
      const _0x546d32 = {
        'timeZone': "Africa/Nairobi",
        'weekday': "long",
        'year': "numeric",
        'month': 'long',
        'day': "2-digit",
        'hour': "2-digit",
        'minute': "2-digit",
        'second': "2-digit",
        'hour12': false
      };
      return new Intl.DateTimeFormat("en-KE", _0x546d32).format(_0x3a7830);
    }
    const _0x51cd62 = ["🛠️ Learning never ends — debug life!", "🔥 Bot powered by Makadev dreams 😎", "🎯 Skills don't sleep... neither do bots 🤖", "💡 *Ladys 💃 if your 🤔 Body 🧑‍🦳 is the Temple 🕌 of Gød 🙏 , who are 🫵 u to stop 🤚 the sons 🧑‍🦱 of God 🙏 from entering 🚶 their Father temple🕌🤣🤣🤣🤣*!", "📅 Stay productive — even in downtime!", "😂 If bots had feelings... mine would be busy.", "🚀 Running like a boss at 1000 scripts/sec.", "🌍 Global bot vibes from KE 🇰🇪", "📚 Guide, Help, Fun, Repeat.", "🤹 Life is a mix of memes & miracles.", "👀 Watching you like console logs 👨‍💻", "📌 Daily desk goals: Build, Break, Fix, Repeat.", "🎭 This bot has more personalities than your ex.", "👑 Bot: jeepers-creeper xmd | AI: sir bravin AI", "✨ Today is yours. Make it *legendary*.", "📊 Performance: 100% Efficiency (maybe 💀)", "⚙️ Built with ❤️love by sir bravine", "🎮 Skills unlocked: AI | Code | Meme | Hustle"];
    let _0x9d4c2c = 0x0;
    setInterval(async () => {
      if (conf.AUTO_BIO === 'yes') {
        const _0x19d773 = _0x4bdc67();
        const _0x20e9fe = _0x51cd62[_0x9d4c2c];
        const _0x1e1f73 = "🤖 Makamesco xmd is Active\n📅 " + _0x19d773 + "\n" + _0x20e9fe;
        await _0x4656f9.updateProfileStatus(_0x1e1f73);
        console.log("✅ Updated Bio:\n" + _0x1e1f73);
        _0x9d4c2c = (_0x9d4c2c + 0x1) % _0x51cd62.length;
      }
    }, 0xea60);
    _0x4656f9.ev.on('call', async _0x1314ce => {
      if (conf.ANTI_CALL === 'yes') {
        const _0xd7dd20 = _0x1314ce[0x0].id;
        const _0x572ab6 = _0x1314ce[0x0].from;
        await _0x4656f9.rejectCall(_0xd7dd20, _0x572ab6);
        if (!global.callResponses) {
          global.callResponses = {};
        }
        if (!global.callResponses[_0x572ab6]) {
          global.callResponses[_0x572ab6] = {
            'count': 0x0
          };
        }
        const _0x323a52 = global.callResponses[_0x572ab6];
        _0x323a52.count++;
        const _0x2b5d77 = {
          0x1: ["📞 Hello 👋! I'm " + conf.BOT + ". Please the number you are calling is currently busy please hold or call back later " + conf.OWNER_NAME + " prefers messages. Thank you!\n\nPowered by sir bravin " + conf.DEV, "🚫 Please don't call. " + conf.BOT + " is a bot, not a voice assistant.\n\nPowered by sir bravin " + conf.DEV, "Hi! 🙏 Kindly don’t call. My creator " + conf.OWNER_NAME + " has disabled calling. Just message me.\n\n~ " + conf.BOT],
          0x2: ["⚠️ You've called again. Calls are not allowed. Please text.\n\nPowered by sir bravin " + conf.DEV, "Reminder: No calls allowed 🚫. Kindly send your message instead.", "You're trying again? 😅 This bot does not accept calls. Just type your message."],
          0x3: ["📵 Third time calling! Respect the rules and drop a message please.", "Hey friend, this is the 3rd call. Please avoid that 🙏.", "Still calling? 😔 Please understand, texting is preferred."]
        };
        const _0x3e12b7 = _0x323a52.count >= 0x3 ? 0x3 : _0x323a52.count;
        const _0x30fa5a = _0x2b5d77[_0x3e12b7];
        const _0x4ad1c6 = _0x30fa5a[Math.floor(Math.random() * _0x30fa5a.length)];
        try {
          await _0x4656f9.sendMessage(_0x572ab6, {
            'text': _0x4ad1c6
          });
        } catch (_0x411df6) {
          console.error("Error sending anti-call message:", _0x411df6);
        }
      }
    });
    let _0x257411 = "Hello👋, I'm " + conf.BOT + " on board. My owner " + conf.OWNER_NAME + " currently unavailable👁️. Please leave a message, and we will get back to you as soon as possible🤝. Thanks To " + conf.DEV;
    let _0x9dc623 = new Set();
    _0x4656f9.ev.on("messages.upsert", async _0x373c9f => {
      const {
        messages: _0x32320e
      } = _0x373c9f;
      const _0x3409b6 = _0x32320e[0x0];
      if (!_0x3409b6.message) {
        return;
      }
      const _0x52f8d1 = _0x3409b6.message.conversation || _0x3409b6.message.extendedTextMessage?.["text"];
      const _0x443337 = _0x3409b6.key.remoteJid;
      if (_0x52f8d1 && _0x52f8d1.match(/^[^\w\s]/) && _0x3409b6.key.fromMe) {
        const _0x52f79d = _0x52f8d1[0x0];
        const _0x57926a = _0x52f8d1.slice(0x1).split(" ")[0x0];
        const _0x3fa73b = _0x52f8d1.slice(_0x52f79d.length + _0x57926a.length).trim();
        if (_0x57926a === "setautoreply" && _0x3fa73b) {
          _0x257411 = _0x3fa73b;
          await _0x4656f9.sendMessage(_0x443337, {
            'text': "Auto-reply message has been updated to:\n\"" + _0x257411 + "\""
          });
          return;
        }
      }
      if (conf.AUTO_REPLY === "yes" && !_0x9dc623.has(_0x443337) && !_0x3409b6.key.fromMe && !_0x443337.includes("@g.us")) {
        await _0x4656f9.sendMessage(_0x443337, {
          'text': _0x257411
        });
        _0x9dc623.add(_0x443337);
      }
    });
    if (conf.LUCKY_ADM === "yes") {
      console.log("👿 Makamesco xmd AntiDelete is ACTIVE!");
    }
    _0x4656f9.ev.on('messages.upsert', async _0x2711d0 => {
      if (conf.LUCKY_ADM !== "yes") {
        return;
      }
      const {
        messages: _0x218bd3
      } = _0x2711d0;
      const _0x42e981 = _0x218bd3[0x0];
      if (!_0x42e981.message) {
        return;
      }
      const _0x17e756 = _0x42e981.key;
      const _0x5e7a3f = _0x17e756.remoteJid;
      if (_0x5e7a3f === "status@broadcast") {
        return;
      }
      if (!store.chats[_0x5e7a3f]) {
        store.chats[_0x5e7a3f] = [];
      }
      store.chats[_0x5e7a3f].push(_0x42e981);
      if (store.chats[_0x5e7a3f].length > 0x19) {
        store.chats[_0x5e7a3f].shift();
      }
      if (_0x42e981.message?.["protocolMessage"]?.["type"] === 0x0) {
        const _0x1d4954 = _0x42e981.message.protocolMessage.key;
        const _0x3c9a32 = store.chats[_0x5e7a3f];
        const _0x445e19 = _0x3c9a32.find(_0x531db9 => _0x531db9.key.id === _0x1d4954.id);
        if (!_0x445e19) {
          return;
        }
        try {
          const _0x4d12b4 = _0x42e981.key.participant || _0x42e981.key.remoteJid;
          const _0x102ec2 = _0x445e19.key.participant || _0x445e19.key.remoteJid;
          const _0x529fc5 = _0x5e7a3f.endsWith("@g.us");
          let _0x4a8144 = '';
          if (_0x529fc5) {
            try {
              const _0x5c440e = await _0x4656f9.groupMetadata(_0x5e7a3f);
              _0x4a8144 = "\n• Group: " + _0x5c440e.subject;
            } catch (_0x2d8312) {
              console.error("Error fetching group metadata:", _0x2d8312);
              _0x4a8144 = "\n• Group information unavailable.";
            }
          }
          const _0x15b945 = "👿 *Makamesco xMd antiDelete* 👿\n" + ("• Deleted by: @" + _0x4d12b4.split('@')[0x0] + "\n") + ("• Original sender: @" + _0x102ec2.split('@')[0x0] + "\n") + (_0x4a8144 + "\n") + ("• Chat type: " + (_0x529fc5 ? 'Group' : "Private"));
          const _0x1e2981 = {
            'mentions': [_0x4d12b4, _0x102ec2]
          };
          if (_0x445e19.message.conversation) {
            await sendMessage(_0x4656f9, _0x5e7a3f, _0x42e981, {
              'text': _0x15b945 + "\n\n📝 *Deleted Text:*\n" + _0x445e19.message.conversation,
              ..._0x1e2981
            });
          } else {
            if (_0x445e19.message.extendedTextMessage) {
              await sendMessage(_0x4656f9, _0x5e7a3f, _0x42e981, {
                'text': _0x15b945 + "\n\n📝 *Deleted Text:*\n" + _0x445e19.message.extendedTextMessage.text,
                ..._0x1e2981
              });
            } else {
              if (_0x445e19.message.imageMessage) {
                const _0x29a0e8 = _0x445e19.message.imageMessage.caption || '';
                const _0x5bdabd = await _0x4656f9.downloadAndSaveMediaMessage(_0x445e19.message.imageMessage);
                await sendMessage(_0x4656f9, _0x5e7a3f, _0x42e981, {
                  'image': {
                    'url': _0x5bdabd
                  },
                  'caption': _0x15b945 + "\n\n🖼️ *Image Caption:*\n" + _0x29a0e8,
                  ..._0x1e2981
                });
              } else {
                if (_0x445e19.message.videoMessage) {
                  const _0x376eae = _0x445e19.message.videoMessage.caption || '';
                  const _0xb43ce3 = await _0x4656f9.downloadAndSaveMediaMessage(_0x445e19.message.videoMessage);
                  await sendMessage(_0x4656f9, _0x5e7a3f, _0x42e981, {
                    'video': {
                      'url': _0xb43ce3
                    },
                    'caption': _0x15b945 + "\n\n🎥 *Video Caption:*\n" + _0x376eae,
                    ..._0x1e2981
                  });
                } else {
                  if (_0x445e19.message.audioMessage) {
                    const _0x35af5a = await _0x4656f9.downloadAndSaveMediaMessage(_0x445e19.message.audioMessage);
                    await sendMessage(_0x4656f9, _0x5e7a3f, _0x42e981, {
                      'audio': {
                        'url': _0x35af5a
                      },
                      'mimetype': "audio/ogg",
                      'ptt': true,
                      'caption': _0x15b945 + "\n\n🎤 *Voice Message Deleted*",
                      ..._0x1e2981
                    });
                  } else {
                    if (_0x445e19.message.stickerMessage) {
                      const _0x24ab5c = await _0x4656f9.downloadAndSaveMediaMessage(_0x445e19.message.stickerMessage);
                      await sendMessage(_0x4656f9, _0x5e7a3f, _0x42e981, {
                        'sticker': {
                          'url': _0x24ab5c
                        },
                        'caption': _0x15b945,
                        ..._0x1e2981
                      });
                    } else {
                      await sendMessage(_0x4656f9, _0x5e7a3f, _0x42e981, {
                        'text': _0x15b945 + "\n\n⚠️ *An unsupported message type was deleted.*",
                        ..._0x1e2981
                      });
                    }
                  }
                }
              }
            }
          }
        } catch (_0x4818d7) {
          console.error("🔥 AntiDelete Error:", _0x4818d7);
        }
      }
    });
    const _0x366a5a = _0x5d6fdf => new Promise(_0x4a3059 => setTimeout(_0x4a3059, _0x5d6fdf));
    let _0xa1ea20 = 0x0;
    const _0x4e58bb = {
      'hello': ['👋', '🙂', '😊', "🙋‍♂️", "🙋‍♀️"],
      'hi': ['👋', '🙂', '😁', '🙋‍♂️', "🙋‍♀️"],
      "good morning": ['🌅', '🌞', '☀️', '🌻', '🌼'],
      "good night": ['🌙', '🌜', '⭐', '🌛', '💫'],
      'bye': ['👋', '😢', '👋🏻', '🥲', "🚶‍♂️", "🚶‍♀️"],
      "see you": ['👋', '😊', "👋🏻", '✌️', "🚶‍♂️"],
      'bro': ["🤜🤛", '👊', '💥', '🥊', '👑'],
      'sister': ['👭', "💁‍♀️", '🌸', '💖', "🙋‍♀️"],
      'buddy': ['🤗', "👯‍♂️", '👯‍♀️', "🤜🤛", '🤝'],
      'niaje': ['👋', '😄', '💥', '🔥', '🕺', '💃'],
      'fredi': ['😎', '💯', '🔥', '🚀', '👑'],
      'ezra': ['🔥', '💥', '👑', '💯', '😎'],
      'thanks': ['🙏', '😊', '💖', '❤️', '💐'],
      "thank you": ['🙏', '😊', '🙌', '💖', '💝'],
      'love': ['❤️', '💖', '💘', '😍', '😘', '💍', '💑'],
      "miss you": ['😢', '💔', '😔', '😭', '💖'],
      'sorry': ['😔', '🙏', '😓', '💔', '🥺'],
      'apologies': ['😔', '💔', '🙏', '😞', "🙇‍♂️", '🙇‍♀️'],
      'congratulations': ['🎉', '🎊', '🏆', '🎁', '👏'],
      "well done": ['👏', '💪', '🎉', '🎖️', '👍'],
      "good job": ['👏', '💯', '👍', '🌟', '🎉'],
      'happy': ['😁', '😊', '🎉', '🎊', '💃', '🕺'],
      'sad': ['😢', '😭', '😞', '💔', '😓'],
      'angry': ['😡', '🤬', '😤', '💢', '😾'],
      'excited': ['🤩', '🎉', '😆', '🤗', '🥳'],
      'surprised': ['😲', '😳', '😯', '😮', '😲'],
      'help': ['🆘', '❓', '🙏', '💡', "👨‍💻", "👩‍💻"],
      'how': ['❓', '🤔', '😕', '😳', '🧐'],
      'what': ['❓', "🤷‍♂️", "🤷‍♀️", '😕', '😲'],
      'where': ['❓', '🌍', '🗺️', '🏙️', '🌎'],
      'party': ['🎉', '🥳', '🍾', '🍻', '🎤', '💃', '🕺'],
      'fun': ['🤣', '😂', '🥳', '🎉', '🎮', '🎲'],
      'hangout': ['🍕', '🍔', '🍻', '🎮', '🍿', '😆'],
      'good': ['👍', '👌', '😊', '💯', '🌟'],
      'awesome': ['🔥', '🚀', '🤩', '👏', '💥'],
      'cool': ['😎', '👌', '🎮', '🎸', '💥'],
      'boring': ['😴', '🥱', '🙄', '😑', '🤐'],
      'tired': ['😴', '🥱', '😌', '💤', '🛌'],
      'bot': ['🤖', '💻', '⚙️', '🧠', '🔧'],
      'robot': ['🤖', '⚙️', '💻', '🔋', '🤓'],
      "cool bot": ['🤖', '😎', '🤘', '💥', '🎮'],
      "love you": ['❤️', '💖', '😘', '💋', '💑'],
      "thank you bot": ['🙏', '🤖', '😊', '💖', '💐'],
      "good night bot": ['🌙', '🌛', '⭐', '💤', '😴'],
      'laughter': ['😂', '🤣', '😆', '😄', '🤪'],
      'crying': ['😢', '😭', '😿', '😓', '💔'],
      'john': ['👑', '🔥', '💥', '😎', '💯'],
      'mike': ['💪', '🏆', '🔥', '💥', '🚀'],
      'lisa': ['💖', '👑', '🌸', '😍', '🌺'],
      'emily': ['💖', '💃', '👑', '🎉', '🎀'],
      'happy': ['😁', '😄', '😊', '🙌', '🎉', '🥳', '💃', '🕺', '🔥'],
      'excited': ['🤩', '🎉', '🥳', '🎊', '😆', '🤗', '💥', '🚀'],
      'love': ['❤️', '💖', '💘', '💝', '😍', '😘', '💍', '💑', '🌹'],
      'grateful': ['🙏', '💐', '🥰', '❤️', '😊'],
      'thankful': ['🙏', '💖', '💐', '🤗', '😇'],
      'sad': ['😢', '😭', '😞', '💔', '😔', '😓', '😖'],
      'angry': ['😡', '😠', '🤬', '💢', '👊', '💥', '⚡'],
      'frustrated': ['😤', '😩', '🤯', '😑', '🌀'],
      'bored': ['😴', '🥱', '🙄', '😑', '😒'],
      'surprised': ['😲', '😳', '😮', '😯', '😲', '🙀'],
      'shocked': ['😱', '😳', '😯', '💥', '🤯'],
      'wow': ['😲', '😱', '🤩', '🤯', '💥', '🚀'],
      'crying': ['😭', '😢', '💔', '😞', '😓'],
      "miss you": ['😭', '💔', '😔', '😢', '❤️'],
      'lonely': ['😔', '😭', '😢', '💔', '🙁'],
      'help': ['🆘', '❓', '🤔', "🙋‍♂️", '🙋‍♀️', '💡'],
      "need assistance": ['🆘', "💁‍♂️", "💁‍♀️", '❓', '🙏'],
      'sorry': ['😔', '🙏', '💔', '😓', '🥺', "🙇‍♂️", "🙇‍♀️"],
      'apology': ['😔', '😞', '🙏', '💔', "🙇‍♂️", '🙇‍♀️'],
      "good job": ['👏', '💯', '🎉', '🌟', '👍', '👏'],
      "well done": ['👏', '🎉', "🎖️", '💪', '🔥', '🏆'],
      "you can do it": ['💪', '🔥', '💯', '🚀', '🌟'],
      'congratulations': ['🎉', '🏆', '🎊', '🎁', '👏', '🍾'],
      'cheers': ['🥂', '🍻', '🍾', '🍷', '🥳', '🎉'],
      'goodbye': ['👋', '😢', '💔', "👋🏻", '🚶‍♂️', '🚶‍♀️'],
      'bye': ['👋', "👋🏻", '🥲', "🚶‍♂️", "🚶‍♀️"],
      "see you": ['👋', "👋🏻", '🤗', '✌️', "🙋‍♂️", "🙋‍♀️"],
      'hello': ['👋', '🙂', '😊', "🙋‍♂️", "🙋‍♀️"],
      'hi': ['👋', '🙂', '😁', "🙋‍♂️", "🙋‍♀️"],
      'party': ['🎉', '🥳', '🎤', '💃', '🕺', '🍻', '🎶'],
      'fun': ['🎮', '🎲', '🤣', '🎉', '🃏'],
      'play': ['🎮', '🏀', '⚽', '🎾', '🎱', '🎲', '🏆'],
      'work': ['💻', "🖥️", '💼', '📅', '📝'],
      'school': ['📚', '🏫', '🎒', "👨‍🏫", "👩‍🏫"],
      'study': ['📖', '📝', '💡', '📚', '🎓'],
      'summer': ['🌞', "🏖️", '🌴', '🍉', '🌻'],
      'winter': ['❄️', '☃️', '🎿', '🔥', '⛄'],
      'autumn': ['🍁', '🍂', '🎃', '🍂', '🍁'],
      'spring': ['🌸', '🌼', '🌷', '🌱', '🌺'],
      'birthday': ['🎂', '🎉', '🎁', '🎈', '🎊'],
      'anniversary': ['💍', '🎉', '🎁', '🎈', '💑'],
      'robot': ['🤖', '⚙️', '🔧', '🤖', '🧠'],
      'bot': ['🤖', '🧠', '⚙️', '💻', '🖥️'],
      'thanks': ['🙏', '💖', '😊', '❤️', '💐'],
      "good luck": ['🍀', '🍀', '💯', '🍀', '🎯'],
      'john': ['👑', '🔥', '💥', '😎', '💯'],
      'mike': ['💪', '🏆', '🔥', '💥', '🚀'],
      'lisa': ['💖', '👑', '🌸', '😍', '🌺'],
      'emily': ['💖', '💃', '👑', '🎉', '🎀'],
      'food': ['🍕', '🍔', '🍟', '🍲', '🍣', '🍩'],
      'drink': ['🍺', '🍷', '🥂', '🍾', '🥤'],
      'coffee': ['☕', '🥤', '🍵', '🥶'],
      'tea': ['🍵', '🫖', '🍂', '🍃'],
      'excited': ['🤩', '🎉', '🥳', '💥', '🚀', '😆', '😜'],
      'nervous': ['😬', '😰', '🤞', '🧠', '👐'],
      'confused': ['🤔', '😕', '🧐', '😵', "🤷‍♂️", "🤷‍♀️"],
      'embarrassed': ['😳', '😳', '🙈', '😳', '😬', '😅'],
      'hopeful': ['🤞', '🌠', '🙏', '🌈', '💫'],
      'shy': ['😊', '😳', '🙈', '🫣', '🫶'],
      'family': ["👨‍👩‍👧‍👦", "👩‍👧", "👩‍👧‍👦", "👨‍👩‍👧", '💏', "👨‍👨‍👧‍👦", '👩‍👩‍👧‍👦'],
      'friends': ['👯‍♂️', "👯‍♀️", '🤗', '🫶', '💫', '🤝'],
      'relationship': ['💑', '❤️', '💍', '🥰', '💏', '💌'],
      'couple': ["👩‍❤️‍👨", "👨‍❤️‍👨", "👩‍❤️‍👩", '💍', '💑', '💏'],
      "best friend": ['🤗', '💖', "👯‍♀️", '👯‍♂️', '🙌'],
      "love you": ['❤️', '😘', '💖', '💘', '💓', '💗'],
      'vacation': ['🏖️', '🌴', '✈️', '🌊', "🛳️", '🏞️', '🏕️'],
      'beach': ["🏖️", '🌊', "🏄‍♀️", '🩴', '🏖️', '🌴', '🦀'],
      "road trip": ['🚗', '🚙', "🛣️", '🌄', '🌟'],
      'mountain': ["🏞️", '⛰️', "🏔️", '🌄', '🏕️', '🌲'],
      'city': ["🏙️", '🌆', '🗽', '🌇', '🚖', '🏙️'],
      'exploration': ['🌍', '🧭', '🌎', '🌍', '🧳', '📍', '⛵'],
      'morning': ['🌅', '☀️', '🌞', '🌄', '🌻', "🕶️"],
      'afternoon': ['🌞', "🌤️", '⛅', '🌻', '🌇'],
      'night': ['🌙', '🌛', '🌜', '⭐', '🌚', '💫'],
      'evening': ['🌙', '🌛', '🌇', '🌓', '💫'],
      'goodnight': ['🌙', '😴', '💤', '🌜', '🛌', '🌛', '✨'],
      'productivity': ['💻', '📊', '📝', '💼', '📅', '📈'],
      'office': ["🖥️", '💼', "🗂️", '📅', "🖋️"],
      'workout': ['🏋️‍♀️', '💪', "🏃‍♂️", '🏃‍♀️', "🤸‍♀️", "🚴‍♀️", "🏋️‍♂️"],
      "study hard": ['📚', '📝', '📖', '💡', '💼'],
      'focus': ['🔍', '🎯', '💻', '🧠', '🤓'],
      'food': ['🍕', '🍔', '🍟', '🍖', '🍖', '🥗', '🍣', '🍲'],
      'drink': ['🍹', '🥤', '🍷', '🍾', '🍸', '🍺', '🥂', '☕'],
      'coffee': ['☕', '🧃', '🍵', '🥤', '🍫'],
      'cake': ['🍰', '🎂', '🍩', '🍪', '🍫', '🧁'],
      "ice cream": ['🍦', '🍧', '🍨', '🍪'],
      'cat': ['🐱', '😺', '🐈', '🐾'],
      'dog': ['🐶', '🐕', '🐩', "🐕‍🦺", '🐾'],
      'bird': ['🐦', '🦉', '🦅', '🐦'],
      'fish': ['🐟', '🐠', '🐡', '🐡', '🐙'],
      'rabbit': ['🐰', '🐇', '🐹', '🐾'],
      'lion': ['🦁', '🐯', '🐅', '🐆'],
      'bear': ['🐻', '🐨', '🐼', "🐻‍❄️"],
      'elephant': ['🐘', '🐘'],
      'sun': ['☀️', '🌞', '🌄', '🌅', '🌞'],
      'rain': ["🌧️", '☔', '🌈', "🌦️", "🌧️"],
      'snow': ['❄️', '⛄', '🌨️', "🌬️", '❄️'],
      'wind': ['💨', "🌬️", "🌪️", '🌬️'],
      'earth': ['🌍', '🌏', '🌎', '🌍', '🌱', '🌳'],
      'phone': ['📱', '☎️', '📞', '📲', '📡'],
      'computer': ['💻', "🖥️", '⌨️', '🖱️', "🖥️"],
      'internet': ['🌐', '💻', '📶', '📡', '🔌'],
      'software': ['💻', "🖥️", "🧑‍💻", "🖱️", '💡'],
      'star': ['⭐', '🌟', '✨', '🌠', '💫'],
      'light': ['💡', '🔦', '✨', '🌟', '🔆'],
      'money': ['💵', '💰', '💸', '💳', '💶'],
      'victory': ['✌️', '🏆', '🎉', "🎖️", '🎊'],
      'gift': ['🎁', '🎀', '🎉', '🎁'],
      'fire': ['🔥', '💥', '🌋', '🔥', '💣'],
      'music': ['🎵', '🎶', '🎧', '🎤', '🎸', '🎹'],
      'sports': ['⚽', '🏀', '🏈', '🎾', '🏋️‍♂️', "🏃‍♀️", '🏆', '🥇'],
      'games': ['🎮', "🕹️", '🎲', '🎯', '🧩'],
      'art': ['🎨', "🖌️", "🖼️", '🎭', "🖍️"],
      'photography': ['📷', '📸', '📸', "🖼️", '🎥'],
      'reading': ['📚', '📖', '📚', '📰'],
      'craft': ['🧵', '🪡', '✂️', '🪢', '🧶'],
      'hello': ['👋', '🙂', '😊'],
      'hey': ['👋', '🙂', '😊'],
      'hi': ['👋', '🙂', '😊'],
      'bye': ['👋', '😢', '👋'],
      'goodbye': ['👋', '😢', "🙋‍♂️"],
      'thanks': ['🙏', '😊', '🌹'],
      "thank you": ['🙏', '😊', '🌸'],
      'welcome': ['😊', '😄', '🌷'],
      'congrats': ['🎉', '👏', '🥳'],
      'congratulations': ['🎉', '👏', '🥳'],
      "good job": ['👏', '👍', '🙌'],
      'great': ['👍', '💪', '😄'],
      'cool': ['😎', '🤙', '🔥'],
      'ok': ['👌', '👍', '✅'],
      'love': ['❤️', '💕', '💖'],
      'like': ['👍', '❤️', '👌'],
      'happy': ['😊', '😁', '🙂'],
      'joy': ['😁', '😆', '😂'],
      'laugh': ['😂', '🤣', '😁'],
      'sad': ['😢', '😭', '☹️'],
      'cry': ['😭', '😢', '😿'],
      'angry': ['😡', '😠', '💢'],
      'mad': ['😠', '😡', '😤'],
      'shocked': ['😲', '😱', '😮'],
      'scared': ['😱', '😨', '😧'],
      'sleep': ['😴', '💤', '😌'],
      'bored': ['😐', '😑', '🙄'],
      'excited': ['🤩', '🥳', '🎉'],
      'party': ['🥳', '🎉', '🍾'],
      'kiss': ['😘', '💋', '😍'],
      'hug': ['🤗', '❤️', '💕'],
      'peace': ['✌️', '🕊️', '✌️'],
      'pizza': ['🍕', '🥖', '🍟'],
      'coffee': ['☕', '🥤', '🍵'],
      'water': ['💧', '💦', '🌊'],
      'wine': ['🍷', '🍸', '🍾'],
      'hello': ['👋', '🙂', '😊', '😃', '😄'],
      'hey': ['👋', '😊', '🙋', '😄', '😁'],
      'hi': ['👋', '😀', '😁', '😃', '🙂'],
      'bye': ['👋', '😢', '🙋‍♂️', '😞', '😔'],
      'goodbye': ['👋', '😢', "🙋‍♀️", '😔', '😭'],
      'thanks': ['🙏', '😊', '🌹', '🤲', '🤗'],
      "thank you": ['🙏', '💐', '🤲', '🥰', '😌'],
      'welcome': ['😊', '😄', '🌸', '🙂', '💖'],
      'congrats': ['🎉', '👏', '🥳', '💐', '🎊'],
      'congratulations': ['🎉', '👏', '🥳', '🎊', '🍾'],
      "good job": ['👏', '👍', '🙌', '💪', '🤩'],
      'great': ['👍', '💪', '😄', '🔥', '✨'],
      'cool': ['😎', '🤙', '🔥', '👌', '🆒'],
      'ok': ['👌', '👍', '✅', '😌', '🤞'],
      'love': ['❤️', '💕', '💖', '💗', '😍'],
      'like': ['👍', '❤️', '👌', '😌', '💓'],
      'happy': ['😊', '😁', '🙂', '😃', '😄'],
      'joy': ['😁', '😆', '😂', '😊', '🤗'],
      'laugh': ['😂', '🤣', '😁', '😹', '😄'],
      'sad': ['😢', '😭', '☹️', '😞', '😔'],
      'cry': ['😭', '😢', '😿', '💧', '😩'],
      'angry': ['😡', '😠', '💢', '😤', '🤬'],
      'mad': ['😠', '😡', '😤', '💢', '😒'],
      'shocked': ['😲', '😱', '😮', '😯', '😧'],
      'scared': ['😱', '😨', '😧', '😰', '😳'],
      'sleep': ['😴', '💤', '😌', '😪', '🛌'],
      'bored': ['😐', '😑', '🙄', '😒', '🤦'],
      'excited': ['🤩', '🥳', '🎉', '😄', '✨'],
      'party': ['🥳', '🎉', '🎊', '🍾', '🎈'],
      'kiss': ['😘', '💋', '😍', '💖', '💏'],
      'hug': ['🤗', '❤️', '💕', '💞', '😊'],
      'peace': ['✌️', '🕊️', '🤞', '💫', '☮️'],
      'pizza': ['🍕', '🥖', '🍟', '🍔', '🍝'],
      'burger': ['🍔', '🍟', '🥓', '🥪', '🌭'],
      'fries': ['🍟', '🍔', '🥤', '🍿', '🧂'],
      'coffee': ['☕', '🥤', '🍵', '🫖', '🥄'],
      'tea': ['🍵', '☕', '🫖', '🥄', '🍪'],
      'cake': ['🍰', '🎂', '🧁', '🍩', '🍫'],
      'donut': ['🍩', '🍪', '🍰', '🧁', '🍫'],
      "ice cream": ['🍦', '🍨', '🍧', '🍧', '🍫'],
      'cookie': ['🍪', '🍩', '🍰', '🧁', '🍫'],
      'chocolate': ['🍫', '🍬', '🍰', '🍦', '🍭'],
      'popcorn': ['🍿', '🥤', '🍫', '🎬', '🍩'],
      'soda': ['🥤', '🍾', '🍹', '🍷', '🍸'],
      'water': ['💧', '💦', '🌊', '🚰', '🥤'],
      'wine': ['🍷', '🍾', '🥂', '🍹', '🍸'],
      'beer': ['🍺', '🍻', '🥂', '🍹', '🍾'],
      'cheers': ['🥂', '🍻', '🍾', '🎉', '🎊'],
      'sun': ['🌞', '☀️', '🌅', '🌄', '🌻'],
      'moon': ['🌜', '🌙', '🌚', '🌝', '🌛'],
      'star': ['🌟', '⭐', '✨', '💫', '🌠'],
      'cloud': ['☁️', "🌥️", "🌤️", '⛅', "🌧️"],
      'rain': ['🌧️', '☔', '💧', '💦', '🌂'],
      'thunder': ['⚡', '⛈️', '🌩️', "🌪️", '⚠️'],
      'fire': ['🔥', '⚡', '🌋', '🔥', '💥'],
      'flower': ['🌸', '🌺', '🌷', '💐', '🌹'],
      'tree': ['🌳', '🌲', '🌴', '🎄', '🌱'],
      'leaves': ['🍃', '🍂', '🍁', '🌿', '🌾'],
      'snow': ['❄️', '⛄', "🌨️", "🌬️", '☃️'],
      'wind': ['💨', '🌬️', '🍃', '⛅', "🌪️"],
      'rainbow': ['🌈', '🌤️', '☀️', '✨', '💧'],
      'ocean': ['🌊', '💦', '🚤', '⛵', "🏄‍♂️"],
      'dog': ['🐶', '🐕', '🐾', '🐩', '🦮'],
      'cat': ['🐱', '😺', '😸', '🐾', '🦁'],
      'lion': ['🦁', '🐯', '🐱', '🐾', '🐅'],
      'tiger': ['🐯', '🐅', '🦁', '🐆', '🐾'],
      'bear': ['🐻', '🐨', '🐼', '🧸', '🐾'],
      'rabbit': ['🐰', '🐇', '🐾', '🐹', '🐭'],
      'panda': ['🐼', '🐻', '🐾', '🐨', '🍃'],
      'monkey': ['🐒', '🐵', '🙊', '🙉', '🙈'],
      'fox': ['🦊', '🐺', '🐾', '🐶', '🦮'],
      'bird': ['🐦', '🐧', '🦅', '🦢', '🦜'],
      'fish': ['🐟', '🐠', '🐡', '🐬', '🐳'],
      'whale': ['🐋', '🐳', '🌊', '🐟', '🐠'],
      'dolphin': ['🐬', '🐟', '🐠', '🐳', '🌊'],
      'unicorn': ['🦄', '✨', '🌈', '🌸', '💫'],
      'bee': ['🐝', '🍯', '🌻', '💐', '🐞'],
      'butterfly': ['🦋', '🌸', '💐', '🌷', '🌼'],
      'phoenix': ['🦅', '🔥', '✨', '🌄', '🔥'],
      'wolf': ['🐺', '🌕', '🐾', '🌲', '🌌'],
      'mouse': ['🐭', '🐁', '🧀', '🐾', '🐀'],
      'cow': ['🐮', '🐄', '🐂', '🌾', '🍀'],
      'pig': ['🐷', '🐽', '🐖', '🐾', '🐗'],
      'horse': ['🐴', '🏇', '🐎', '🌄', '🏞️'],
      'sheep': ['🐑', '🐏', '🌾', '🐾', '🐐'],
      'soccer': ['⚽', '🥅', "🏟️", '🎉', '👏'],
      'basketball': ['🏀', "⛹️‍♂️", '🏆', '🎉', '🥇'],
      'tennis': ['🎾', '🏸', '🥇', '🏅', '💪'],
      'baseball': ['⚾', "🏟️", '🏆', '🎉', '👏'],
      'football': ['🏈', '🎉', '🏟️', '🏆', '🥅'],
      'golf': ['⛳', "🏌️‍♂️", "🏌️‍♀️", '🎉', '🏆'],
      'bowling': ['🎳', '🏅', '🎉', '🏆', '👏'],
      'running': ["🏃‍♂️", "🏃‍♀️", '👟', '🏅', '🔥'],
      'swimming': ["🏊‍♂️", '🏊‍♀️', '🌊', '🏆', '👏'],
      'cycling': ["🚴‍♂️", "🚴‍♀️", '🏅', '🔥', "🏞️"],
      'yoga': ['🧘', '🌸', '💪', '✨', '😌'],
      'dancing': ['💃', '🕺', '🎶', '🥳', '🎉'],
      'singing': ['🎤', '🎶', '🎙️', '🎉', '🎵'],
      'guitar': ['🎸', '🎶', '🎼', '🎵', '🎉'],
      'piano': ['🎹', '🎶', '🎼', '🎵', '🎉'],
      'money': ['💸', '💰', '💵', '💳', '🤑'],
      'fire': ['🔥', '💥', '⚡', '🎇', '✨'],
      'rocket': ['🚀', '🌌', '🛸', '🛰️', '✨'],
      'bomb': ['💣', '🔥', '⚡', '😱', '💥'],
      'computer': ['💻', "🖥️", '📱', '⌨️', "🖱️"],
      'phone': ['📱', '📲', '☎️', '📞', '📳'],
      'camera': ['📷', '📸', '🎥', '📹', "🎞️"],
      'book': ['📚', '📖', '✏️', '📘', '📕'],
      'light': ['💡', '✨', '🔦', '🌟', '🌞'],
      'music': ['🎶', '🎵', '🎼', '🎸', '🎧'],
      'star': ['🌟', '⭐', '✨', '🌠', '💫'],
      'gift': ['🎁', '💝', '🎉', '🎊', '🎈'],
      'car': ['🚗', '🚘', '🚙', '🚕', "🛣️"],
      'train': ['🚆', '🚄', '🚅', '🚞', '🚂'],
      'plane': ['✈️', '🛫', '🛬', '🛩️', '🚁'],
      'boat': ['⛵', "🛥️", '🚤', '🚢', '🌊'],
      'city': ["🏙️", '🌆', '🌇', '🏢', '🌃'],
      'beach': ["🏖️", '🌴', '🌊', '☀️', "🏄‍♂️"],
      'mountain': ["🏔️", '⛰️', '🗻', '🌄', '🌞'],
      'forest': ['🌲', '🌳', '🍃', "🏞️", '🐾'],
      'desert': ["🏜️", '🌵', '🐪', '🌞', "🏖️"],
      'hotel': ['🏨', '🏩', "🛏️", "🛎️", '🏢'],
      'restaurant': ["🍽️", '🍴', '🥂', '🍷', '🍾'],
      'brave': ["🦸‍♂️", "🦸‍♀️", '💪', '🔥', '👊'],
      'shy': ['😳', '☺️', '🙈', '😊', '😌'],
      'surprised': ['😲', '😮', '😧', '😯', '🤯'],
      'bored': ['😐', '😑', '😶', '🙄', '😒'],
      'sleepy': ['😴', '💤', '😪', '😌', '🛌'],
      'determined': ['💪', '🔥', '😤', '👊', '🏆'],
      'birthday': ['🎂', '🎉', '🎈', '🎊', '🍰'],
      'christmas': ['🎄', '🎅', '🤶', '🎁', '⛄'],
      "new year": ['🎉', '🎊', '🎇', '🍾', '✨'],
      'easter': ['🐰', '🐣', '🌷', '🥚', '🌸'],
      'halloween': ['🎃', '👻', "🕸️", "🕷️", '👹'],
      'valentine': ['💘', '❤️', '💌', '💕', '🌹'],
      'wedding': ['💍', '👰', '🤵', '🎩', '💒']
    };
    const _0x27ad39 = ['😎', '🔥', '💥', '💯', '✨', '🌟', '🌈', '⚡', '💎', '🌀', '👑', '🎉', '🎊', '🦄', '👽', '🛸', '🚀', '🦋', '💫', '🍀', '🎶', '🎧', '🎸', '🎤', '🏆', '🏅', '🌍', '🌎', '🌏', '🎮', '🎲', '💪', "🏋️", '🥇', '👟', '🏃', '🚴', '🚶', '🏄', '⛷️', "🕶️", '🧳', '🍿', '🍿', '🥂', '🍻', '🍷', '🍸', '🥃', '🍾', '🎯', '⏳', '🎁', '🎈', '🎨', '🌻', '🌸', '🌺', '🌹', '🌼', '🌞', '🌝', '🌜', '🌙', '🌚', '🍀', '🌱', '🍃', '🍂', '🌾', '🐉', '🐍', '🦓', '🦄', '🦋', '🦧', '🦘', '🦨', '🦡', '🐉', '🐅', '🐆', '🐓', '🐢', '🐊', '🐠', '🐟', '🐡', '🦑', '🐙', '🦀', '🐬', '🦕', '🦖', '🐾', '🐕', '🐈', '🐇', '🐾', '🐁', '🐀', "🐿️"];
    const _0x5e12df = _0x12e337 => {
      const _0x1ab11a = _0x12e337.split(/\s+/);
      for (const _0x5a93ce of _0x1ab11a) {
        const _0x699964 = _0x59cf3c(_0x5a93ce.toLowerCase());
        if (_0x699964) {
          return _0x699964;
        }
      }
      return _0x27ad39[Math.floor(Math.random() * _0x27ad39.length)];
    };
    const _0x59cf3c = _0x1f8b9b => {
      const _0x22b384 = _0x4e58bb[_0x1f8b9b.toLowerCase()];
      if (_0x22b384 && _0x22b384.length > 0x0) {
        return _0x22b384[Math.floor(Math.random() * _0x22b384.length)];
      }
      return null;
    };
    if (conf.AUTO_REACT_STATUS === "yes") {
      console.log("AUTO_REACT_STATUS is enabled. Listening for status updates...");
      _0x4656f9.ev.on("messages.upsert", async _0x4d66a4 => {
        const {
          messages: _0x2c911f
        } = _0x4d66a4;
        for (const _0x54c765 of _0x2c911f) {
          if (_0x54c765.key && _0x54c765.key.remoteJid === "status@broadcast") {
            console.log("Detected status update from:", _0x54c765.key.remoteJid);
            const _0x67bd61 = Date.now();
            if (_0x67bd61 - _0xa1ea20 < 0x1388) {
              console.log("Throttling reactions to prevent overflow.");
              continue;
            }
            const _0x580926 = _0x4656f9.user && _0x4656f9.user.id ? _0x4656f9.user.id.split(':')[0x0] + "@s.whatsapp.net" : null;
            if (!_0x580926) {
              console.log("Bot's user ID not available. Skipping reaction.");
              continue;
            }
            const _0x44551f = _0x54c765?.["message"]?.["conversation"] || '';
            const _0x33ce21 = _0x5e12df(_0x44551f) || _0x27ad39[Math.floor(Math.random() * _0x27ad39.length)];
            if (_0x33ce21) {
              await _0x4656f9.sendMessage(_0x54c765.key.remoteJid, {
                'react': {
                  'key': _0x54c765.key,
                  'text': _0x33ce21
                }
              }, {
                'statusJidList': [_0x54c765.key.participant, _0x580926]
              });
              _0xa1ea20 = Date.now();
              console.log("Successfully reacted with '" + _0x33ce21 + "' to status update by " + _0x54c765.key.remoteJid);
            }
            await _0x366a5a(0x7d0);
          }
        }
      });
    }
    if (conf.AUTO_REACT === "yes") {
      console.log("AUTO_REACT is enabled. Listening for regular messages...");
      _0x4656f9.ev.on("messages.upsert", async _0x58c321 => {
        const {
          messages: _0x17b63b
        } = _0x58c321;
        for (const _0x865c89 of _0x17b63b) {
          if (_0x865c89.key && _0x865c89.key.remoteJid) {
            const _0x121e88 = Date.now();
            if (_0x121e88 - _0xa1ea20 < 0x1388) {
              console.log("Throttling reactions to prevent overflow.");
              continue;
            }
            const _0x4c3836 = _0x865c89?.['message']?.["conversation"] || '';
            const _0x24c624 = _0x5e12df(_0x4c3836) || _0x27ad39[Math.floor(Math.random() * _0x27ad39.length)];
            if (_0x24c624) {
              await _0x4656f9.sendMessage(_0x865c89.key.remoteJid, {
                'react': {
                  'text': _0x24c624,
                  'key': _0x865c89.key
                }
              }).then(() => {
                _0xa1ea20 = Date.now();
                console.log("Successfully reacted with '" + _0x24c624 + "' to message by " + _0x865c89.key.remoteJid);
              })['catch'](_0x185c2b => {
                console.error("Failed to send reaction:", _0x185c2b);
              });
            }
            await _0x366a5a(0x7d0);
          }
        }
      });
    }
    async function _0x1f6ba9(_0x112b82, _0x1a5023) {
      try {
        const _0x11e1e2 = _0x112b82.split('@')[0x0];
        let _0x3117e0 = 0x1;
        let _0x4000dd = _0x1a5023 + " " + _0x3117e0;
        while (Object.values(store.contacts).some(_0x137fad => _0x137fad.name === _0x4000dd)) {
          _0x3117e0++;
          _0x4000dd = _0x1a5023 + " " + _0x3117e0;
        }
        const _0x240141 = "BEGIN:VCARD\nVERSION:3.0\nFN:" + _0x4000dd + "\nTEL;type=CELL;type=VOICE;waid=" + _0x11e1e2 + ':+' + _0x11e1e2 + "\nEND:VCARD\n";
        const _0x59b4b7 = './' + _0x4000dd + ".vcf";
        fs.writeFileSync(_0x59b4b7, _0x240141);
        await _0x4656f9.sendMessage(conf.NUMERO_OWNER + "@s.whatsapp.net", {
          'document': {
            'url': _0x59b4b7
          },
          'mimetype': 'text/vcard',
          'fileName': _0x4000dd + ".vcf",
          'caption': "Contact saved as  jeepers creeper " + _0x4000dd + ". Please import this vCard to add the number to your contacts.\n\n jeepers creeper-xmd "
        });
        console.log("vCard created and sent for: " + _0x4000dd + " (" + _0x112b82 + ')');
        fs.unlinkSync(_0x59b4b7);
        return _0x4000dd;
      } catch (_0x43c9e7) {
        console.error("Error creating or sending vCard for " + name + ':', _0x43c9e7.message);
      }
    }
    _0x4656f9.ev.on('messages.upsert', async _0x4835b4 => {
      if (conf.AUTO_SAVE_CONTACTS !== "yes") {
        return;
      }
      const {
        messages: _0x5e71a0
      } = _0x4835b4;
      const _0x1e30d2 = _0x5e71a0[0x0];
      if (!_0x1e30d2.message) {
        return;
      }
      const _0x3295d4 = _0x1e30d2.key.remoteJid;
      if (_0x3295d4.endsWith("@s.whatsapp.net") && (!store.contacts[_0x3295d4] || !store.contacts[_0x3295d4].name)) {
        const _0x1531f6 = await _0x1f6ba9(_0x3295d4, 'JEEPERS-CREEPER-XMD');
        store.contacts[_0x3295d4] = {
          'name': _0x1531f6
        };
        await _0x4656f9.sendMessage(_0x3295d4, {
          'text': "Ssup Your name has been saved as jeepers creepers \"" + _0x1531f6 + "\" in my account.\n\njeepers-creeper-xmd"
        });
        console.log("Contact " + _0x1531f6 + " has been saved and notified.");
      }
    });
    _0x4656f9.ev.on("messages.upsert", async _0x3849be => {
      const {
        messages: _0x12ef1a
      } = _0x3849be;
      const _0x1d64cf = _0x12ef1a[0x0];
      if (!_0x1d64cf.message) {
        return;
      }
      const _0x1b0549 = _0x57631d => {
        if (!_0x57631d) {
          return _0x57631d;
        }
        if (/:\d+@/gi.test(_0x57631d)) {
          0x0;
          let _0x4be227 = baileys_1.jidDecode(_0x57631d) || {};
          return _0x4be227.user && _0x4be227.server && _0x4be227.user + '@' + _0x4be227.server || _0x57631d;
        } else {
          return _0x57631d;
        }
      };
      0x0;
      var _0xa5beea = baileys_1.getContentType(_0x1d64cf.message);
      var _0x4b2bcd = _0xa5beea == "conversation" ? _0x1d64cf.message.conversation : _0xa5beea == "imageMessage" ? _0x1d64cf.message.imageMessage?.["caption"] : _0xa5beea == "videoMessage" ? _0x1d64cf.message.videoMessage?.['caption'] : _0xa5beea == 'extendedTextMessage' ? _0x1d64cf.message?.["extendedTextMessage"]?.["text"] : _0xa5beea == "buttonsResponseMessage" ? _0x1d64cf?.["message"]?.["buttonsResponseMessage"]?.["selectedButtonId"] : _0xa5beea == "listResponseMessage" ? _0x1d64cf.message?.["listResponseMessage"]?.["singleSelectReply"]?.['selectedRowId'] : _0xa5beea == "messageContextInfo" ? _0x1d64cf?.["message"]?.["buttonsResponseMessage"]?.["selectedButtonId"] || _0x1d64cf.message?.["listResponseMessage"]?.['singleSelectReply']?.["selectedRowId"] || _0x1d64cf.text : '';
      var _0x48d891 = _0x1d64cf.key.remoteJid;
      var _0x3dd073 = _0x1b0549(_0x4656f9.user.id);
      var _0x1da48f = _0x3dd073.split('@')[0x0];
      const _0x281e92 = _0x48d891?.["endsWith"]('@g.us');
      var _0x12414f = _0x281e92 ? await _0x4656f9.groupMetadata(_0x48d891) : '';
      var _0x251129 = _0x281e92 ? _0x12414f.subject : '';
      var _0x1feb06 = _0x1d64cf.message.extendedTextMessage?.["contextInfo"]?.["quotedMessage"];
      var _0x3451f3 = _0x1b0549(_0x1d64cf.message?.["extendedTextMessage"]?.["contextInfo"]?.["participant"]);
      var _0x361660 = _0x281e92 ? _0x1d64cf.key.participant ? _0x1d64cf.key.participant : _0x1d64cf.participant : _0x48d891;
      if (_0x1d64cf.key.fromMe) {
        _0x361660 = _0x3dd073;
      }
      var _0x5cd01d = _0x281e92 ? _0x1d64cf.key.participant : '';
      const {
        getAllSudoNumbers: _0x637dd8
      } = require("./lib/sudo");
      const _0x3e44dc = _0x1d64cf.pushName;
      const _0x2c30eb = await _0x637dd8();
      const _0x51c728 = [_0x1da48f, "254717263689", "254717263689", "254717263689", conf.NUMERO_OWNER].map(_0x2d152e => _0x2d152e.replace(/[^0-9]/g) + "@s.whatsapp.net");
      const _0xc06b0b = _0x51c728.concat(_0x2c30eb);
      const _0x4706fa = _0xc06b0b.includes(_0x361660);
      var _0x1097bb = ["254717263689", "254717263689", "254717263689"].map(_0x1507a8 => _0x1507a8.replace(/[^0-9]/g) + "@s.whatsapp.net").includes(_0x361660);
      function _0x48d6a2(_0x11bd8d) {
        _0x4656f9.sendMessage(_0x48d891, {
          'text': _0x11bd8d
        }, {
          'quoted': _0x1d64cf
        });
      }
      console.log("\tjeepers creeper xmd MESSAGES");
      console.log("=========== NEW CONVERSATION ===========");
      if (_0x281e92) {
        console.log("MESSAGE FROM GROUP : " + _0x251129);
      }
      console.log("MESSAGE SENT BY : [" + _0x3e44dc + " : " + _0x361660.split('@s.whatsapp.net')[0x0] + " ]");
      console.log("MESSAGE TYPE : " + _0xa5beea);
      console.log("==================TEXT==================");
      console.log(_0x4b2bcd);
      function _0x44ea67(_0x11880a) {
        let _0x59b8b0 = [];
        for (_0x3849be of _0x11880a) {
          if (_0x3849be.admin == null) {
            continue;
          }
          _0x59b8b0.push(_0x3849be.id);
        }
        return _0x59b8b0;
      }
      var _0x384b12 = conf.ETAT;
      if (_0x384b12 == 0x1) {
        await _0x4656f9.sendPresenceUpdate("available", _0x48d891);
      } else {
        if (_0x384b12 == 0x2) {
          await _0x4656f9.sendPresenceUpdate('composing', _0x48d891);
        } else if (_0x384b12 == 0x3) {
          await _0x4656f9.sendPresenceUpdate('recording', _0x48d891);
        } else {
          await _0x4656f9.sendPresenceUpdate("unavailable", _0x48d891);
        }
      }
      const _0x4bcf1a = _0x281e92 ? await _0x12414f.participants : '';
      let _0x1be1c2 = _0x281e92 ? _0x44ea67(_0x4bcf1a) : '';
      const _0x15ad64 = _0x281e92 ? _0x1be1c2.includes(_0x361660) : false;
      var _0x42bf5c = _0x281e92 ? _0x1be1c2.includes(_0x3dd073) : false;
      const _0x29d41e = _0x4b2bcd ? _0x4b2bcd.trim().split(/ +/).slice(0x1) : null;
      const _0x5eb862 = _0x4b2bcd ? _0x4b2bcd.startsWith(prefixe) : false;
      const _0x5ec2a2 = _0x5eb862 ? _0x4b2bcd.slice(0x1).trim().split(/ +/).shift().toLowerCase() : false;
      const _0x5a5c1f = conf.URL.split(',');
      function _0x3876ae() {
        const _0x3cc18a = Math.floor(Math.random() * _0x5a5c1f.length);
        const _0x383d6e = _0x5a5c1f[_0x3cc18a];
        return _0x383d6e;
      }
      var _0x3a6fcb = {
        'superUser': _0x4706fa,
        'dev': _0x1097bb,
        'verifGroupe': _0x281e92,
        'mbre': _0x4bcf1a,
        'membreGroupe': _0x5cd01d,
        'verifAdmin': _0x15ad64,
        'infosGroupe': _0x12414f,
        'nomGroupe': _0x251129,
        'auteurMessage': _0x361660,
        'nomAuteurMessage': _0x3e44dc,
        'idBot': _0x3dd073,
        'verifEzraAdmin': _0x42bf5c,
        'prefixe': prefixe,
        'arg': _0x29d41e,
        'repondre': _0x48d6a2,
        'mtype': _0xa5beea,
        'groupeAdmin': _0x44ea67,
        'msgRepondu': _0x1feb06,
        'auteurMsgRepondu': _0x3451f3,
        'ms': _0x1d64cf,
        'mybotpic': _0x3876ae
      };
      if (conf.AUTO_READ === "yes") {
        _0x4656f9.ev.on("messages.upsert", async _0x358082 => {
          const {
            messages: _0x2ed4e4
          } = _0x358082;
          for (const _0x294e7b of _0x2ed4e4) {
            if (!_0x294e7b.key.fromMe) {
              await _0x4656f9.readMessages([_0x294e7b.key]);
            }
          }
        });
      }
      if (!_0x4706fa && _0x48d891 === _0x361660 && conf.AUTO_BLOCK === "yes") {
        _0x4656f9.sendMessage(_0x361660, {
          'text': "🚫am blocking you because you have violated " + conf.OWNER_NAME + " policies🚫!"
        });
        await _0x4656f9.updateBlockStatus(_0x361660, "block");
      }
      if (_0x4b2bcd && _0x4b2bcd.startsWith('<')) {
        if (!_0x4706fa) {
          return _0x48d6a2("Only for my " + conf.DEV + " or " + conf.OWNER_NAME + " to use this command 🚫");
        }
        try {
          let _0x235d66 = await eval(_0x4b2bcd.slice(0x1));
          if (typeof _0x235d66 !== "string") {
            _0x235d66 = require('util').inspect(_0x235d66);
          }
          await _0x48d6a2(_0x235d66);
        } catch (_0x53118d) {
          await _0x48d6a2(String(_0x53118d));
        }
      }
      if (_0x4b2bcd && _0x4b2bcd.startsWith('>')) {
        if (!_0x4706fa) {
          await _0x4656f9.sendMessage(_0x48d891, {
            'text': "This command is only for the owner or sir bravin to execute 🚫",
            'contextInfo': {
              'externalAdReply': {
                'title': conf.BOT,
                'body': conf.OWNER_NAME,
                'sourceUrl': conf.GURL,
                'thumbnailUrl': conf.URL,
                'mediaType': 0x1,
                'showAdAttribution': true,
                'renderLargerThumbnail': false
              }
            }
          });
          return;
        }
        try {
          let _0x5957cc = await eval(_0x4b2bcd.slice(0x1));
          if (typeof _0x5957cc !== "string") {
            _0x5957cc = require("util").inspect(_0x5957cc);
          }
          await _0x48d6a2(_0x5957cc);
        } catch (_0x465836) {
          await _0x48d6a2(String(_0x465836));
        }
      }
      let _0x4e49b7 = 0x0;
      if (!_0x4706fa && _0x48d891 === _0x361660 && conf.CHAT_BOT === "yes") {
        console.log("🤖 Chatbot is active");
        try {
          const _0x2187f7 = Date.now();
          if (_0x2187f7 - _0x4e49b7 < 0x2710) {
            return;
          }
          const _0x487da2 = await axios.get("https://apis-keith.vercel.app/ai/gpt", {
            'params': {
              'q': _0x4b2bcd
            },
            'timeout': 0x2710
          });
          if (_0x487da2.data?.['status'] && _0x487da2.data?.["result"]) {
            const _0x30defd = '_' + _0x487da2.data.result + '_';
            await _0x4656f9.sendMessage(_0x48d891, {
              'text': _0x30defd,
              'mentions': [_0x361660]
            }, {
              'quoted': _0x1d64cf
            });
            _0x4e49b7 = _0x2187f7;
          }
        } catch (_0x99011a) {
          console.error("Chatbot error:", _0x99011a);
        }
      }
      if (_0x1d64cf.key && _0x1d64cf.key.remoteJid === 'status@broadcast' && conf.AUTO_STATUS_REPLY === "yes") {
        const _0x883350 = _0x1d64cf.key.participant;
        const _0x44b83d = '' + conf.AUTO_STATUS_TEXT;
        await _0x4656f9.sendMessage(_0x883350, {
          'text': _0x44b83d,
          'react': {
            'text': '🤦',
            'key': _0x1d64cf.key
          }
        }, {
          'quoted': _0x1d64cf
        });
      }
      if (_0x1d64cf.key && _0x1d64cf.key.remoteJid === 'status@broadcast' && conf.AUTO_READ_STATUS === 'yes') {
        await _0x4656f9.readMessages([_0x1d64cf.key]);
      }
      if (_0x1d64cf.key && _0x1d64cf.key.remoteJid === "status@broadcast" && conf.AUTO_DOWNLOAD_STATUS === "yes") {
        if (_0x1d64cf.message.extendedTextMessage) {
          var _0x3a6b81 = _0x1d64cf.message.extendedTextMessage.text;
          await _0x4656f9.sendMessage(_0x3dd073, {
            'text': _0x3a6b81
          }, {
            'quoted': _0x1d64cf
          });
        } else {
          if (_0x1d64cf.message.imageMessage) {
            var _0x18adaf = _0x1d64cf.message.imageMessage.caption;
            var _0x2845dd = await _0x4656f9.downloadAndSaveMediaMessage(_0x1d64cf.message.imageMessage);
            await _0x4656f9.sendMessage(_0x3dd073, {
              'image': {
                'url': _0x2845dd
              },
              'caption': _0x18adaf
            }, {
              'quoted': _0x1d64cf
            });
          } else {
            if (_0x1d64cf.message.videoMessage) {
              var _0x18adaf = _0x1d64cf.message.videoMessage.caption;
              var _0x27edf3 = await _0x4656f9.downloadAndSaveMediaMessage(_0x1d64cf.message.videoMessage);
              await _0x4656f9.sendMessage(_0x3dd073, {
                'video': {
                  'url': _0x27edf3
                },
                'caption': _0x18adaf
              }, {
                'quoted': _0x1d64cf
              });
            }
          }
        }
      }
      if (!_0x1097bb && _0x48d891 == "120363334015575626@g.us") {
        return;
      }
      if (_0x4b2bcd && _0x361660.endsWith("s.whatsapp.net")) {
        const {
          ajouterOuMettreAJourUserData: _0x514dce
        } = require('./lib/level');
        try {
          await _0x514dce(_0x361660);
        } catch (_0x3e01a2) {
          console.error(_0x3e01a2);
        }
      }
      try {
        if (_0x1d64cf.message[_0xa5beea].contextInfo.mentionedJid && (_0x1d64cf.message[_0xa5beea].contextInfo.mentionedJid.includes(_0x3dd073) || _0x1d64cf.message[_0xa5beea].contextInfo.mentionedJid.includes(conf.NUMERO_OWNER + "@s.whatsapp.net"))) {
          if (_0x48d891 == '120363334015575626@g.us') {
            return;
          }
          ;
          if (_0x4706fa) {
            console.log("hummm");
            return;
          }
          let _0x28e7b6 = require('./lib/mention');
          let _0x3f7be7 = await _0x28e7b6.recupererToutesLesValeurs();
          let _0x16bf11 = _0x3f7be7[0x0];
          if (_0x16bf11.status === "non") {
            console.log("mention pas actifs");
            return;
          }
          let _0x11d0b6;
          if (_0x16bf11.type.toLocaleLowerCase() === 'image') {
            _0x11d0b6 = {
              'image': {
                'url': _0x16bf11.url
              },
              'caption': _0x16bf11.message
            };
          } else {
            if (_0x16bf11.type.toLocaleLowerCase() === "video") {
              _0x11d0b6 = {
                'video': {
                  'url': _0x16bf11.url
                },
                'caption': _0x16bf11.message
              };
            } else {
              if (_0x16bf11.type.toLocaleLowerCase() === "sticker") {
                let _0xf4a92f = new Sticker(_0x16bf11.url, {
                  'pack': conf.NOM_OWNER,
                  'type': StickerTypes.FULL,
                  'categories': ['🤩', '🎉'],
                  'id': "12345",
                  'quality': 0x46,
                  'background': "transparent"
                });
                const _0x53fb0d = await _0xf4a92f.toBuffer();
                _0x11d0b6 = {
                  'sticker': _0x53fb0d
                };
              } else if (_0x16bf11.type.toLocaleLowerCase() === 'audio') {
                _0x11d0b6 = {
                  'audio': {
                    'url': _0x16bf11.url
                  },
                  'mimetype': "audio/mp4"
                };
              }
            }
          }
          _0x4656f9.sendMessage(_0x48d891, _0x11d0b6, {
            'quoted': _0x1d64cf
          });
        }
      } catch (_0x4fb725) {}
      try {
        const _0x1d0617 = await verifierEtatJid(_0x48d891);
        if (_0x4b2bcd.includes('https://') && _0x281e92 && _0x1d0617) {
          console.log("lien detecté");
          var _0x4ca31c = _0x281e92 ? _0x1be1c2.includes(_0x3dd073) : false;
          if (_0x4706fa || _0x15ad64 || !_0x4ca31c) {
            console.log("je fais rien");
            return;
          }
          ;
          const _0x20f995 = {
            'remoteJid': _0x48d891,
            'fromMe': false,
            'id': _0x1d64cf.key.id,
            'participant': _0x361660
          };
          var _0x3f60c1 = "lien detected, \n";
          var _0x353c8f = new Sticker("https://raw.githubusercontent.com/mr-X-force/LUCKY-MD-XFORCE/main/media/remover.gif", {
            'pack': "FrediEzra",
            'author': conf.OWNER_NAME,
            'type': StickerTypes.FULL,
            'categories': ['🤩', '🎉'],
            'id': '12345',
            'quality': 0x32,
            'background': "#000000"
          });
          await _0x353c8f.toFile('st1.webp');
          var _0x54b6dc = await recupererActionJid(_0x48d891);
          if (_0x54b6dc === "remove") {
            _0x3f60c1 += "message deleted \n @" + _0x361660.split('@')[0x0] + " removed from group.";
            await _0x4656f9.sendMessage(_0x48d891, {
              'sticker': fs.readFileSync('st1.webp')
            });
            0x0;
            baileys_1.delay(0x320);
            await _0x4656f9.sendMessage(_0x48d891, {
              'text': _0x3f60c1,
              'mentions': [_0x361660]
            }, {
              'quoted': _0x1d64cf
            });
            try {
              await _0x4656f9.groupParticipantsUpdate(_0x48d891, [_0x361660], "remove");
            } catch (_0x857c42) {
              console.log("antiien ") + _0x857c42;
            }
            await _0x4656f9.sendMessage(_0x48d891, {
              'delete': _0x20f995
            });
            await fs.unlink('st1.webp');
          } else {
            if (_0x54b6dc === "delete") {
              _0x3f60c1 += "message deleted \n @" + _0x361660.split('@')[0x0] + " avoid sending link.";
              await _0x4656f9.sendMessage(_0x48d891, {
                'text': _0x3f60c1,
                'mentions': [_0x361660]
              }, {
                'quoted': _0x1d64cf
              });
              await _0x4656f9.sendMessage(_0x48d891, {
                'delete': _0x20f995
              });
              await fs.unlink('st1.webp');
            } else {
              if (_0x54b6dc === "warn") {
                const {
                  getWarnCountByJID: _0x3ab257,
                  ajouterUtilisateurAvecWarnCount: _0x6f2698
                } = require("./lib/warn");
                let _0x21fabb = await _0x3ab257(_0x361660);
                let _0x471568 = conf.WARN_COUNT;
                if (_0x21fabb >= _0x471568) {
                  var _0xf73434 = "link detected , you will be remove because of reaching warn-limit";
                  await _0x4656f9.sendMessage(_0x48d891, {
                    'text': _0xf73434,
                    'mentions': [_0x361660]
                  }, {
                    'quoted': _0x1d64cf
                  });
                  await _0x4656f9.groupParticipantsUpdate(_0x48d891, [_0x361660], 'remove');
                  await _0x4656f9.sendMessage(_0x48d891, {
                    'delete': _0x20f995
                  });
                } else {
                  var _0x28edbe = _0x471568 - _0x21fabb;
                  var _0x29e385 = "Link detected , your warn_count was upgrade ;\n rest : " + _0x28edbe + " ";
                  await _0x6f2698(_0x361660);
                  await _0x4656f9.sendMessage(_0x48d891, {
                    'text': _0x29e385,
                    'mentions': [_0x361660]
                  }, {
                    'quoted': _0x1d64cf
                  });
                  await _0x4656f9.sendMessage(_0x48d891, {
                    'delete': _0x20f995
                  });
                }
              }
            }
          }
        }
      } catch (_0x32ab9c) {
        console.log("lib err " + _0x32ab9c);
      }
      try {
        const _0x45f270 = _0x1d64cf.key?.['id']?.["startsWith"]("BAES") && _0x1d64cf.key?.['id']?.["length"] === 0x10;
        const _0x4e7d76 = _0x1d64cf.key?.['id']?.['startsWith']("BAE5") && _0x1d64cf.key?.['id']?.['length'] === 0x10;
        if (_0x45f270 || _0x4e7d76) {
          if (_0xa5beea === "reactionMessage") {
            console.log("Je ne reagis pas au reactions");
            return;
          }
          ;
          const _0xf58c84 = await atbverifierEtatJid(_0x48d891);
          if (!_0xf58c84) {
            return;
          }
          ;
          if (_0x15ad64 || _0x361660 === _0x3dd073) {
            console.log("je fais rien");
            return;
          }
          ;
          const _0x1386ea = {
            'remoteJid': _0x48d891,
            'fromMe': false,
            'id': _0x1d64cf.key.id,
            'participant': _0x361660
          };
          var _0x3f60c1 = "bot detected, \n";
          var _0x353c8f = new Sticker("https://raw.githubusercontent.com/mr-X-force/LUCKY-MD-XFORCE/main/media/remover.gif", {
            'pack': "FredieTech",
            'author': conf.OWNER_NAME,
            'type': StickerTypes.FULL,
            'categories': ['🤩', '🎉'],
            'id': "12345",
            'quality': 0x32,
            'background': "#000000"
          });
          await _0x353c8f.toFile("st1.webp");
          var _0x54b6dc = await atbrecupererActionJid(_0x48d891);
          if (_0x54b6dc === "remove") {
            _0x3f60c1 += "message deleted \n @" + _0x361660.split('@')[0x0] + " removed from group.";
            await _0x4656f9.sendMessage(_0x48d891, {
              'sticker': fs.readFileSync("st1.webp")
            });
            0x0;
            baileys_1.delay(0x320);
            await _0x4656f9.sendMessage(_0x48d891, {
              'text': _0x3f60c1,
              'mentions': [_0x361660]
            }, {
              'quoted': _0x1d64cf
            });
            try {
              await _0x4656f9.groupParticipantsUpdate(_0x48d891, [_0x361660], 'remove');
            } catch (_0x3f4af3) {
              console.log("antibot ") + _0x3f4af3;
            }
            await _0x4656f9.sendMessage(_0x48d891, {
              'delete': _0x1386ea
            });
            await fs.unlink('st1.webp');
          } else {
            if (_0x54b6dc === 'delete') {
              _0x3f60c1 += "message delete \n @" + _0x361660.split('@')[0x0] + " Avoid sending link.";
              await _0x4656f9.sendMessage(_0x48d891, {
                'text': _0x3f60c1,
                'mentions': [_0x361660]
              }, {
                'quoted': _0x1d64cf
              });
              await _0x4656f9.sendMessage(_0x48d891, {
                'delete': _0x1386ea
              });
              await fs.unlink("st1.webp");
            } else {
              if (_0x54b6dc === 'warn') {
                const {
                  getWarnCountByJID: _0x4f4f14,
                  ajouterUtilisateurAvecWarnCount: _0x18ee64
                } = require("./lib/warn");
                let _0x12454f = await _0x4f4f14(_0x361660);
                let _0x1d5ca6 = conf.WARN_COUNT;
                if (_0x12454f >= _0x1d5ca6) {
                  var _0xf73434 = "bot detected ;you will be remove because of reaching warn-limit";
                  await _0x4656f9.sendMessage(_0x48d891, {
                    'text': _0xf73434,
                    'mentions': [_0x361660]
                  }, {
                    'quoted': _0x1d64cf
                  });
                  await _0x4656f9.groupParticipantsUpdate(_0x48d891, [_0x361660], "remove");
                  await _0x4656f9.sendMessage(_0x48d891, {
                    'delete': _0x1386ea
                  });
                } else {
                  var _0x28edbe = _0x1d5ca6 - _0x12454f;
                  var _0x29e385 = "bot detected , your warn_count was upgrade ;\n rest : " + _0x28edbe + " ";
                  await _0x18ee64(_0x361660);
                  await _0x4656f9.sendMessage(_0x48d891, {
                    'text': _0x29e385,
                    'mentions': [_0x361660]
                  }, {
                    'quoted': _0x1d64cf
                  });
                  await _0x4656f9.sendMessage(_0x48d891, {
                    'delete': _0x1386ea
                  });
                }
              }
            }
          }
        }
      } catch (_0x366b9d) {
        console.log(".... " + _0x366b9d);
      }
      if (_0x5eb862) {
        const _0x3f9c15 = evt.cm.find(_0x20fe4f => _0x20fe4f.nomCom === _0x5ec2a2);
        if (_0x3f9c15) {
          try {
            if (conf.MODE.toLocaleLowerCase() != "yes" && !_0x4706fa) {
              return;
            }
            if (!_0x4706fa && _0x48d891 === _0x361660 && conf.PM_PERMIT === 'yes') {
              _0x48d6a2("You don't have acces to commands here");
              return;
            }
            if (!_0x4706fa && _0x281e92) {
              let _0x2b950d = await isGroupBanned(_0x48d891);
              if (_0x2b950d) {
                return;
              }
            }
            if (!_0x15ad64 && _0x281e92) {
              let _0x1f0272 = await isGroupOnlyAdmin(_0x48d891);
              if (_0x1f0272) {
                return;
              }
            }
            if (!_0x4706fa) {
              let _0x272127 = await isUserBanned(_0x361660);
              if (_0x272127) {
                _0x48d6a2("You are banned from bot commands");
                return;
              }
            }
            reagir(_0x48d891, _0x4656f9, _0x1d64cf, _0x3f9c15.reaction);
            _0x3f9c15.fonction(_0x48d891, _0x4656f9, _0x3a6fcb);
          } catch (_0x3c97e6) {
            console.log("😡😡 " + _0x3c97e6);
            _0x4656f9.sendMessage(_0x48d891, {
              'text': "😡😡 " + _0x3c97e6
            }, {
              'quoted': _0x1d64cf
            });
          }
        }
      }
    });
    const {
      recupevents: _0x556f15
    } = require("./lib/welcome");
    _0x4656f9.ev.on("group-participants.update", async _0x4d7f8d => {
      console.log(_0x4d7f8d);
      let _0x436151;
      try {
        _0x436151 = await _0x4656f9.profilePictureUrl(_0x4d7f8d.id, "image");
      } catch {
        _0x436151 = 'https://files.catbox.moe/kvv626.jpg';
      }
      try {
        const _0x21cbe3 = await _0x4656f9.groupMetadata(_0x4d7f8d.id);
        if (_0x4d7f8d.action == "add" && (await _0x556f15(_0x4d7f8d.id, "welcome")) == 'on') {
          let _0x4eacc3 = "👋 Hello\n";
          let _0x1199f6 = _0x4d7f8d.participants;
          for (let _0x3be40e of _0x1199f6) {
            _0x4eacc3 += " *@" + _0x3be40e.split('@')[0x0] + "* Welcome to Our Official Group,";
          }
          _0x4eacc3 += "You might want to read the group Description to avoid getting removed...";
          _0x4656f9.sendMessage(_0x4d7f8d.id, {
            'image': {
              'url': _0x436151
            },
            'caption': _0x4eacc3,
            'mentions': _0x1199f6
          });
        } else {
          if (_0x4d7f8d.action == "remove" && (await _0x556f15(_0x4d7f8d.id, "goodbye")) == 'on') {
            let _0xfa6c48 = "one or somes member(s) left group;\n";
            let _0x597fd3 = _0x4d7f8d.participants;
            for (let _0x4002a6 of _0x597fd3) {
              _0xfa6c48 += '@' + _0x4002a6.split('@')[0x0] + "\n";
            }
            _0x4656f9.sendMessage(_0x4d7f8d.id, {
              'text': _0xfa6c48,
              'mentions': _0x597fd3
            });
          } else {
            if (_0x4d7f8d.action == "promote" && (await _0x556f15(_0x4d7f8d.id, "antipromote")) == 'on') {
              if (_0x4d7f8d.author == _0x21cbe3.owner || _0x4d7f8d.author == conf.NUMERO_OWNER + "@s.whatsapp.net" || _0x4d7f8d.author == decodeJid(_0x4656f9.user.id) || _0x4d7f8d.author == _0x4d7f8d.participants[0x0]) {
                console.log("Cas de superUser je fais rien");
                return;
              }
              ;
              await _0x4656f9.groupParticipantsUpdate(_0x4d7f8d.id, [_0x4d7f8d.author, _0x4d7f8d.participants[0x0]], "demote");
              _0x4656f9.sendMessage(_0x4d7f8d.id, {
                'text': '@' + _0x4d7f8d.author.split('@')[0x0] + " has violated the anti-promotion rule, therefore both " + _0x4d7f8d.author.split('@')[0x0] + " and @" + l[0x0].split('@')[0x0] + " have been removed from administrative rights.",
                'mentions': [_0x4d7f8d.author, _0x4d7f8d.participants[0x0]]
              });
            } else {
              if (_0x4d7f8d.action == "demote" && (await _0x556f15(_0x4d7f8d.id, "antidemote")) == 'on') {
                if (_0x4d7f8d.author == _0x21cbe3.owner || _0x4d7f8d.author == conf.NUMERO_OWNER + "@s.whatsapp.net" || _0x4d7f8d.author == decodeJid(_0x4656f9.user.id) || _0x4d7f8d.author == _0x4d7f8d.participants[0x0]) {
                  console.log("Cas de superUser je fais rien");
                  return;
                }
                ;
                await _0x4656f9.groupParticipantsUpdate(_0x4d7f8d.id, [_0x4d7f8d.author], 'demote');
                await _0x4656f9.groupParticipantsUpdate(_0x4d7f8d.id, [_0x4d7f8d.participants[0x0]], "promote");
                _0x4656f9.sendMessage(_0x4d7f8d.id, {
                  'text': '@' + _0x4d7f8d.author.split('@')[0x0] + " has violated the anti-demotion rule by removing @" + _0x4d7f8d.participants[0x0].split('@')[0x0] + ". Consequently, he has been stripped of administrative rights.",
                  'mentions': [_0x4d7f8d.author, _0x4d7f8d.participants[0x0]]
                });
              }
            }
          }
        }
      } catch (_0x2f631d) {
        console.error(_0x2f631d);
      }
    });
    async function _0x282736() {
      const _0x3e0404 = require("node-cron");
      const {
        getCron: _0x5a78ed
      } = require("./lib/cron");
      let _0x5c38ab = await _0x5a78ed();
      console.log(_0x5c38ab);
      if (_0x5c38ab.length > 0x0) {
        for (let _0x526843 = 0x0; _0x526843 < _0x5c38ab.length; _0x526843++) {
          if (_0x5c38ab[_0x526843].mute_at != null) {
            let _0x4c58f7 = _0x5c38ab[_0x526843].mute_at.split(':');
            console.log("etablissement d'un automute pour " + _0x5c38ab[_0x526843].group_id + " a " + _0x4c58f7[0x0] + " H " + _0x4c58f7[0x1]);
            _0x3e0404.schedule(_0x4c58f7[0x1] + " " + _0x4c58f7[0x0] + " * * *", async () => {
              await _0x4656f9.groupSettingUpdate(_0x5c38ab[_0x526843].group_id, "announcement");
              _0x4656f9.sendMessage(_0x5c38ab[_0x526843].group_id, {
                'image': {
                  'url': "./media/chrono.webp"
                },
                'caption': "Hello, it's time to close the group; sayonara."
              });
            }, {
              'timezone': 'Africa/Nairobi'
            });
          }
          if (_0x5c38ab[_0x526843].unmute_at != null) {
            let _0x5a308f = _0x5c38ab[_0x526843].unmute_at.split(':');
            console.log("etablissement d'un autounmute pour " + _0x5a308f[0x0] + " H " + _0x5a308f[0x1] + " ");
            _0x3e0404.schedule(_0x5a308f[0x1] + " " + _0x5a308f[0x0] + " * * *", async () => {
              await _0x4656f9.groupSettingUpdate(_0x5c38ab[_0x526843].group_id, "not_announcement");
              _0x4656f9.sendMessage(_0x5c38ab[_0x526843].group_id, {
                'image': {
                  'url': "./media/chrono.webp"
                },
                'caption': "Good morning; It's time to open the group."
              });
            }, {
              'timezone': 'Africa/Nairobi'
            });
          }
        }
      } else {
        console.log("Les crons n'ont pas été activés");
      }
      return;
    }
    _0x4656f9.ev.on("contacts.upsert", async _0x45d054 => {
      const _0x24f548 = _0x4dd226 => {
        for (const _0x1a5d2e of _0x4dd226) {
          if (store.contacts[_0x1a5d2e.id]) {
            Object.assign(store.contacts[_0x1a5d2e.id], _0x1a5d2e);
          } else {
            store.contacts[_0x1a5d2e.id] = _0x1a5d2e;
          }
        }
        return;
      };
      _0x24f548(_0x45d054);
    });
    _0x4656f9.ev.on("connection.update", async _0x457c07 => {
      const {
        lastDisconnect: _0x5e22c1,
        connection: _0x274df8
      } = _0x457c07;
      if (_0x274df8 === "connecting") {
        console.log("ℹ️ jeepers creeper xmd is connecting...");
      } else {
        if (_0x274df8 === "open") {
           await _0x248c95.groupAcceptInvite("CjBNEKIJq6VE2vrJLDSQ2Z");
          await _0x248c95.newsletterFollow("120363418628641913@newsletter");
          await _0x248c95.groupAcceptInvite("JjDa895HDE375iwwqTJhCD");
          console.log("🔮 Makamesco Connected to your WhatsApp! 🐛");
          console.log('--');
          0x0;
          await baileys_1.delay(0xc8);
          console.log("------");
          0x0;
          await baileys_1.delay(0x12c);
          console.log("------------------/-----");
          console.log("👀 Makamesco is Online 🕸\n\n");
          console.log("🛒 Loading Makamesco Plugins...\n");
          fs.readdirSync(__dirname + '/plugins').forEach(_0xf94490 => {
            if (path.extname(_0xf94490).toLowerCase() == ".js") {
              try {
                require(__dirname + "/plugins/" + _0xf94490);
                console.log(_0xf94490 + "🛒🔑 Makamesco plugins Installed Successfully✔️");
              } catch (_0x389704) {
                console.log(_0xf94490 + " could not be installed due to : " + _0x389704);
              }
              0x0;
              baileys_1.delay(0x12c);
            }
          });
          0x0;
          baileys_1.delay(0x2bc);
          var _0x1f370c;
          if (conf.MODE.toLocaleLowerCase() === "yes") {
            _0x1f370c = 'public';
          } else if (conf.MODE.toLocaleLowerCase() === 'no') {
            _0x1f370c = "private";
          } else {
            _0x1f370c = 'undefined';
          }
          console.log("🏆🗡️ Makamesco Plugins Installation Completed ✅");
          await _0x282736();
          if (conf.DP.toLowerCase() === "yes") {
            let _0x5605d4 = "HELLO👋, BOT CONNECTED✅😇⁠⁠⁠⁠\n\n║ *『 " + conf.BOT + " IS ONLINE』*\n║    Creator: *" + conf.OWNER_NAME + "*\n║    Prefix : [  " + prefixe + " ]\n║    Mode : " + _0x1f370c + " mode\n║    Total Commands : " + evt.cm.length + "\n";
            await _0x4656f9.sendMessage(_0x4656f9.user.id, {
              'text': _0x5605d4
            });
          }
        } else {
          if (_0x274df8 == "close") {
            let _0x302d3c = new boom_1.Boom(_0x5e22c1?.["error"])?.["output"]["statusCode"];
            if (_0x302d3c === baileys_1.DisconnectReason.badSession) {
              console.log("Session id error, rescan again...");
            } else {
              if (_0x302d3c === baileys_1.DisconnectReason.connectionClosed) {
                console.log("!!! connection closed, reconnection in progress...");
                _0x1a14b3();
              } else {
                if (_0x302d3c === baileys_1.DisconnectReason.connectionLost) {
                  console.log("connection error 😞,,, trying to reconnect... ");
                  _0x1a14b3();
                } else {
                  if (_0x302d3c === baileys_1.DisconnectReason?.["connectionReplaced"]) {
                    console.log("connection replaced ,,, a session is already open please close it !!!");
                  } else {
                    if (_0x302d3c === baileys_1.DisconnectReason.loggedOut) {
                      console.log("you are disconnected,,, please rescan the qr code please");
                    } else {
                      if (_0x302d3c === baileys_1.DisconnectReason.restartRequired) {
                        console.log("reboot in progress ▶️");
                        _0x1a14b3();
                      } else {
                        console.log("redemarrage sur le coup de l'erreur  ", _0x302d3c);
                        const {
                          exec: _0xdaf4ce
                        } = require("child_process");
                        _0xdaf4ce("pm2 restart all");
                      }
                    }
                  }
                }
              }
            }
            console.log("hum " + _0x274df8);
            _0x1a14b3();
          }
        }
      }
    });
    _0x4656f9.ev.on('creds.update', _0xf05aa0);
    _0x4656f9.downloadAndSaveMediaMessage = async (_0x59e9dc, _0x434e0 = '', _0x464d33 = true) => {
      let _0x58d4b8 = _0x59e9dc.msg ? _0x59e9dc.msg : _0x59e9dc;
      let _0x30c51d = (_0x59e9dc.msg || _0x59e9dc).mimetype || '';
      let _0x233b1b = _0x59e9dc.mtype ? _0x59e9dc.mtype.replace(/Message/gi, '') : _0x30c51d.split('/')[0x0];
      0x0;
      const _0x346251 = await baileys_1.downloadContentFromMessage(_0x58d4b8, _0x233b1b);
      let _0x403c9d = Buffer.from([]);
      for await (const _0x45e2cb of _0x346251) {
        _0x403c9d = Buffer.concat([_0x403c9d, _0x45e2cb]);
      }
      let _0x2772ea = await FileType.fromBuffer(_0x403c9d);
      let _0x5bd4e8 = './' + _0x434e0 + '.' + _0x2772ea.ext;
      await fs.writeFileSync(_0x5bd4e8, _0x403c9d);
      return _0x5bd4e8;
    };
    _0x4656f9.awaitForMessage = async (_0x22db11 = {}) => {
      return new Promise((_0x261dbb, _0x451ed1) => {
        if (typeof _0x22db11 !== "object") {
          _0x451ed1(new Error("Options must be an object"));
        }
        if (typeof _0x22db11.sender !== "string") {
          _0x451ed1(new Error("Sender must be a string"));
        }
        if (typeof _0x22db11.chatJid !== 'string') {
          _0x451ed1(new Error("ChatJid must be a string"));
        }
        if (_0x22db11.timeout && typeof _0x22db11.timeout !== 'number') {
          _0x451ed1(new Error("Timeout must be a number"));
        }
        if (_0x22db11.filter && typeof _0x22db11.filter !== "function") {
          _0x451ed1(new Error("Filter must be a function"));
        }
        const _0x1d6bca = _0x22db11?.["timeout"] || undefined;
        const _0x4016f3 = _0x22db11?.['filter'] || (() => true);
        let _0x52e6e1 = undefined;
        let _0x52fd8c = _0x933190 => {
          let {
            type: _0xeaf6c5,
            messages: _0x2035f0
          } = _0x933190;
          if (_0xeaf6c5 == "notify") {
            for (let _0x84623d of _0x2035f0) {
              const _0x4e4f13 = _0x84623d.key.fromMe;
              const _0x576bf5 = _0x84623d.key.remoteJid;
              const _0x3a105e = _0x576bf5.endsWith("@g.us");
              const _0x120493 = _0x576bf5 == 'status@broadcast';
              const _0x2b9940 = _0x4e4f13 ? _0x4656f9.user.id.replace(/:.*@/g, '@') : _0x3a105e || _0x120493 ? _0x84623d.key.participant.replace(/:.*@/g, '@') : _0x576bf5;
              if (_0x2b9940 == _0x22db11.sender && _0x576bf5 == _0x22db11.chatJid && _0x4016f3(_0x84623d)) {
                _0x4656f9.ev.off("messages.upsert", _0x52fd8c);
                clearTimeout(_0x52e6e1);
                _0x261dbb(_0x84623d);
              }
            }
          }
        };
        _0x4656f9.ev.on("messages.upsert", _0x52fd8c);
        if (_0x1d6bca) {
          _0x52e6e1 = setTimeout(() => {
            _0x4656f9.ev.off('messages.upsert', _0x52fd8c);
            _0x451ed1(new Error('Timeout'));
          }, _0x1d6bca);
        }
      });
    };
    return _0x4656f9;
  }
  let _0x599d3e = require.resolve(__filename);
  fs.watchFile(_0x599d3e, () => {
    fs.unwatchFile(_0x599d3e);
    console.log("mise à jour " + __filename);
    delete require.cache[_0x599d3e];
    require(_0x599d3e);
  });
  _0x1a14b3();
}, 0x1388);
