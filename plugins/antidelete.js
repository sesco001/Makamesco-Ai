const fs = require('fs');
const path = require('path');
const {
  downloadContentFromMessage
} = require("@whiskeysockets/baileys");
const {
  writeFile
} = require("fs/promises");
const messageStore = new Map();
const CONFIG_PATH = path.join(__dirname, "../data/antidelete.json");
const TEMP_MEDIA_DIR = path.join(__dirname, '../tmp');
if (!fs.existsSync(TEMP_MEDIA_DIR)) {
  fs.mkdirSync(TEMP_MEDIA_DIR, {
    'recursive': true
  });
}
const getFolderSizeInMB = _0x426649 => {
  try {
    const _0x2cb822 = fs.readdirSync(_0x426649);
    let _0x3b116f = 0;
    for (const _0x4845b1 of _0x2cb822) {
      const _0x58990e = path.join(_0x426649, _0x4845b1);
      if (fs.statSync(_0x58990e).isFile()) {
        _0x3b116f += fs.statSync(_0x58990e).size;
      }
    }
    return _0x3b116f / 1048576;
  } catch {
    return 0;
  }
};
const cleanTempFolderIfLarge = () => {
  try {
    const _0x286683 = getFolderSizeInMB(TEMP_MEDIA_DIR);
    if (_0x286683 > 100) {
      const _0x4a4be6 = fs.readdirSync(TEMP_MEDIA_DIR);
      for (const _0x45961d of _0x4a4be6) {
        fs.unlinkSync(path.join(TEMP_MEDIA_DIR, _0x45961d));
      }
    }
  } catch (_0xf9f743) {
    console.error("Temp cleanup error:", _0xf9f743);
  }
};
setInterval(cleanTempFolderIfLarge, 60000);
function loadAntideleteConfig() {
  try {
    if (!fs.existsSync(CONFIG_PATH)) {
      return {
        'enabled': false,
        'mode': 'private'
      };
    }
    return JSON.parse(fs.readFileSync(CONFIG_PATH));
  } catch {
    return {
      'enabled': false,
      'mode': 'private'
    };
  }
}
function saveAntideleteConfig(_0x33e278) {
  try {
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(_0x33e278, null, 2));
  } catch (_0x2e8330) {
    console.error("Config save error:", _0x2e8330);
  }
}
async function handleAntideleteCommand(_0x2fde82, _0x2ae3d5, _0xc29bf5, _0x38dac4) {
  if (!_0xc29bf5.key.fromMe) {
    return _0x2fde82.sendMessage(_0x2ae3d5, {
      'text': "Only the bot owner can use this command."
    });
  }
  const _0x28954f = loadAntideleteConfig();
  if (!_0x38dac4) {
    return _0x2fde82.sendMessage(_0x2ae3d5, {
      'text': "*ANTIDELETE SETUP*\n\nCurrent: " + (_0x28954f.enabled ? "💠 ON" : "💨 OFF") + "\nMode: " + (_0x28954f.mode || "private") + "\n\n*.antidelete all* – Send to chat\n*.antidelete private* – Send to inbox\n*.antidelete off* – Disable"
    });
  }
  if (_0x38dac4 === 'off') {
    _0x28954f.enabled = false;
  } else {
    if (_0x38dac4 === 'all' || _0x38dac4 === 'private') {
      _0x28954f.enabled = true;
      _0x28954f.mode = _0x38dac4;
    } else {
      return _0x2fde82.sendMessage(_0x2ae3d5, {
        'text': "*🙂 Invalid command.*"
      });
    }
  }
  saveAntideleteConfig(_0x28954f);
  await _0x2fde82.sendMessage(_0x2ae3d5, {
    'text': "💠 *Antidelete " + (_0x38dac4 === 'off' ? 'disabled' : "enabled in " + _0x38dac4 + " mode") + '!*'
  });
}
async function storeMessage(_0x1f9dcc) {
  const _0x4720a4 = loadAntideleteConfig();
  if (!_0x4720a4.enabled || !_0x1f9dcc.key?.['id']) {
    return;
  }
  const _0x458653 = _0x1f9dcc.key.id;
  let _0x1f37d4 = '';
  let _0x3a3994 = '';
  let _0x4045f9 = '';
  const _0x3412ae = _0x1f9dcc.key.participant || _0x1f9dcc.key.remoteJid;
  try {
    if (_0x1f9dcc.message?.["conversation"]) {
      _0x1f37d4 = _0x1f9dcc.message.conversation;
    } else {
      if (_0x1f9dcc.message?.["extendedTextMessage"]?.["text"]) {
        _0x1f37d4 = _0x1f9dcc.message.extendedTextMessage.text;
      } else {
        if (_0x1f9dcc.message?.["imageMessage"]) {
          _0x3a3994 = 'image';
          _0x1f37d4 = _0x1f9dcc.message.imageMessage.caption || '';
          const _0x3d37bf = await downloadContentFromMessage(_0x1f9dcc.message.imageMessage, 'image');
          _0x4045f9 = path.join(TEMP_MEDIA_DIR, _0x458653 + '.jpg');
          await writeFile(_0x4045f9, _0x3d37bf);
        } else {
          if (_0x1f9dcc.message?.["stickerMessage"]) {
            _0x3a3994 = 'sticker';
            const _0x1151a2 = await downloadContentFromMessage(_0x1f9dcc.message.stickerMessage, 'sticker');
            _0x4045f9 = path.join(TEMP_MEDIA_DIR, _0x458653 + '.webp');
            await writeFile(_0x4045f9, _0x1151a2);
          } else {
            if (_0x1f9dcc.message?.["videoMessage"]) {
              _0x3a3994 = 'video';
              _0x1f37d4 = _0x1f9dcc.message.videoMessage.caption || '';
              const _0xd99de = await downloadContentFromMessage(_0x1f9dcc.message.videoMessage, 'video');
              _0x4045f9 = path.join(TEMP_MEDIA_DIR, _0x458653 + '.mp4');
              await writeFile(_0x4045f9, _0xd99de);
            }
          }
        }
      }
    }
    messageStore.set(_0x458653, {
      'content': _0x1f37d4,
      'mediaType': _0x3a3994,
      'mediaPath': _0x4045f9,
      'sender': _0x3412ae,
      'group': _0x1f9dcc.key.remoteJid.endsWith("@g.us") ? _0x1f9dcc.key.remoteJid : null,
      'timestamp': new Date().toISOString()
    });
  } catch (_0x518401) {
    console.error("storeMessage error:", _0x518401);
  }
}
async function handleMessageRevocation(_0x46dcb3, _0x4a0ee2) {
  const _0x2949b1 = loadAntideleteConfig();
  if (!_0x2949b1.enabled) {
    return;
  }
  try {
    const _0x2d71ff = _0x4a0ee2.message?.["protocolMessage"]?.['key']?.['id'];
    if (!_0x2d71ff) {
      return;
    }
    const _0x5bde68 = _0x4a0ee2.participant || _0x4a0ee2.key.participant || _0x4a0ee2.key.remoteJid;
    const _0x3de779 = _0x46dcb3.user.id.split(':')[0] + "@s.whatsapp.net";
    if (_0x5bde68.includes(_0x46dcb3.user.id) || _0x5bde68 === _0x3de779) {
      return;
    }
    const _0x11772a = messageStore.get(_0x2d71ff);
    if (!_0x11772a) {
      return;
    }
    const _0xaba56b = _0x11772a.sender;
    const _0xe8fac0 = _0xaba56b.split('@')[0];
    const _0x51bab5 = _0x11772a.group ? (await _0x46dcb3.groupMetadata(_0x11772a.group)).subject : '';
    const _0x435f04 = new Date().toLocaleString('en-US', {
      'timeZone': "Africa/Nairobi",
      'hour12': true,
      'hour': '2-digit',
      'minute': '2-digit',
      'second': '2-digit',
      'day': '2-digit',
      'month': '2-digit',
      'year': "numeric"
    });
    const _0x4c00f5 = _0x2949b1.mode === 'private' ? _0x3de779 : _0x11772a.group || _0xaba56b;
    let _0x5184ff = "*💠 ANTIDELETE ALERT 💠*\n\n" + ("*🗑️ Deleted By:* @" + _0x5bde68.split('@')[0] + "\n") + ("*💠 Sender:* @" + _0xe8fac0 + "\n") + ("*💠 Time:* " + _0x435f04 + "\n");
    if (_0x51bab5) {
      _0x5184ff += "*👥 Group:* " + _0x51bab5 + "\n";
    }
    if (_0x11772a.content) {
      _0x5184ff += "\n*💬 Message:*\n" + _0x11772a.content;
    }
    await _0x46dcb3.sendMessage(_0x4c00f5, {
      'text': _0x5184ff,
      'mentions': [_0x5bde68, _0xaba56b]
    });
    if (_0x11772a.mediaType && fs.existsSync(_0x11772a.mediaPath)) {
      const _0x3bca6c = {
        'caption': "*🗑️ Deleted " + _0x11772a.mediaType + "*\nFrom: @" + _0xe8fac0,
        'mentions': [_0xaba56b]
      };
      switch (_0x11772a.mediaType) {
        case 'image':
          await _0x46dcb3.sendMessage(_0x4c00f5, {
            'image': {
              'url': _0x11772a.mediaPath
            },
            ..._0x3bca6c
          });
          break;
        case 'video':
          await _0x46dcb3.sendMessage(_0x4c00f5, {
            'video': {
              'url': _0x11772a.mediaPath
            },
            ..._0x3bca6c
          });
          break;
        case "sticker":
          await _0x46dcb3.sendMessage(_0x4c00f5, {
            'sticker': {
              'url': _0x11772a.mediaPath
            },
            ..._0x3bca6c
          });
          break;
      }
      fs.unlinkSync(_0x11772a.mediaPath);
    }
    messageStore['delete'](_0x2d71ff);
  } catch (_0x47d912) {
    console.error("handleMessageRevocation error:", _0x47d912);
  }
}
module.exports = {
  'handleAntideleteCommand': handleAntideleteCommand,
  'handleMessageRevocation': handleMessageRevocation,
  'storeMessage': storeMessage
};
