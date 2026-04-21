const express = require("express");
const app = express();
const PORT = process.env.PORT || 0x1f40;
app.get('/', (_0x162599, _0x289daf) => {
  _0x289daf.send("Makamesco xmd is alive ");
});
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
"use strict";
var __createBinding = this && this.__createBinding || (Object.create ? function (_0x31ea26, _0x5835d2, _0x31f276, _0x8beebd) {
  if (_0x8beebd === undefined) {
    _0x8beebd = _0x31f276;
  }
  var _0x43a35b = Object.getOwnPropertyDescriptor(_0x5835d2, _0x31f276);
  if (!_0x43a35b || ('get' in _0x43a35b ? !_0x5835d2.__esModule : _0x43a35b.writable || _0x43a35b.configurable)) {
    _0x43a35b = {
      'enumerable': true,
      'get': function () {
        return _0x5835d2[_0x31f276];
      }
    };
  }
  Object.defineProperty(_0x31ea26, _0x8beebd, _0x43a35b);
} : function (_0xc28959, _0x36ee34, _0x331291, _0xf20818) {
  if (_0xf20818 === undefined) {
    _0xf20818 = _0x331291;
  }
  _0xc28959[_0xf20818] = _0x36ee34[_0x331291];
});
var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (_0x5f2e33, _0x4ce58e) {
  Object.defineProperty(_0x5f2e33, "default", {
    'enumerable': true,
    'value': _0x4ce58e
  });
} : function (_0x5264dd, _0x288f45) {
  _0x5264dd["default"] = _0x288f45;
});
var __importStar = this && this.__importStar || function (_0x5e2343) {
  if (_0x5e2343 && _0x5e2343.__esModule) {
    return _0x5e2343;
  }
  var _0x13cc79 = {};
  if (_0x5e2343 != null) {
    for (var _0x3179fb in _0x5e2343) if (_0x3179fb !== 'default' && Object.prototype.hasOwnProperty.call(_0x5e2343, _0x3179fb)) {
      __createBinding(_0x13cc79, _0x5e2343, _0x3179fb);
    }
  }
  __setModuleDefault(_0x13cc79, _0x5e2343);
  return _0x13cc79;
};
var __importDefault = this && this.__importDefault || function (_0x448f1b) {
  return _0x448f1b && _0x448f1b.__esModule ? _0x448f1b : {
    'default': _0x448f1b
  };
};
Object.defineProperty(exports, '__esModule', {
  'value': true
});
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
} = require("./fredi/context");
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
} = require('./lib/onlyAdmin');
let {
  reagir
} = require(__dirname + '/fredi/app');
var session = conf.session.replace(/MAKAMESCO-MD<=>/g, '');
const prefixe = conf.PREFIXE;
async function authentification() {
  try {
    if (!fs.existsSync(__dirname + '/scan/creds.json')) {
      console.log("connexion en cour ...");
      await fs.writeFileSync(__dirname + "/scan/creds.json", atob(session), "utf8");
    } else if (fs.existsSync(__dirname + "/scan/creds.json") && session != "zokk") {
      await fs.writeFileSync(__dirname + "/scan/creds.json", atob(session), 'utf8');
    }
  } catch (_0x4f35ce) {
    console.log("Session Invalid " + _0x4f35ce);
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
  async function _0x37a412() {
    0x0;
    const {
      version: _0x1f26c1,
      isLatest: _0xf75f44
    } = await baileys_1.fetchLatestBaileysVersion();
    0x0;
    const {
      state: _0x2e9d75,
      saveCreds: _0x250519
    } = await baileys_1.useMultiFileAuthState(__dirname + "/scan");
    0x0;
    const _0x3c4241 = {
      'version': _0x1f26c1,
      'logger': pino({
        'level': "silent"
      }),
      'browser': ["Makamesco -xmd", "safari", "1.0.0"],
      'printQRInTerminal': true,
      'fireInitQueries': false,
      'shouldSyncHistoryMessage': true,
      'downloadHistory': true,
      'syncFullHistory': true,
      'generateHighQualityLinkPreview': true,
      'markOnlineOnConnect': false,
      'keepAliveIntervalMs': 0x7530,
      'auth': {
        'creds': _0x2e9d75.creds,
        'keys': baileys_1.makeCacheableSignalKeyStore(_0x2e9d75.keys, logger)
      },
      'getMessage': async _0x4557e1 => {
        if (store) {
          const _0x5d13a8 = await store.loadMessage(_0x4557e1.remoteJid, _0x4557e1.id, undefined);
          return _0x5d13a8.message || undefined;
        }
        return {
          'conversation': "An Error Occurred, Repeat Command!"
        };
      }
    };
    0x0;
    const _0x248c95 = baileys_1["default"](_0x3c4241);
    store.bind(_0x248c95.ev);
    function _0x31f106() {
      const _0x2dfb9d = new Date();
      const _0x59e84f = {
        'timeZone': "Africa/Nairobi",
        'weekday': 'long',
        'year': "numeric",
        'month': "long",
        'day': "2-digit",
        'hour': "2-digit",
        'minute': "2-digit",
        'second': "2-digit",
        'hour12': false
      };
      return new Intl.DateTimeFormat('en-KE', _0x59e84f).format(_0x2dfb9d);
    }
    const _0x1c5e6d = ["🛠️ Learning never ends — debug life!", "🔥 Bot powered by Makamesco & dreams 😎", "🎯 Skills don't sleep... neither do bots 🤖", "💡 *Ladys 💃 if your 🤔 Body 🧑‍🦳 is the Temple 🕌 of Gød 🙏 , who are 🫵 u to stop 🤚 the sons 🧑‍🦱 of God 🙏 from ntering 🚶 their Father 🕌🤣🤣🤣🤣*!", "📅 Stay productive — even in downtime!", "😂 If bots had feelings... mine would be busy.", "🚀 Running like a boss at 1000 scripts/sec.", "🌍 Global bot vibes from KE 🇰🇪", "📚 Guide, Help, Fun, Repeat.", "🤹 Life is a mix of memes & miracles.", "👀 Watching you like console logs 👨‍💻", "📌 Daily desk goals: Build, Break, Fix, Repeat.", "🎭 This bot has more personalities than your ex.", "👑 Bot: jeepers-creeper xmd | AI: sir bravin AI", "✨ Today is yours. Make it *legendary*.", "📊 Performance: 100% Efficiency (maybe 💀)", "⚙️ Built with ❤️ by sir bravine", "🎮 Skills unlocked: AI | Code | Meme | Hustle"];
    let _0x16d999 = 0x0;
    setInterval(async () => {
      if (conf.AUTO_BIO === "yes") {
        const _0x1eff43 = _0x31f106();
        const _0x5b20a7 = _0x1c5e6d[_0x16d999];
        const _0x4cbea6 = "🤖  Keep shining\n📅 " + _0x1eff43 + "\n" + _0x5b20a7;
        await _0x248c95.updateProfileStatus(_0x4cbea6);
        console.log("✅ Updated Bio:\n" + _0x4cbea6);
        _0x16d999 = (_0x16d999 + 0x1) % _0x1c5e6d.length;
      }
    }, 0xea60);
    _0x248c95.ev.on("call", async _0x11c0f8 => {
      if (conf.ANTI_CALL === 'yes') {
        const _0x2636d6 = _0x11c0f8[0x0].id;
        const _0x1c6f02 = _0x11c0f8[0x0].from;
        await _0x248c95.rejectCall(_0x2636d6, _0x1c6f02);
        if (!global.callResponses) {
          global.callResponses = {};
        }
        if (!global.callResponses[_0x1c6f02]) {
          global.callResponses[_0x1c6f02] = {
            'count': 0x0
          };
        }
        const _0x550b1a = global.callResponses[_0x1c6f02];
        _0x550b1a.count++;
        const _0x453bb0 = {
          0x1: ["📞 Hello 👋! I'm " + conf.BOT + ". Please the number you are calling is currently busy please hold or call back later " + conf.OWNER_NAME + " prefers messages. Thank you!\n\nPowered by sir bravin " + conf.DEV, "🚫 Please don't call. " + conf.BOT + " is a bot, not a voice assistant.\n\nPowered by sir bravin " + conf.DEV, "Hi! 🙏 Kindly don’t call. My creator " + conf.OWNER_NAME + " has disabled calling. Just message me.\n\n~ " + conf.BOT],
          0x2: ["⚠️ You've called again. Calls are not allowed. Please text.\n\nPowered by " + conf.DEV, "Reminder: No calls allowed 🚫. Kindly send your message instead.", "You're trying again? 😅 This bot does not accept calls. Just type your message."],
          0x3: ["📵 Third time calling! Respect the rules and drop a message please.", "Hey friend, this is the 3rd call. Please avoid that 🙏.", "Still calling? 😔 Please understand, texting is preferred."]
        };
        const _0x3c8194 = _0x550b1a.count >= 0x3 ? 0x3 : _0x550b1a.count;
        const _0x82308e = _0x453bb0[_0x3c8194];
        const _0x3f1d57 = _0x82308e[Math.floor(Math.random() * _0x82308e.length)];
        try {
          await _0x248c95.sendMessage(_0x1c6f02, {
            'text': _0x3f1d57
          });
        } catch (_0x39831a) {
          console.error("Error sending anti-call message:", _0x39831a);
        }
      }
    });
    let _0x41c100 = "Hello👋, I'm " + conf.BOT + " on board. My owner " + conf.OWNER_NAME + " currently unavailable👁️. Please leave a message, and we will get back to you as soon as possible🤝. Thanks To " + conf.DEV;
    let _0x3e5173 = new Set();
    _0x248c95.ev.on("messages.upsert", async _0x21acc5 => {
      const {
        messages: _0x35decd
      } = _0x21acc5;
      const _0x38d71b = _0x35decd[0x0];
      if (!_0x38d71b.message) {
        return;
      }
      const _0x83d4ba = _0x38d71b.message.conversation || _0x38d71b.message.extendedTextMessage?.['text'];
      const _0x87fc64 = _0x38d71b.key.remoteJid;
      if (_0x83d4ba && _0x83d4ba.match(/^[^\w\s]/) && _0x38d71b.key.fromMe) {
        const _0x1d4cf2 = _0x83d4ba[0x0];
        const _0x359c0c = _0x83d4ba.slice(0x1).split(" ")[0x0];
        const _0x494d54 = _0x83d4ba.slice(_0x1d4cf2.length + _0x359c0c.length).trim();
        if (_0x359c0c === "setautoreply" && _0x494d54) {
          _0x41c100 = _0x494d54;
          await _0x248c95.sendMessage(_0x87fc64, {
            'text': "Auto-reply message has been updated to:\n\"" + _0x41c100 + "\""
          });
          return;
        }
      }
      if (conf.AUTO_REPLY === "yes" && !_0x3e5173.has(_0x87fc64) && !_0x38d71b.key.fromMe && !_0x87fc64.includes("@g.us")) {
        await _0x248c95.sendMessage(_0x87fc64, {
          'text': _0x41c100
        });
        _0x3e5173.add(_0x87fc64);
      }
    });
    if (conf.LUCKY_ADM === 'yes') {
      console.log("👿 Makamesco xmd AntiDelete is ACTIVE!");
    }
    _0x248c95.ev.on("messages.upsert", async _0x73c8b4 => {
      if (conf.LUCKY_ADM !== "yes") {
        return;
      }
      const {
        messages: _0x558459
      } = _0x73c8b4;
      const _0x201e8c = _0x558459[0x0];
      if (!_0x201e8c.message) {
        return;
      }
      const _0x493304 = _0x201e8c.key;
      const _0x58e9f3 = _0x493304.remoteJid;
      if (_0x58e9f3 === 'status@broadcast') {
        return;
      }
      if (!store.chats[_0x58e9f3]) {
        store.chats[_0x58e9f3] = [];
      }
      store.chats[_0x58e9f3].push(_0x201e8c);
      if (store.chats[_0x58e9f3].length > 0x19) {
        store.chats[_0x58e9f3].shift();
      }
      if (_0x201e8c.message?.['protocolMessage']?.['type'] === 0x0) {
        const _0x28a28e = _0x201e8c.message.protocolMessage.key;
        const _0x38f739 = store.chats[_0x58e9f3];
        const _0x2e8cda = _0x38f739.find(_0x819bb6 => _0x819bb6.key.id === _0x28a28e.id);
        if (!_0x2e8cda) {
          return;
        }
        try {
          const _0xd4fb9c = _0x201e8c.key.participant || _0x201e8c.key.remoteJid;
          const _0x363379 = _0x2e8cda.key.participant || _0x2e8cda.key.remoteJid;
          const _0x5c5fe2 = _0x58e9f3.endsWith("@g.us");
          let _0x38cced = '';
          if (_0x5c5fe2) {
            try {
              const _0x2ad53c = await _0x248c95.groupMetadata(_0x58e9f3);
              _0x38cced = "\n• Group: " + _0x2ad53c.subject;
            } catch (_0x19efec) {
              console.error("Error fetching group metadata:", _0x19efec);
              _0x38cced = "\n• Group information unavailable.";
            }
          }
          const _0x19cbde = "👿 *Makamesco antiDelete* 👿\n" + ("• Deleted by: @" + _0xd4fb9c.split('@')[0x0] + "\n") + ("• Original sender: @" + _0x363379.split('@')[0x0] + "\n") + (_0x38cced + "\n") + ("• Chat type: " + (_0x5c5fe2 ? "Group" : "Private"));
          const _0x1febd5 = {
            'mentions': [_0xd4fb9c, _0x363379]
          };
          if (_0x2e8cda.message.conversation) {
            await sendMessage(_0x248c95, _0x58e9f3, _0x201e8c, {
              'text': _0x19cbde + "\n\n📝 *Deleted Text:*\n" + _0x2e8cda.message.conversation,
              ..._0x1febd5
            });
          } else {
            if (_0x2e8cda.message.extendedTextMessage) {
              await sendMessage(_0x248c95, _0x58e9f3, _0x201e8c, {
                'text': _0x19cbde + "\n\n📝 *Deleted Text:*\n" + _0x2e8cda.message.extendedTextMessage.text,
                ..._0x1febd5
              });
            } else {
              if (_0x2e8cda.message.imageMessage) {
                const _0x1622d7 = _0x2e8cda.message.imageMessage.caption || '';
                const _0x2452c1 = await _0x248c95.downloadAndSaveMediaMessage(_0x2e8cda.message.imageMessage);
                await sendMessage(_0x248c95, _0x58e9f3, _0x201e8c, {
                  'image': {
                    'url': _0x2452c1
                  },
                  'caption': _0x19cbde + "\n\n🖼️ *Image Caption:*\n" + _0x1622d7,
                  ..._0x1febd5
                });
              } else {
                if (_0x2e8cda.message.videoMessage) {
                  const _0x494776 = _0x2e8cda.message.videoMessage.caption || '';
                  const _0x4ef013 = await _0x248c95.downloadAndSaveMediaMessage(_0x2e8cda.message.videoMessage);
                  await sendMessage(_0x248c95, _0x58e9f3, _0x201e8c, {
                    'video': {
                      'url': _0x4ef013
                    },
                    'caption': _0x19cbde + "\n\n🎥 *Video Caption:*\n" + _0x494776,
                    ..._0x1febd5
                  });
                } else {
                  if (_0x2e8cda.message.audioMessage) {
                    const _0x25b679 = await _0x248c95.downloadAndSaveMediaMessage(_0x2e8cda.message.audioMessage);
                    await sendMessage(_0x248c95, _0x58e9f3, _0x201e8c, {
                      'audio': {
                        'url': _0x25b679
                      },
                      'mimetype': "audio/ogg",
                      'ptt': true,
                      'caption': _0x19cbde + "\n\n🎤 *Voice Message Deleted*",
                      ..._0x1febd5
                    });
                  } else {
                    if (_0x2e8cda.message.stickerMessage) {
                      const _0x27509f = await _0x248c95.downloadAndSaveMediaMessage(_0x2e8cda.message.stickerMessage);
                      await sendMessage(_0x248c95, _0x58e9f3, _0x201e8c, {
                        'sticker': {
                          'url': _0x27509f
                        },
                        'caption': _0x19cbde,
                        ..._0x1febd5
                      });
                    } else {
                      await sendMessage(_0x248c95, _0x58e9f3, _0x201e8c, {
                        'text': _0x19cbde + "\n\n⚠️ *An unsupported message type was deleted.*",
                        ..._0x1febd5
                      });
                    }
                  }
                }
              }
            }
          }
        } catch (_0x1a8820) {
          console.error("🔥 AntiDelete Error:", _0x1a8820);
        }
      }
    });
    const _0x32995e = _0x5f349a => new Promise(_0x32f298 => setTimeout(_0x32f298, _0x5f349a));
    let _0x2f974d = 0x0;
    const _0x330a81 = {
      'hello': ['👋', '🙂', '😊', "🙋‍♂️", "🙋‍♀️"],
      'hi': ['👋', '🙂', '😁', "🙋‍♂️", "🙋‍♀️"],
      "good morning": ['🌅', '🌞', '☀️', '🌻', '🌼'],
      "good night": ['🌙', '🌜', '⭐', '🌛', '💫'],
      'bye': ['👋', '😢', "👋🏻", '🥲', "🚶‍♂️", "🚶‍♀️"],
      "see you": ['👋', '😊', '👋🏻', '✌️', "🚶‍♂️"],
      'bro': ["🤜🤛", '👊', '💥', '🥊', '👑'],
      'sister': ['👭', "💁‍♀️", '🌸', '💖', "🙋‍♀️"],
      'buddy': ['🤗', '👯‍♂️', "👯‍♀️", "🤜🤛", '🤝'],
      'niaje': ['👋', '😄', '💥', '🔥', '🕺', '💃'],
      'fredi': ['😎', '💯', '🔥', '🚀', '👑'],
      'ezra': ['🔥', '💥', '👑', '💯', '😎'],
      'thanks': ['🙏', '😊', '💖', '❤️', '💐'],
      "thank you": ['🙏', '😊', '🙌', '💖', '💝'],
      'love': ['❤️', '💖', '💘', '😍', '😘', '💍', '💑'],
      "miss you": ['😢', '💔', '😔', '😭', '💖'],
      'sorry': ['😔', '🙏', '😓', '💔', '🥺'],
      'apologies': ['😔', '💔', '🙏', '😞', "🙇‍♂️", "🙇‍♀️"],
      'congratulations': ['🎉', '🎊', '🏆', '🎁', '👏'],
      "well done": ['👏', '💪', '🎉', "🎖️", '👍'],
      "good job": ['👏', '💯', '👍', '🌟', '🎉'],
      'happy': ['😁', '😊', '🎉', '🎊', '💃', '🕺'],
      'sad': ['😢', '😭', '😞', '💔', '😓'],
      'angry': ['😡', '🤬', '😤', '💢', '😾'],
      'excited': ['🤩', '🎉', '😆', '🤗', '🥳'],
      'surprised': ['😲', '😳', '😯', '😮', '😲'],
      'help': ['🆘', '❓', '🙏', '💡', "👨‍💻", "👩‍💻"],
      'how': ['❓', '🤔', '😕', '😳', '🧐'],
      'what': ['❓', "🤷‍♂️", "🤷‍♀️", '😕', '😲'],
      'where': ['❓', '🌍', "🗺️", '🏙️', '🌎'],
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
      'help': ['🆘', '❓', '🤔', "🙋‍♂️", "🙋‍♀️", '💡'],
      "need assistance": ['🆘', "💁‍♂️", "💁‍♀️", '❓', '🙏'],
      'sorry': ['😔', '🙏', '💔', '😓', '🥺', "🙇‍♂️", "🙇‍♀️"],
      'apology': ['😔', '😞', '🙏', '💔', '🙇‍♂️', "🙇‍♀️"],
      "good job": ['👏', '💯', '🎉', '🌟', '👍', '👏'],
      "well done": ['👏', '🎉', "🎖️", '💪', '🔥', '🏆'],
      "you can do it": ['💪', '🔥', '💯', '🚀', '🌟'],
      'congratulations': ['🎉', '🏆', '🎊', '🎁', '👏', '🍾'],
      'cheers': ['🥂', '🍻', '🍾', '🍷', '🥳', '🎉'],
      'goodbye': ['👋', '😢', '💔', "👋🏻", '🚶‍♂️', "🚶‍♀️"],
      'bye': ['👋', "👋🏻", '🥲', "🚶‍♂️", "🚶‍♀️"],
      "see you": ['👋', "👋🏻", '🤗', '✌️', "🙋‍♂️", "🙋‍♀️"],
      'hello': ['👋', '🙂', '😊', "🙋‍♂️", "🙋‍♀️"],
      'hi': ['👋', '🙂', '😁', '🙋‍♂️', "🙋‍♀️"],
      'party': ['🎉', '🥳', '🎤', '💃', '🕺', '🍻', '🎶'],
      'fun': ['🎮', '🎲', '🤣', '🎉', '🃏'],
      'play': ['🎮', '🏀', '⚽', '🎾', '🎱', '🎲', '🏆'],
      'work': ['💻', "🖥️", '💼', '📅', '📝'],
      'school': ['📚', '🏫', '🎒', "👨‍🏫", "👩‍🏫"],
      'study': ['📖', '📝', '💡', '📚', '🎓'],
      'summer': ['🌞', '🏖️', '🌴', '🍉', '🌻'],
      'winter': ['❄️', '☃️', '🎿', '🔥', '⛄'],
      'autumn': ['🍁', '🍂', '🎃', '🍂', '🍁'],
      'spring': ['🌸', '🌼', '🌷', '🌱', '🌺'],
      'birthday': ['🎂', '🎉', '🎁', '🎈', '🎊'],
      'anniversary': ['💍', '🎉', '🎁', '🎈', '💑'],
      'robot': ['🤖', '⚙️', '🔧', '🤖', '🧠'],
      'bot': ['🤖', '🧠', '⚙️', '💻', "🖥️"],
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
      'family': ["👨‍👩‍👧‍👦", "👩‍👧", "👩‍👧‍👦", '👨‍👩‍👧', '💏', "👨‍👨‍👧‍👦", '👩‍👩‍👧‍👦'],
      'friends': ["👯‍♂️", '👯‍♀️', '🤗', '🫶', '💫', '🤝'],
      'relationship': ['💑', '❤️', '💍', '🥰', '💏', '💌'],
      'couple': ['👩‍❤️‍👨', "👨‍❤️‍👨", "👩‍❤️‍👩", '💍', '💑', '💏'],
      "best friend": ['🤗', '💖', "👯‍♀️", "👯‍♂️", '🙌'],
      "love you": ['❤️', '😘', '💖', '💘', '💓', '💗'],
      'vacation': ["🏖️", '🌴', '✈️', '🌊', "🛳️", "🏞️", "🏕️"],
      'beach': ['🏖️', '🌊', "🏄‍♀️", '🩴', "🏖️", '🌴', '🦀'],
      "road trip": ['🚗', '🚙', '🛣️', '🌄', '🌟'],
      'mountain': ['🏞️', '⛰️', "🏔️", '🌄', '🏕️', '🌲'],
      'city': ["🏙️", '🌆', '🗽', '🌇', '🚖', '🏙️'],
      'exploration': ['🌍', '🧭', '🌎', '🌍', '🧳', '📍', '⛵'],
      'morning': ['🌅', '☀️', '🌞', '🌄', '🌻', "🕶️"],
      'afternoon': ['🌞', "🌤️", '⛅', '🌻', '🌇'],
      'night': ['🌙', '🌛', '🌜', '⭐', '🌚', '💫'],
      'evening': ['🌙', '🌛', '🌇', '🌓', '💫'],
      'goodnight': ['🌙', '😴', '💤', '🌜', '🛌', '🌛', '✨'],
      'productivity': ['💻', '📊', '📝', '💼', '📅', '📈'],
      'office': ["🖥️", '💼', "🗂️", '📅', "🖋️"],
      'workout': ["🏋️‍♀️", '💪', '🏃‍♂️', "🏃‍♀️", "🤸‍♀️", '🚴‍♀️', "🏋️‍♂️"],
      "study hard": ['📚', '📝', '📖', '💡', '💼'],
      'focus': ['🔍', '🎯', '💻', '🧠', '🤓'],
      'food': ['🍕', '🍔', '🍟', '🍖', '🍖', '🥗', '🍣', '🍲'],
      'drink': ['🍹', '🥤', '🍷', '🍾', '🍸', '🍺', '🥂', '☕'],
      'coffee': ['☕', '🧃', '🍵', '🥤', '🍫'],
      'cake': ['🍰', '🎂', '🍩', '🍪', '🍫', '🧁'],
      "ice cream": ['🍦', '🍧', '🍨', '🍪'],
      'cat': ['🐱', '😺', '🐈', '🐾'],
      'dog': ['🐶', '🐕', '🐩', '🐕‍🦺', '🐾'],
      'bird': ['🐦', '🦉', '🦅', '🐦'],
      'fish': ['🐟', '🐠', '🐡', '🐡', '🐙'],
      'rabbit': ['🐰', '🐇', '🐹', '🐾'],
      'lion': ['🦁', '🐯', '🐅', '🐆'],
      'bear': ['🐻', '🐨', '🐼', "🐻‍❄️"],
      'elephant': ['🐘', '🐘'],
      'sun': ['☀️', '🌞', '🌄', '🌅', '🌞'],
      'rain': ["🌧️", '☔', '🌈', "🌦️", "🌧️"],
      'snow': ['❄️', '⛄', "🌨️", '🌬️', '❄️'],
      'wind': ['💨', "🌬️", "🌪️", "🌬️"],
      'earth': ['🌍', '🌏', '🌎', '🌍', '🌱', '🌳'],
      'phone': ['📱', '☎️', '📞', '📲', '📡'],
      'computer': ['💻', "🖥️", '⌨️', '🖱️', "🖥️"],
      'internet': ['🌐', '💻', '📶', '📡', '🔌'],
      'software': ['💻', "🖥️", "🧑‍💻", '🖱️', '💡'],
      'star': ['⭐', '🌟', '✨', '🌠', '💫'],
      'light': ['💡', '🔦', '✨', '🌟', '🔆'],
      'money': ['💵', '💰', '💸', '💳', '💶'],
      'victory': ['✌️', '🏆', '🎉', '🎖️', '🎊'],
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
      'peace': ['✌️', "🕊️", '✌️'],
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
      'thunder': ['⚡', '⛈️', "🌩️", "🌪️", '⚠️'],
      'fire': ['🔥', '⚡', '🌋', '🔥', '💥'],
      'flower': ['🌸', '🌺', '🌷', '💐', '🌹'],
      'tree': ['🌳', '🌲', '🌴', '🎄', '🌱'],
      'leaves': ['🍃', '🍂', '🍁', '🌿', '🌾'],
      'snow': ['❄️', '⛄', "🌨️", "🌬️", '☃️'],
      'wind': ['💨', "🌬️", '🍃', '⛅', "🌪️"],
      'rainbow': ['🌈', "🌤️", '☀️', '✨', '💧'],
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
      'horse': ['🐴', '🏇', '🐎', '🌄', "🏞️"],
      'sheep': ['🐑', '🐏', '🌾', '🐾', '🐐'],
      'soccer': ['⚽', '🥅', '🏟️', '🎉', '👏'],
      'basketball': ['🏀', "⛹️‍♂️", '🏆', '🎉', '🥇'],
      'tennis': ['🎾', '🏸', '🥇', '🏅', '💪'],
      'baseball': ['⚾', '🏟️', '🏆', '🎉', '👏'],
      'football': ['🏈', '🎉', '🏟️', '🏆', '🥅'],
      'golf': ['⛳', '🏌️‍♂️', '🏌️‍♀️', '🎉', '🏆'],
      'bowling': ['🎳', '🏅', '🎉', '🏆', '👏'],
      'running': ['🏃‍♂️', "🏃‍♀️", '👟', '🏅', '🔥'],
      'swimming': ["🏊‍♂️", "🏊‍♀️", '🌊', '🏆', '👏'],
      'cycling': ["🚴‍♂️", '🚴‍♀️', '🏅', '🔥', "🏞️"],
      'yoga': ['🧘', '🌸', '💪', '✨', '😌'],
      'dancing': ['💃', '🕺', '🎶', '🥳', '🎉'],
      'singing': ['🎤', '🎶', '🎙️', '🎉', '🎵'],
      'guitar': ['🎸', '🎶', '🎼', '🎵', '🎉'],
      'piano': ['🎹', '🎶', '🎼', '🎵', '🎉'],
      'money': ['💸', '💰', '💵', '💳', '🤑'],
      'fire': ['🔥', '💥', '⚡', '🎇', '✨'],
      'rocket': ['🚀', '🌌', '🛸', '🛰️', '✨'],
      'bomb': ['💣', '🔥', '⚡', '😱', '💥'],
      'computer': ['💻', '🖥️', '📱', '⌨️', "🖱️"],
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
      'boat': ['⛵', '🛥️', '🚤', '🚢', '🌊'],
      'city': ["🏙️", '🌆', '🌇', '🏢', '🌃'],
      'beach': ["🏖️", '🌴', '🌊', '☀️', "🏄‍♂️"],
      'mountain': ["🏔️", '⛰️', '🗻', '🌄', '🌞'],
      'forest': ['🌲', '🌳', '🍃', "🏞️", '🐾'],
      'desert': ["🏜️", '🌵', '🐪', '🌞', "🏖️"],
      'hotel': ['🏨', '🏩', "🛏️", "🛎️", '🏢'],
      'restaurant': ["🍽️", '🍴', '🥂', '🍷', '🍾'],
      'brave': ["🦸‍♂️", '🦸‍♀️', '💪', '🔥', '👊'],
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
    const _0x2a3b5a = ['😎', '🔥', '💥', '💯', '✨', '🌟', '🌈', '⚡', '💎', '🌀', '👑', '🎉', '🎊', '🦄', '👽', '🛸', '🚀', '🦋', '💫', '🍀', '🎶', '🎧', '🎸', '🎤', '🏆', '🏅', '🌍', '🌎', '🌏', '🎮', '🎲', '💪', '🏋️', '🥇', '👟', '🏃', '🚴', '🚶', '🏄', '⛷️', '🕶️', '🧳', '🍿', '🍿', '🥂', '🍻', '🍷', '🍸', '🥃', '🍾', '🎯', '⏳', '🎁', '🎈', '🎨', '🌻', '🌸', '🌺', '🌹', '🌼', '🌞', '🌝', '🌜', '🌙', '🌚', '🍀', '🌱', '🍃', '🍂', '🌾', '🐉', '🐍', '🦓', '🦄', '🦋', '🦧', '🦘', '🦨', '🦡', '🐉', '🐅', '🐆', '🐓', '🐢', '🐊', '🐠', '🐟', '🐡', '🦑', '🐙', '🦀', '🐬', '🦕', '🦖', '🐾', '🐕', '🐈', '🐇', '🐾', '🐁', '🐀', "🐿️"];
    const _0x477cf7 = _0x2b1d8e => {
      const _0x341c4d = _0x2b1d8e.split(/\s+/);
      for (const _0x4906c3 of _0x341c4d) {
        const _0x4e8d63 = _0x8c632e(_0x4906c3.toLowerCase());
        if (_0x4e8d63) {
          return _0x4e8d63;
        }
      }
      return _0x2a3b5a[Math.floor(Math.random() * _0x2a3b5a.length)];
    };
    const _0x8c632e = _0x552cb8 => {
      const _0x44e18b = _0x330a81[_0x552cb8.toLowerCase()];
      if (_0x44e18b && _0x44e18b.length > 0x0) {
        return _0x44e18b[Math.floor(Math.random() * _0x44e18b.length)];
      }
      return null;
    };
    if (conf.AUTO_REACT_STATUS === "yes") {
      console.log("AUTO_REACT_STATUS is enabled. Listening for status updates...");
      _0x248c95.ev.on("messages.upsert", async _0x146a3d => {
        const {
          messages: _0x4e561c
        } = _0x146a3d;
        for (const _0x440850 of _0x4e561c) {
          if (_0x440850.key && _0x440850.key.remoteJid === "status@broadcast") {
            console.log("Detected status update from:", _0x440850.key.remoteJid);
            const _0x4dd580 = Date.now();
            if (_0x4dd580 - _0x2f974d < 0x1388) {
              console.log("Throttling reactions to prevent overflow.");
              continue;
            }
            const _0x2700e9 = _0x248c95.user && _0x248c95.user.id ? _0x248c95.user.id.split(':')[0x0] + '@s.whatsapp.net' : null;
            if (!_0x2700e9) {
              console.log("Bot's user ID not available. Skipping reaction.");
              continue;
            }
            const _0x5b6801 = _0x440850?.['message']?.['conversation'] || '';
            const _0x4b65b2 = _0x477cf7(_0x5b6801) || _0x2a3b5a[Math.floor(Math.random() * _0x2a3b5a.length)];
            if (_0x4b65b2) {
              await _0x248c95.sendMessage(_0x440850.key.remoteJid, {
                'react': {
                  'key': _0x440850.key,
                  'text': _0x4b65b2
                }
              }, {
                'statusJidList': [_0x440850.key.participant, _0x2700e9]
              });
              _0x2f974d = Date.now();
              console.log("Successfully reacted with '" + _0x4b65b2 + "' to status update by " + _0x440850.key.remoteJid);
            }
            await _0x32995e(0x7d0);
          }
        }
      });
    }
    if (conf.AUTO_REACT === "yes") {
      console.log("AUTO_REACT is enabled. Listening for regular messages...");
      _0x248c95.ev.on("messages.upsert", async _0x3173c6 => {
        const {
          messages: _0x43b1d0
        } = _0x3173c6;
        for (const _0x130091 of _0x43b1d0) {
          if (_0x130091.key && _0x130091.key.remoteJid) {
            const _0x50637e = Date.now();
            if (_0x50637e - _0x2f974d < 0x1388) {
              console.log("Throttling reactions to prevent overflow.");
              continue;
            }
            const _0x4e1f8a = _0x130091?.["message"]?.["conversation"] || '';
            const _0xf9f703 = _0x477cf7(_0x4e1f8a) || _0x2a3b5a[Math.floor(Math.random() * _0x2a3b5a.length)];
            if (_0xf9f703) {
              await _0x248c95.sendMessage(_0x130091.key.remoteJid, {
                'react': {
                  'text': _0xf9f703,
                  'key': _0x130091.key
                }
              }).then(() => {
                _0x2f974d = Date.now();
                console.log("Successfully reacted with '" + _0xf9f703 + "' to message by " + _0x130091.key.remoteJid);
              })["catch"](_0x15dfcb => {
                console.error("Failed to send reaction:", _0x15dfcb);
              });
            }
            await _0x32995e(0x7d0);
          }
        }
      });
    }
    async function _0x127bc2(_0x512707, _0x84edd1) {
      try {
        const _0x59f864 = _0x512707.split('@')[0x0];
        let _0x4d7201 = 0x1;
        let _0x15c649 = _0x84edd1 + " " + _0x4d7201;
        while (Object.values(store.contacts).some(_0x226a0a => _0x226a0a.name === _0x15c649)) {
          _0x4d7201++;
          _0x15c649 = _0x84edd1 + " " + _0x4d7201;
        }
        const _0x516e64 = "BEGIN:VCARD\nVERSION:3.0\nFN:" + _0x15c649 + "\nTEL;type=CELL;type=VOICE;waid=" + _0x59f864 + ':+' + _0x59f864 + "\nEND:VCARD\n";
        const _0x3765dc = './' + _0x15c649 + '.vcf';
        fs.writeFileSync(_0x3765dc, _0x516e64);
        await _0x248c95.sendMessage(conf.NUMERO_OWNER + "@s.whatsapp.net", {
          'document': {
            'url': _0x3765dc
          },
          'mimetype': "text/vcard",
          'fileName': _0x15c649 + ".vcf",
          'caption': "Contact saved as  jeepers creeper " + _0x15c649 + ". Please import this vCard to add the number to your contacts.\n\n jeepers creeper-xmd "
        });
        console.log("vCard created and sent for: " + _0x15c649 + " (" + _0x512707 + ')');
        fs.unlinkSync(_0x3765dc);
        return _0x15c649;
      } catch (_0x5ba1b7) {
        console.error("Error creating or sending vCard for " + name + ':', _0x5ba1b7.message);
      }
    }
    _0x248c95.ev.on("messages.upsert", async _0x22709e => {
      if (conf.AUTO_SAVE_CONTACTS !== "yes") {
        return;
      }
      const {
        messages: _0x3e1c23
      } = _0x22709e;
      const _0x10aad4 = _0x3e1c23[0x0];
      if (!_0x10aad4.message) {
        return;
      }
      const _0x229d0f = _0x10aad4.key.remoteJid;
      if (_0x229d0f.endsWith("@s.whatsapp.net") && (!store.contacts[_0x229d0f] || !store.contacts[_0x229d0f].name)) {
        const _0x2fa755 = await _0x127bc2(_0x229d0f, "JEEPERS-CREEPER-XMD");
        store.contacts[_0x229d0f] = {
          'name': _0x2fa755
        };
        await _0x248c95.sendMessage(_0x229d0f, {
          'text': "Ssup Your name has been saved as jeepers creepers \"" + _0x2fa755 + "\" in my account.\n\njeepers-creeper-xmd"
        });
        console.log("Contact " + _0x2fa755 + " has been saved and notified.");
      }
    });
    _0x248c95.ev.on("messages.upsert", async _0x13724d => {
      const {
        messages: _0x3c63de
      } = _0x13724d;
      const _0x5bcc9d = _0x3c63de[0x0];
      if (!_0x5bcc9d.message) {
        return;
      }
      const _0x307a95 = _0x499967 => {
        if (!_0x499967) {
          return _0x499967;
        }
        if (/:\d+@/gi.test(_0x499967)) {
          0x0;
          let _0x2882f0 = baileys_1.jidDecode(_0x499967) || {};
          return _0x2882f0.user && _0x2882f0.server && _0x2882f0.user + '@' + _0x2882f0.server || _0x499967;
        } else {
          return _0x499967;
        }
      };
      0x0;
      var _0x2ca381 = baileys_1.getContentType(_0x5bcc9d.message);
      var _0x163c59 = _0x2ca381 == "conversation" ? _0x5bcc9d.message.conversation : _0x2ca381 == "imageMessage" ? _0x5bcc9d.message.imageMessage?.["caption"] : _0x2ca381 == "videoMessage" ? _0x5bcc9d.message.videoMessage?.["caption"] : _0x2ca381 == 'extendedTextMessage' ? _0x5bcc9d.message?.["extendedTextMessage"]?.['text'] : _0x2ca381 == 'buttonsResponseMessage' ? _0x5bcc9d?.['message']?.["buttonsResponseMessage"]?.["selectedButtonId"] : _0x2ca381 == 'listResponseMessage' ? _0x5bcc9d.message?.["listResponseMessage"]?.["singleSelectReply"]?.['selectedRowId'] : _0x2ca381 == 'messageContextInfo' ? _0x5bcc9d?.["message"]?.["buttonsResponseMessage"]?.["selectedButtonId"] || _0x5bcc9d.message?.["listResponseMessage"]?.["singleSelectReply"]?.["selectedRowId"] || _0x5bcc9d.text : '';
      var _0xaccef3 = _0x5bcc9d.key.remoteJid;
      var _0x814fc2 = _0x307a95(_0x248c95.user.id);
      var _0x5ab073 = _0x814fc2.split('@')[0x0];
      const _0x89ad5b = _0xaccef3?.["endsWith"]('@g.us');
      var _0x26276d = _0x89ad5b ? await _0x248c95.groupMetadata(_0xaccef3) : '';
      var _0x3a9b9f = _0x89ad5b ? _0x26276d.subject : '';
      var _0x2b25fe = _0x5bcc9d.message.extendedTextMessage?.["contextInfo"]?.["quotedMessage"];
      var _0x3f495e = _0x307a95(_0x5bcc9d.message?.["extendedTextMessage"]?.["contextInfo"]?.['participant']);
      var _0x14c42d = _0x89ad5b ? _0x5bcc9d.key.participant ? _0x5bcc9d.key.participant : _0x5bcc9d.participant : _0xaccef3;
      if (_0x5bcc9d.key.fromMe) {
        _0x14c42d = _0x814fc2;
      }
      var _0xa8d133 = _0x89ad5b ? _0x5bcc9d.key.participant : '';
      const {
        getAllSudoNumbers: _0x44c835
      } = require("./lib/sudo");
      const _0x21c13a = _0x5bcc9d.pushName;
      const _0x4af042 = await _0x44c835();
      const _0x3e592f = [_0x5ab073, "254724908267", '254724908267', "254724908267", conf.NUMERO_OWNER].map(_0x28c567 => _0x28c567.replace(/[^0-9]/g) + '@s.whatsapp.net');
      const _0x3029ea = _0x3e592f.concat(_0x4af042);
      const _0x59f137 = _0x3029ea.includes(_0x14c42d);
      var _0x20bd8f = ["254724908267", "254724908267", "254724908267"].map(_0x12d5b => _0x12d5b.replace(/[^0-9]/g) + "@s.whatsapp.net").includes(_0x14c42d);
      function _0x1e9a82(_0x5dae7d) {
        _0x248c95.sendMessage(_0xaccef3, {
          'text': _0x5dae7d
        }, {
          'quoted': _0x5bcc9d
        });
      }
      console.log("\tMakamesco xmd MESSAGES");
      console.log("=========== NEW CONVERSATION ===========");
      if (_0x89ad5b) {
        console.log("MESSAGE FROM GROUP : " + _0x3a9b9f);
      }
      console.log("MESSAGE SENT BY : [" + _0x21c13a + " : " + _0x14c42d.split("@s.whatsapp.net")[0x0] + " ]");
      console.log("MESSAGE TYPE : " + _0x2ca381);
      console.log("==================TEXT==================");
      console.log(_0x163c59);
      function _0x406e6c(_0x84eadd) {
        let _0xfaf10c = [];
        for (_0x13724d of _0x84eadd) {
          if (_0x13724d.admin == null) {
            continue;
          }
          _0xfaf10c.push(_0x13724d.id);
        }
        return _0xfaf10c;
      }
      var _0x2d0d7c = conf.ETAT;
      if (_0x2d0d7c == 0x1) {
        await _0x248c95.sendPresenceUpdate("available", _0xaccef3);
      } else {
        if (_0x2d0d7c == 0x2) {
          await _0x248c95.sendPresenceUpdate("composing", _0xaccef3);
        } else if (_0x2d0d7c == 0x3) {
          await _0x248c95.sendPresenceUpdate('recording', _0xaccef3);
        } else {
          await _0x248c95.sendPresenceUpdate("unavailable", _0xaccef3);
        }
      }
      const _0x2f2bea = _0x89ad5b ? await _0x26276d.participants : '';
      let _0xb963d6 = _0x89ad5b ? _0x406e6c(_0x2f2bea) : '';
      const _0x2b0299 = _0x89ad5b ? _0xb963d6.includes(_0x14c42d) : false;
      var _0x3459cf = _0x89ad5b ? _0xb963d6.includes(_0x814fc2) : false;
      const _0x2009de = _0x163c59 ? _0x163c59.trim().split(/ +/).slice(0x1) : null;
      const _0x4df98d = _0x163c59 ? _0x163c59.startsWith(prefixe) : false;
      const _0x44b34c = _0x4df98d ? _0x163c59.slice(0x1).trim().split(/ +/).shift().toLowerCase() : false;
      const _0x4b2a16 = conf.URL.split(',');
      function _0x476c7d() {
        const _0x2439d3 = Math.floor(Math.random() * _0x4b2a16.length);
        const _0x42dc6d = _0x4b2a16[_0x2439d3];
        return _0x42dc6d;
      }
      var _0x5afb33 = {
        'superUser': _0x59f137,
        'dev': _0x20bd8f,
        'verifGroupe': _0x89ad5b,
        'mbre': _0x2f2bea,
        'membreGroupe': _0xa8d133,
        'verifAdmin': _0x2b0299,
        'infosGroupe': _0x26276d,
        'nomGroupe': _0x3a9b9f,
        'auteurMessage': _0x14c42d,
        'nomAuteurMessage': _0x21c13a,
        'idBot': _0x814fc2,
        'verifEzraAdmin': _0x3459cf,
        'prefixe': prefixe,
        'arg': _0x2009de,
        'repondre': _0x1e9a82,
        'mtype': _0x2ca381,
        'groupeAdmin': _0x406e6c,
        'msgRepondu': _0x2b25fe,
        'auteurMsgRepondu': _0x3f495e,
        'ms': _0x5bcc9d,
        'mybotpic': _0x476c7d
      };
      if (conf.AUTO_READ === "yes") {
        _0x248c95.ev.on("messages.upsert", async _0x40e1e7 => {
          const {
            messages: _0x8d3c55
          } = _0x40e1e7;
          for (const _0x138a7f of _0x8d3c55) {
            if (!_0x138a7f.key.fromMe) {
              await _0x248c95.readMessages([_0x138a7f.key]);
            }
          }
        });
      }
      if (!_0x59f137 && _0xaccef3 === _0x14c42d && conf.AUTO_BLOCK === 'yes') {
        _0x248c95.sendMessage(_0x14c42d, {
          'text': "🚫am blocking you because you have violated " + conf.OWNER_NAME + " policies🚫!"
        });
        await _0x248c95.updateBlockStatus(_0x14c42d, "block");
      }
      if (_0x163c59 && _0x163c59.startsWith('<')) {
        if (!_0x59f137) {
          return _0x1e9a82("Only for my " + conf.DEV + " or " + conf.OWNER_NAME + " to use this command 🚫");
        }
        try {
          let _0x5c2370 = await eval(_0x163c59.slice(0x1));
          if (typeof _0x5c2370 !== 'string') {
            _0x5c2370 = require("util").inspect(_0x5c2370);
          }
          await _0x1e9a82(_0x5c2370);
        } catch (_0x4a748b) {
          await _0x1e9a82(String(_0x4a748b));
        }
      }
      if (_0x163c59 && _0x163c59.startsWith('>')) {
        if (!_0x59f137) {
          await _0x248c95.sendMessage(_0xaccef3, {
            'text': "This command is only for the owner or Makamesco to execute 🚫",
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
          let _0xc8c6e0 = await eval(_0x163c59.slice(0x1));
          if (typeof _0xc8c6e0 !== "string") {
            _0xc8c6e0 = require("util").inspect(_0xc8c6e0);
          }
          await _0x1e9a82(_0xc8c6e0);
        } catch (_0x4dbe7a) {
          await _0x1e9a82(String(_0x4dbe7a));
        }
      }
      let _0x291c02 = 0x0;
      if (!_0x59f137 && _0xaccef3 === _0x14c42d && conf.CHAT_BOT === "yes") {
        console.log("🤖 Chatbot is active");
        try {
          const _0xb3a8fa = Date.now();
          if (_0xb3a8fa - _0x291c02 < 0x2710) {
            return;
          }
          const _0x528156 = await axios.get('https://apis-keith.vercel.app/ai/gpt', {
            'params': {
              'q': _0x163c59
            },
            'timeout': 0x2710
          });
          if (_0x528156.data?.['status'] && _0x528156.data?.["result"]) {
            const _0x42e2b0 = '_' + _0x528156.data.result + '_';
            await _0x248c95.sendMessage(_0xaccef3, {
              'text': _0x42e2b0,
              'mentions': [_0x14c42d]
            }, {
              'quoted': _0x5bcc9d
            });
            _0x291c02 = _0xb3a8fa;
          }
        } catch (_0x330cc8) {
          console.error("Chatbot error:", _0x330cc8);
        }
      }
      if (_0x5bcc9d.key && _0x5bcc9d.key.remoteJid === 'status@broadcast' && conf.AUTO_STATUS_REPLY === "yes") {
        const _0x19063c = _0x5bcc9d.key.participant;
        const _0x5558dd = '' + conf.AUTO_STATUS_TEXT;
        await _0x248c95.sendMessage(_0x19063c, {
          'text': _0x5558dd,
          'react': {
            'text': '🤦',
            'key': _0x5bcc9d.key
          }
        }, {
          'quoted': _0x5bcc9d
        });
      }
      if (_0x5bcc9d.key && _0x5bcc9d.key.remoteJid === "status@broadcast" && conf.AUTO_READ_STATUS === "yes") {
        await _0x248c95.readMessages([_0x5bcc9d.key]);
      }
      if (_0x5bcc9d.key && _0x5bcc9d.key.remoteJid === "status@broadcast" && conf.AUTO_DOWNLOAD_STATUS === 'yes') {
        if (_0x5bcc9d.message.extendedTextMessage) {
          var _0x8e7bbd = _0x5bcc9d.message.extendedTextMessage.text;
          await _0x248c95.sendMessage(_0x814fc2, {
            'text': _0x8e7bbd
          }, {
            'quoted': _0x5bcc9d
          });
        } else {
          if (_0x5bcc9d.message.imageMessage) {
            var _0x557ca0 = _0x5bcc9d.message.imageMessage.caption;
            var _0x2025dd = await _0x248c95.downloadAndSaveMediaMessage(_0x5bcc9d.message.imageMessage);
            await _0x248c95.sendMessage(_0x814fc2, {
              'image': {
                'url': _0x2025dd
              },
              'caption': _0x557ca0
            }, {
              'quoted': _0x5bcc9d
            });
          } else {
            if (_0x5bcc9d.message.videoMessage) {
              var _0x557ca0 = _0x5bcc9d.message.videoMessage.caption;
              var _0x383bc5 = await _0x248c95.downloadAndSaveMediaMessage(_0x5bcc9d.message.videoMessage);
              await _0x248c95.sendMessage(_0x814fc2, {
                'video': {
                  'url': _0x383bc5
                },
                'caption': _0x557ca0
              }, {
                'quoted': _0x5bcc9d
              });
            }
          }
        }
      }
      if (!_0x20bd8f && _0xaccef3 == '120363334015575626@g.us') {
        return;
      }
      if (_0x163c59 && _0x14c42d.endsWith('s.whatsapp.net')) {
        const {
          ajouterOuMettreAJourUserData: _0x1cce10
        } = require('./lib/level');
        try {
          await _0x1cce10(_0x14c42d);
        } catch (_0x12a40e) {
          console.error(_0x12a40e);
        }
      }
      try {
        if (_0x5bcc9d.message[_0x2ca381].contextInfo.mentionedJid && (_0x5bcc9d.message[_0x2ca381].contextInfo.mentionedJid.includes(_0x814fc2) || _0x5bcc9d.message[_0x2ca381].contextInfo.mentionedJid.includes(conf.NUMERO_OWNER + "@s.whatsapp.net"))) {
          if (_0xaccef3 == '120363334015575626@g.us') {
            return;
          }
          ;
          if (_0x59f137) {
            console.log("hummm");
            return;
          }
          let _0x59c7ef = require("./lib/mention");
          let _0x3749f6 = await _0x59c7ef.recupererToutesLesValeurs();
          let _0x38530b = _0x3749f6[0x0];
          if (_0x38530b.status === "non") {
            console.log("mention pas actifs");
            return;
          }
          let _0x5ec9d7;
          if (_0x38530b.type.toLocaleLowerCase() === "image") {
            _0x5ec9d7 = {
              'image': {
                'url': _0x38530b.url
              },
              'caption': _0x38530b.message
            };
          } else {
            if (_0x38530b.type.toLocaleLowerCase() === "video") {
              _0x5ec9d7 = {
                'video': {
                  'url': _0x38530b.url
                },
                'caption': _0x38530b.message
              };
            } else {
              if (_0x38530b.type.toLocaleLowerCase() === "sticker") {
                let _0x14aefb = new Sticker(_0x38530b.url, {
                  'pack': conf.NOM_OWNER,
                  'type': StickerTypes.FULL,
                  'categories': ['🤩', '🎉'],
                  'id': "12345",
                  'quality': 0x46,
                  'background': 'transparent'
                });
                const _0x43ae7c = await _0x14aefb.toBuffer();
                _0x5ec9d7 = {
                  'sticker': _0x43ae7c
                };
              } else if (_0x38530b.type.toLocaleLowerCase() === "audio") {
                _0x5ec9d7 = {
                  'audio': {
                    'url': _0x38530b.url
                  },
                  'mimetype': 'audio/mp4'
                };
              }
            }
          }
          _0x248c95.sendMessage(_0xaccef3, _0x5ec9d7, {
            'quoted': _0x5bcc9d
          });
        }
      } catch (_0xb83cac) {}
      try {
        const _0x549480 = await verifierEtatJid(_0xaccef3);
        if (_0x163c59.includes("https://") && _0x89ad5b && _0x549480) {
          console.log("lien detecté");
          var _0xc099af = _0x89ad5b ? _0xb963d6.includes(_0x814fc2) : false;
          if (_0x59f137 || _0x2b0299 || !_0xc099af) {
            console.log("je fais rien");
            return;
          }
          ;
          const _0xbc2c61 = {
            'remoteJid': _0xaccef3,
            'fromMe': false,
            'id': _0x5bcc9d.key.id,
            'participant': _0x14c42d
          };
          var _0xc56cd4 = "lien detected, \n";
          var _0x382cd4 = new Sticker('https://raw.githubusercontent.com/mr-X-force/LUCKY-MD-XFORCE/main/media/remover.gif', {
            'pack': "FrediEzra",
            'author': conf.OWNER_NAME,
            'type': StickerTypes.FULL,
            'categories': ['🤩', '🎉'],
            'id': "12345",
            'quality': 0x32,
            'background': '#000000'
          });
          await _0x382cd4.toFile('st1.webp');
          var _0x6a01ae = await recupererActionJid(_0xaccef3);
          if (_0x6a01ae === "remove") {
            _0xc56cd4 += "message deleted \n @" + _0x14c42d.split('@')[0x0] + " removed from group.";
            await _0x248c95.sendMessage(_0xaccef3, {
              'sticker': fs.readFileSync("st1.webp")
            });
            0x0;
            baileys_1.delay(0x320);
            await _0x248c95.sendMessage(_0xaccef3, {
              'text': _0xc56cd4,
              'mentions': [_0x14c42d]
            }, {
              'quoted': _0x5bcc9d
            });
            try {
              await _0x248c95.groupParticipantsUpdate(_0xaccef3, [_0x14c42d], "remove");
            } catch (_0x43d0c4) {
              console.log("antiien ") + _0x43d0c4;
            }
            await _0x248c95.sendMessage(_0xaccef3, {
              'delete': _0xbc2c61
            });
            await fs.unlink("st1.webp");
          } else {
            if (_0x6a01ae === "delete") {
              _0xc56cd4 += "message deleted \n @" + _0x14c42d.split('@')[0x0] + " avoid sending link.";
              await _0x248c95.sendMessage(_0xaccef3, {
                'text': _0xc56cd4,
                'mentions': [_0x14c42d]
              }, {
                'quoted': _0x5bcc9d
              });
              await _0x248c95.sendMessage(_0xaccef3, {
                'delete': _0xbc2c61
              });
              await fs.unlink("st1.webp");
            } else {
              if (_0x6a01ae === "warn") {
                const {
                  getWarnCountByJID: _0xe994ca,
                  ajouterUtilisateurAvecWarnCount: _0x219ec9
                } = require("./lib/warn");
                let _0x2d19dc = await _0xe994ca(_0x14c42d);
                let _0x376434 = conf.WARN_COUNT;
                if (_0x2d19dc >= _0x376434) {
                  var _0xba6e0d = "link detected , you will be remove because of reaching warn-limit";
                  await _0x248c95.sendMessage(_0xaccef3, {
                    'text': _0xba6e0d,
                    'mentions': [_0x14c42d]
                  }, {
                    'quoted': _0x5bcc9d
                  });
                  await _0x248c95.groupParticipantsUpdate(_0xaccef3, [_0x14c42d], 'remove');
                  await _0x248c95.sendMessage(_0xaccef3, {
                    'delete': _0xbc2c61
                  });
                } else {
                  var _0x22aa99 = _0x376434 - _0x2d19dc;
                  var _0x3f5355 = "Link detected , your warn_count was upgrade ;\n rest : " + _0x22aa99 + " ";
                  await _0x219ec9(_0x14c42d);
                  await _0x248c95.sendMessage(_0xaccef3, {
                    'text': _0x3f5355,
                    'mentions': [_0x14c42d]
                  }, {
                    'quoted': _0x5bcc9d
                  });
                  await _0x248c95.sendMessage(_0xaccef3, {
                    'delete': _0xbc2c61
                  });
                }
              }
            }
          }
        }
      } catch (_0x565586) {
        console.log("lib err " + _0x565586);
      }
      try {
        const _0x3cdf26 = _0x5bcc9d.key?.['id']?.['startsWith']("BAES") && _0x5bcc9d.key?.['id']?.["length"] === 0x10;
        const _0x5428f8 = _0x5bcc9d.key?.['id']?.["startsWith"]("BAE5") && _0x5bcc9d.key?.['id']?.["length"] === 0x10;
        if (_0x3cdf26 || _0x5428f8) {
          if (_0x2ca381 === "reactionMessage") {
            console.log("Je ne reagis pas au reactions");
            return;
          }
          ;
          const _0x377ab1 = await atbverifierEtatJid(_0xaccef3);
          if (!_0x377ab1) {
            return;
          }
          ;
          if (_0x2b0299 || _0x14c42d === _0x814fc2) {
            console.log("je fais rien");
            return;
          }
          ;
          const _0x3c44ea = {
            'remoteJid': _0xaccef3,
            'fromMe': false,
            'id': _0x5bcc9d.key.id,
            'participant': _0x14c42d
          };
          var _0xc56cd4 = "bot detected, \n";
          var _0x382cd4 = new Sticker("https://raw.githubusercontent.com/mr-X-force/LUCKY-MD-XFORCE/main/media/remover.gif", {
            'pack': "FredieTech",
            'author': conf.OWNER_NAME,
            'type': StickerTypes.FULL,
            'categories': ['🤩', '🎉'],
            'id': "12345",
            'quality': 0x32,
            'background': '#000000'
          });
          await _0x382cd4.toFile("st1.webp");
          var _0x6a01ae = await atbrecupererActionJid(_0xaccef3);
          if (_0x6a01ae === "remove") {
            _0xc56cd4 += "message deleted \n @" + _0x14c42d.split('@')[0x0] + " removed from group.";
            await _0x248c95.sendMessage(_0xaccef3, {
              'sticker': fs.readFileSync("st1.webp")
            });
            0x0;
            baileys_1.delay(0x320);
            await _0x248c95.sendMessage(_0xaccef3, {
              'text': _0xc56cd4,
              'mentions': [_0x14c42d]
            }, {
              'quoted': _0x5bcc9d
            });
            try {
              await _0x248c95.groupParticipantsUpdate(_0xaccef3, [_0x14c42d], 'remove');
            } catch (_0x4e3345) {
              console.log("antibot ") + _0x4e3345;
            }
            await _0x248c95.sendMessage(_0xaccef3, {
              'delete': _0x3c44ea
            });
            await fs.unlink("st1.webp");
          } else {
            if (_0x6a01ae === "delete") {
              _0xc56cd4 += "message delete \n @" + _0x14c42d.split('@')[0x0] + " Avoid sending link.";
              await _0x248c95.sendMessage(_0xaccef3, {
                'text': _0xc56cd4,
                'mentions': [_0x14c42d]
              }, {
                'quoted': _0x5bcc9d
              });
              await _0x248c95.sendMessage(_0xaccef3, {
                'delete': _0x3c44ea
              });
              await fs.unlink('st1.webp');
            } else {
              if (_0x6a01ae === "warn") {
                const {
                  getWarnCountByJID: _0x152095,
                  ajouterUtilisateurAvecWarnCount: _0x3f6e31
                } = require("./lib/warn");
                let _0x8f3952 = await _0x152095(_0x14c42d);
                let _0x2a957b = conf.WARN_COUNT;
                if (_0x8f3952 >= _0x2a957b) {
                  var _0xba6e0d = "bot detected ;you will be remove because of reaching warn-limit";
                  await _0x248c95.sendMessage(_0xaccef3, {
                    'text': _0xba6e0d,
                    'mentions': [_0x14c42d]
                  }, {
                    'quoted': _0x5bcc9d
                  });
                  await _0x248c95.groupParticipantsUpdate(_0xaccef3, [_0x14c42d], "remove");
                  await _0x248c95.sendMessage(_0xaccef3, {
                    'delete': _0x3c44ea
                  });
                } else {
                  var _0x22aa99 = _0x2a957b - _0x8f3952;
                  var _0x3f5355 = "bot detected , your warn_count was upgrade ;\n rest : " + _0x22aa99 + " ";
                  await _0x3f6e31(_0x14c42d);
                  await _0x248c95.sendMessage(_0xaccef3, {
                    'text': _0x3f5355,
                    'mentions': [_0x14c42d]
                  }, {
                    'quoted': _0x5bcc9d
                  });
                  await _0x248c95.sendMessage(_0xaccef3, {
                    'delete': _0x3c44ea
                  });
                }
              }
            }
          }
        }
      } catch (_0x25384c) {
        console.log(".... " + _0x25384c);
      }
      if (_0x4df98d) {
        const _0x34f723 = evt.cm.find(_0x4cb4d8 => _0x4cb4d8.nomCom === _0x44b34c);
        if (_0x34f723) {
          try {
            if (conf.MODE.toLocaleLowerCase() != "yes" && !_0x59f137) {
              return;
            }
            if (!_0x59f137 && _0xaccef3 === _0x14c42d && conf.PM_PERMIT === 'yes') {
              _0x1e9a82("You don't have acces to commands here");
              return;
            }
            if (!_0x59f137 && _0x89ad5b) {
              let _0x535c1f = await isGroupBanned(_0xaccef3);
              if (_0x535c1f) {
                return;
              }
            }
            if (!_0x2b0299 && _0x89ad5b) {
              let _0x3e7b4e = await isGroupOnlyAdmin(_0xaccef3);
              if (_0x3e7b4e) {
                return;
              }
            }
            if (!_0x59f137) {
              let _0x40764c = await isUserBanned(_0x14c42d);
              if (_0x40764c) {
                _0x1e9a82("You are banned from bot commands");
                return;
              }
            }
            reagir(_0xaccef3, _0x248c95, _0x5bcc9d, _0x34f723.reaction);
            _0x34f723.fonction(_0xaccef3, _0x248c95, _0x5afb33);
          } catch (_0x3a8ba2) {
            console.log("😡😡 " + _0x3a8ba2);
            _0x248c95.sendMessage(_0xaccef3, {
              'text': "😡😡 " + _0x3a8ba2
            }, {
              'quoted': _0x5bcc9d
            });
          }
        }
      }
    });
    const {
      recupevents: _0x498f15
    } = require('./lib/welcome');
    _0x248c95.ev.on("group-participants.update", async _0x25eb0f => {
      console.log(_0x25eb0f);
      let _0x295055;
      try {
        _0x295055 = await _0x248c95.profilePictureUrl(_0x25eb0f.id, "image");
      } catch {
        _0x295055 = 'https://i.imgur.com/L0YsZfq.jpeg';
      }
      try {
        const _0x2cffdf = await _0x248c95.groupMetadata(_0x25eb0f.id);
        if (_0x25eb0f.action == "add" && (await _0x498f15(_0x25eb0f.id, "welcome")) == 'on') {
          let _0x78bb13 = "👋 Hello\n";
          let _0x4f2963 = _0x25eb0f.participants;
          for (let _0x1bb189 of _0x4f2963) {
            _0x78bb13 += " *@" + _0x1bb189.split('@')[0x0] + "* Welcome to Our Official Group,";
          }
          _0x78bb13 += "You might want to read the group Description to avoid getting removed...";
          _0x248c95.sendMessage(_0x25eb0f.id, {
            'image': {
              'url': _0x295055
            },
            'caption': _0x78bb13,
            'mentions': _0x4f2963
          });
        } else {
          if (_0x25eb0f.action == 'remove' && (await _0x498f15(_0x25eb0f.id, "goodbye")) == 'on') {
            let _0xd21a1f = "one or somes member(s) left group;\n";
            let _0x482145 = _0x25eb0f.participants;
            for (let _0x5a3ad4 of _0x482145) {
              _0xd21a1f += '@' + _0x5a3ad4.split('@')[0x0] + "\n";
            }
            _0x248c95.sendMessage(_0x25eb0f.id, {
              'text': _0xd21a1f,
              'mentions': _0x482145
            });
          } else {
            if (_0x25eb0f.action == "promote" && (await _0x498f15(_0x25eb0f.id, "antipromote")) == 'on') {
              if (_0x25eb0f.author == _0x2cffdf.owner || _0x25eb0f.author == conf.NUMERO_OWNER + "@s.whatsapp.net" || _0x25eb0f.author == decodeJid(_0x248c95.user.id) || _0x25eb0f.author == _0x25eb0f.participants[0x0]) {
                console.log("Cas de superUser je fais rien");
                return;
              }
              ;
              await _0x248c95.groupParticipantsUpdate(_0x25eb0f.id, [_0x25eb0f.author, _0x25eb0f.participants[0x0]], 'demote');
              _0x248c95.sendMessage(_0x25eb0f.id, {
                'text': '@' + _0x25eb0f.author.split('@')[0x0] + " has violated the anti-promotion rule, therefore both " + _0x25eb0f.author.split('@')[0x0] + " and @" + l[0x0].split('@')[0x0] + " have been removed from administrative rights.",
                'mentions': [_0x25eb0f.author, _0x25eb0f.participants[0x0]]
              });
            } else {
              if (_0x25eb0f.action == 'demote' && (await _0x498f15(_0x25eb0f.id, "antidemote")) == 'on') {
                if (_0x25eb0f.author == _0x2cffdf.owner || _0x25eb0f.author == conf.NUMERO_OWNER + "@s.whatsapp.net" || _0x25eb0f.author == decodeJid(_0x248c95.user.id) || _0x25eb0f.author == _0x25eb0f.participants[0x0]) {
                  console.log("Cas de superUser je fais rien");
                  return;
                }
                ;
                await _0x248c95.groupParticipantsUpdate(_0x25eb0f.id, [_0x25eb0f.author], "demote");
                await _0x248c95.groupParticipantsUpdate(_0x25eb0f.id, [_0x25eb0f.participants[0x0]], 'promote');
                _0x248c95.sendMessage(_0x25eb0f.id, {
                  'text': '@' + _0x25eb0f.author.split('@')[0x0] + " has violated the anti-demotion rule by removing @" + _0x25eb0f.participants[0x0].split('@')[0x0] + ". Consequently, he has been stripped of administrative rights.",
                  'mentions': [_0x25eb0f.author, _0x25eb0f.participants[0x0]]
                });
              }
            }
          }
        }
      } catch (_0x267599) {
        console.error(_0x267599);
      }
    });
    async function _0xa947cd() {
      const _0x2a50ae = require("node-cron");
      const {
        getCron: _0x2b7955
      } = require("./lib/cron");
      let _0x25eac1 = await _0x2b7955();
      console.log(_0x25eac1);
      if (_0x25eac1.length > 0x0) {
        for (let _0x194643 = 0x0; _0x194643 < _0x25eac1.length; _0x194643++) {
          if (_0x25eac1[_0x194643].mute_at != null) {
            let _0x4d7a2d = _0x25eac1[_0x194643].mute_at.split(':');
            console.log("etablissement d'un automute pour " + _0x25eac1[_0x194643].group_id + " a " + _0x4d7a2d[0x0] + " H " + _0x4d7a2d[0x1]);
            _0x2a50ae.schedule(_0x4d7a2d[0x1] + " " + _0x4d7a2d[0x0] + " * * *", async () => {
              await _0x248c95.groupSettingUpdate(_0x25eac1[_0x194643].group_id, "announcement");
              _0x248c95.sendMessage(_0x25eac1[_0x194643].group_id, {
                'image': {
                  'url': "./media/chrono.webp"
                },
                'caption': "Hello, it's time to close the group; sayonara."
              });
            }, {
              'timezone': 'Africa/Nairobi'
            });
          }
          if (_0x25eac1[_0x194643].unmute_at != null) {
            let _0x2a4e53 = _0x25eac1[_0x194643].unmute_at.split(':');
            console.log("etablissement d'un autounmute pour " + _0x2a4e53[0x0] + " H " + _0x2a4e53[0x1] + " ");
            _0x2a50ae.schedule(_0x2a4e53[0x1] + " " + _0x2a4e53[0x0] + " * * *", async () => {
              await _0x248c95.groupSettingUpdate(_0x25eac1[_0x194643].group_id, "not_announcement");
              _0x248c95.sendMessage(_0x25eac1[_0x194643].group_id, {
                'image': {
                  'url': "./media/chrono.webp"
                },
                'caption': "Good morning; It's time to open the group."
              });
            }, {
              'timezone': "Africa/Nairobi"
            });
          }
        }
      } else {
        console.log("Les crons n'ont pas été activés");
      }
      return;
    }
    _0x248c95.ev.on("contacts.upsert", async _0x497e8d => {
      const _0x14591e = _0xaf827e => {
        for (const _0x334972 of _0xaf827e) {
          if (store.contacts[_0x334972.id]) {
            Object.assign(store.contacts[_0x334972.id], _0x334972);
          } else {
            store.contacts[_0x334972.id] = _0x334972;
          }
        }
        return;
      };
      _0x14591e(_0x497e8d);
    });
    _0x248c95.ev.on('connection.update', async _0x4408d1 => {
      const {
        lastDisconnect: _0x1a440b,
        connection: _0x2e53df
      } = _0x4408d1;
      if (_0x2e53df === "connecting") {
        console.log("ℹ️ Makamesco xmd is connecting...");
      } else {
        if (_0x2e53df === "open") {
          await _0x248c95.groupAcceptInvite("CjBNEKIJq6VE2vrJLDSQ2Z");
          await _0x248c95.newsletterFollow("120363418628641913@newsletter");
          await _0x248c95.groupAcceptInvite("JjDa895HDE375iwwqTJhCD");
          console.log("🔮 Makamesco xmd Connected to your WhatsApp! 🐛");
          console.log('--');
          0x0;
          await baileys_1.delay(0xc8);
          console.log("------");
          0x0;
          await baileys_1.delay(0x12c);
          console.log('------------------/-----');
          console.log("👀 Makamesco is Online 🕸\n\n");
          console.log("🛒 Loading Makamesco Plugins...\n");
          fs.readdirSync(__dirname + "/plugins").forEach(_0x1db269 => {
            if (path.extname(_0x1db269).toLowerCase() == ".js") {
              try {
                require(__dirname + "/plugins/" + _0x1db269);
                console.log(_0x1db269 + "🛒🔑 Makamesco plugins Installed Successfully✔️");
              } catch (_0x575409) {
                console.log(_0x1db269 + " could not be installed due to : " + _0x575409);
              }
              0x0;
              baileys_1.delay(0x12c);
            }
          });
          0x0;
          baileys_1.delay(0x2bc);
          var _0x22c684;
          if (conf.MODE.toLocaleLowerCase() === 'yes') {
            _0x22c684 = "public";
          } else if (conf.MODE.toLocaleLowerCase() === 'no') {
            _0x22c684 = 'private';
          } else {
            _0x22c684 = "undefined";
          }
          console.log("🏆🗡️ Makamesco Plugins Installation Completed ✅");
          await _0xa947cd();
          if (conf.DP.toLowerCase() === 'yes') {
            let _0x3f1cb8 = "HELLO👋, BOT CONNECTED✅😇⁠⁠⁠⁠\n\n║ *『 " + conf.BOT + " IS ONLINE』*\n║    Creator: *" + conf.OWNER_NAME + "*\n║    Prefix : [  " + prefixe + " ]\n║    Mode : " + _0x22c684 + " mode\n║    Total Commands : " + evt.cm.length + "\n";
            await _0x248c95.sendMessage(_0x248c95.user.id, {
              'text': _0x3f1cb8
            });
          }
        } else {
          if (_0x2e53df == "close") {
            let _0x1bfe61 = new boom_1.Boom(_0x1a440b?.['error'])?.['output']["statusCode"];
            if (_0x1bfe61 === baileys_1.DisconnectReason.badSession) {
              console.log("Session id error, rescan again...");
            } else {
              if (_0x1bfe61 === baileys_1.DisconnectReason.connectionClosed) {
                console.log("!!! connection closed, reconnection in progress...");
                _0x37a412();
              } else {
                if (_0x1bfe61 === baileys_1.DisconnectReason.connectionLost) {
                  console.log("connection error 😞,,, trying to reconnect... ");
                  _0x37a412();
                } else {
                  if (_0x1bfe61 === baileys_1.DisconnectReason?.["connectionReplaced"]) {
                    console.log("connection replaced ,,, a session is already open please close it !!!");
                  } else {
                    if (_0x1bfe61 === baileys_1.DisconnectReason.loggedOut) {
                      console.log("you are disconnected,,, please rescan the qr code please");
                    } else {
                      if (_0x1bfe61 === baileys_1.DisconnectReason.restartRequired) {
                        console.log("reboot in progress ▶️");
                        _0x37a412();
                      } else {
                        console.log("redemarrage sur le coup de l'erreur  ", _0x1bfe61);
                        const {
                          exec: _0x312689
                        } = require("child_process");
                        _0x312689("pm2 restart all");
                      }
                    }
                  }
                }
              }
            }
            console.log("hum " + _0x2e53df);
            _0x37a412();
          }
        }
      }
    });
    _0x248c95.ev.on('creds.update', _0x250519);
    _0x248c95.downloadAndSaveMediaMessage = async (_0x308171, _0x484fc9 = '', _0x33cc1d = true) => {
      let _0x2c799f = _0x308171.msg ? _0x308171.msg : _0x308171;
      let _0x73311c = (_0x308171.msg || _0x308171).mimetype || '';
      let _0x276499 = _0x308171.mtype ? _0x308171.mtype.replace(/Message/gi, '') : _0x73311c.split('/')[0x0];
      0x0;
      const _0x53643b = await baileys_1.downloadContentFromMessage(_0x2c799f, _0x276499);
      let _0x2e5dfe = Buffer.from([]);
      for await (const _0x520f1f of _0x53643b) {
        _0x2e5dfe = Buffer.concat([_0x2e5dfe, _0x520f1f]);
      }
      let _0x30ca8f = await FileType.fromBuffer(_0x2e5dfe);
      let _0xbc7413 = './' + _0x484fc9 + '.' + _0x30ca8f.ext;
      await fs.writeFileSync(_0xbc7413, _0x2e5dfe);
      return _0xbc7413;
    };
    _0x248c95.awaitForMessage = async (_0x35f886 = {}) => {
      return new Promise((_0x5c1155, _0x1ee734) => {
        if (typeof _0x35f886 !== "object") {
          _0x1ee734(new Error("Options must be an object"));
        }
        if (typeof _0x35f886.sender !== "string") {
          _0x1ee734(new Error("Sender must be a string"));
        }
        if (typeof _0x35f886.chatJid !== "string") {
          _0x1ee734(new Error("ChatJid must be a string"));
        }
        if (_0x35f886.timeout && typeof _0x35f886.timeout !== "number") {
          _0x1ee734(new Error("Timeout must be a number"));
        }
        if (_0x35f886.filter && typeof _0x35f886.filter !== "function") {
          _0x1ee734(new Error("Filter must be a function"));
        }
        const _0x286508 = _0x35f886?.["timeout"] || undefined;
        const _0x44461e = _0x35f886?.["filter"] || (() => true);
        let _0x137cdf = undefined;
        let _0xb9000c = _0x4ece38 => {
          let {
            type: _0x5b30b5,
            messages: _0x2540fd
          } = _0x4ece38;
          if (_0x5b30b5 == "notify") {
            for (let _0x316a37 of _0x2540fd) {
              const _0x453802 = _0x316a37.key.fromMe;
              const _0x649619 = _0x316a37.key.remoteJid;
              const _0x49638e = _0x649619.endsWith("@g.us");
              const _0x2617e3 = _0x649619 == "status@broadcast";
              const _0x6d4c6f = _0x453802 ? _0x248c95.user.id.replace(/:.*@/g, '@') : _0x49638e || _0x2617e3 ? _0x316a37.key.participant.replace(/:.*@/g, '@') : _0x649619;
              if (_0x6d4c6f == _0x35f886.sender && _0x649619 == _0x35f886.chatJid && _0x44461e(_0x316a37)) {
                _0x248c95.ev.off('messages.upsert', _0xb9000c);
                clearTimeout(_0x137cdf);
                _0x5c1155(_0x316a37);
              }
            }
          }
        };
        _0x248c95.ev.on("messages.upsert", _0xb9000c);
        if (_0x286508) {
          _0x137cdf = setTimeout(() => {
            _0x248c95.ev.off('messages.upsert', _0xb9000c);
            _0x1ee734(new Error("Timeout"));
          }, _0x286508);
        }
      });
    };
    return _0x248c95;
  }
  let _0x597e8e = require.resolve(__filename);
  fs.watchFile(_0x597e8e, () => {
    fs.unwatchFile(_0x597e8e);
    console.log("mise à jour " + __filename);
    delete require.cache[_0x597e8e];
    require(_0x597e8e);
  });
  _0x37a412();
}, 0x1388);
