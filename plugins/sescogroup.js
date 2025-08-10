const {
  ezra
} = require("../fredi/ezra");
const {
  downloadMediaMessage,
  downloadContentFromMessage
} = require("@whiskeysockets/baileys");
ezra({
  'nomCom': "broadcast",
  'aliase': "spread",
  'categorie': "Makamesco-Group",
  'reaction': '⚪'
}, async (_0x3a9780, _0x8d12f2, _0xd2ef18) => {
  const {
    arg: _0x36d7a5,
    repondre: _0x42a6f1,
    superUser: _0x395fec,
    nomAuteurMessage: _0x4ccff3
  } = _0xd2ef18;
  if (!_0x36d7a5[0]) {
    return _0x42a6f1("After the command *broadcast*, type your message to be sent to all groups you are in.");
  }
  if (!_0x395fec) {
    return _0x42a6f1("You are too weak to do that");
  }
  const _0x2836e3 = await _0x8d12f2.groupFetchAllParticipating();
  const _0x3696fa = Object.values(_0x2836e3).map(_0x21d6d1 => _0x21d6d1.id);
  await _0x42a6f1("*💦 Makamesco XMD 💨 is sending your message to all groups ,,,💦*...");
  const _0x309782 = "*🌟 Makamesco xmd BROADCAST🌟*\n\n🀄 Message: " + _0x36d7a5.join(" ") + "\n\n🗣️ Author: " + _0x4ccff3;
  for (let _0x2e94c7 of _0x3696fa) {
    await _0x8d12f2.sendMessage(_0x2e94c7, {
      'image': {
        'url': "https://files.catbox.moe/uxihoo.jpg"
      },
      'caption': _0x309782
    });
  }
});
const handleDisapCommand = async (_0x33d435, _0x55744d, _0xb3bb05, _0x20eee4) => {
  const {
    repondre: _0x125a96,
    verifGroupe: _0x4caced,
    verifAdmin: _0x200002
  } = _0xb3bb05;
  if (!_0x4caced) {
    return _0x125a96("This command works in groups only");
  }
  if (!_0x200002) {
    return _0x125a96("You are not an admin here!");
  }
  await _0x55744d.groupToggleEphemeral(_0x33d435, _0x20eee4);
  _0x125a96("Disappearing messages successfully turned on for " + _0x20eee4 / 86400 + " day(s)!");
};
ezra({
  'nomCom': "disap-off",
  'categorie': "Makamesco-Group",
  'reaction': '💦'
}, async (_0xf595c9, _0x31e6cb, _0x2dc61a) => {
  const {
    repondre: _0x502a7a,
    verifGroupe: _0x1c6217,
    verifAdmin: _0x11bb0a
  } = _0x2dc61a;
  if (!_0x1c6217) {
    return _0x502a7a("This command works in groups only");
  }
  if (!_0x11bb0a) {
    return _0x502a7a("You are not an admin here!");
  }
  await _0x31e6cb.groupToggleEphemeral(_0xf595c9, 0);
  _0x502a7a("Disappearing messages successfully turned off!");
});
ezra({
  'nomCom': "disap",
  'categorie': "Makamesco-Group",
  'reaction': '💦'
}, async (_0x2a30ad, _0x41fac0, _0x1410a6) => {
  const {
    repondre: _0x551b36,
    verifGroupe: _0x444061,
    verifAdmin: _0x596ebf
  } = _0x1410a6;
  if (!_0x444061) {
    return _0x551b36("This command works in groups only");
  }
  if (!_0x596ebf) {
    return _0x551b36("You are not an admin here!");
  }
  _0x551b36("*Do you want to turn on disappearing messages?*\n\nType one of the following:\n*disap1* for 1 day\n*disap7* for 7 days\n*disap90* for 90 days\nOr type *disap-off* to turn it off.");
});
ezra({
  'nomCom': "disap1",
  'categorie': "Makamesco-Group",
  'reaction': '⚪'
}, async (_0x514ef5, _0x380d67, _0x151ec7) => {
  handleDisapCommand(_0x514ef5, _0x380d67, _0x151ec7, 86400);
});
ezra({
  'nomCom': "disap7",
  'categorie': "Makamesco-Group",
  'reaction': '⚪'
}, async (_0x272ee8, _0x4618e9, _0xc3af97) => {
  handleDisapCommand(_0x272ee8, _0x4618e9, _0xc3af97, 604800);
});
ezra({
  'nomCom': "disap90",
  'categorie': "Makamesco-Group",
  'reaction': '⚪'
}, async (_0x12e857, _0x2e8aca, _0x53cca0) => {
  handleDisapCommand(_0x12e857, _0x2e8aca, _0x53cca0, 7776000);
});
ezra({
  'nomCom': "req",
  'alias': "requests",
  'categorie': "Makamesco-Group",
  'reaction': '⚪'
}, async (_0xf04b64, _0x43b6c0, _0x23e37a) => {
  const {
    repondre: _0x334f1f,
    verifGroupe: _0x49d889,
    verifAdmin: _0x1c792f
  } = _0x23e37a;
  if (!_0x49d889) {
    return _0x334f1f("This command works in groups only");
  }
  if (!_0x1c792f) {
    return _0x334f1f("You are not an admin here!");
  }
  const _0x964a28 = await _0x43b6c0.groupRequestParticipantsList(_0xf04b64);
  if (_0x964a28.length === 0) {
    return _0x334f1f("There are no pending join requests.");
  }
  let _0x278cc9 = _0x964a28.map(_0x445c04 => '+' + _0x445c04.jid.split('@')[0]).join("\n");
  await _0x43b6c0.sendMessage(_0xf04b64, {
    'text': "Pending Participants:- 🕓\n" + _0x278cc9 + "\n\nUse the command approve or reject to approve or reject these join requests."
  });
  _0x334f1f(_0x278cc9);
});
const handleRequestCommand = async (_0xa77708, _0x4c812c, _0x1cf160, _0x3f1ede) => {
  const {
    repondre: _0x1a8077,
    verifGroupe: _0x2dcdba,
    verifAdmin: _0x413ac9
  } = _0x1cf160;
  if (!_0x2dcdba) {
    return _0x1a8077("This command works in groups only");
  }
  if (!_0x413ac9) {
    return _0x1a8077("You are not an admin here!");
  }
  const _0x180aa2 = await _0x4c812c.groupRequestParticipantsList(_0xa77708);
  if (_0x180aa2.length === 0) {
    return _0x1a8077("There are no pending join requests for this group.");
  }
  for (const _0xa1d400 of _0x180aa2) {
    await _0x4c812c.groupRequestParticipantsUpdate(_0xa77708, [_0xa1d400.jid], _0x3f1ede);
  }
  _0x1a8077("All pending join requests have been " + (_0x3f1ede === "approve" ? "approved" : "rejected") + '.');
};
ezra({
  'nomCom': "approve",
  'categorie': "Makamesco-Group",
  'reaction': '⚪'
}, (_0x55c7a6, _0x32ca34, _0x3df3e8) => handleRequestCommand(_0x55c7a6, _0x32ca34, _0x3df3e8, "approve"));
ezra({
  'nomCom': "reject",
  'categorie': "Makamesco-Group",
  'reaction': '⚪'
}, (_0x3d080e, _0x1b64b4, _0x2a76fd) => handleRequestCommand(_0x3d080e, _0x1b64b4, _0x2a76fd, "reject"));
