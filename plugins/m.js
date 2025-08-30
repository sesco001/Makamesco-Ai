const {
  ezra
} = require("../fredi/ezra");
const {
  Sticker,
  StickerTypes
} = require("wa-sticker-formatter");
const {
  ajouterOuMettreAJourJid,
  mettreAJourAction,
  verifierEtatJid
} = require("../lib/antilien");
const {
  atbajouterOuMettreAJourJid,
  atbverifierEtatJid
} = require("../lib/antibot");
const {
  search,
  download
} = require("aptoide-scraper");
const fs = require("fs-extra");
const {
  ajouterUtilisateurAvecWarnCount,
  getWarnCountByJID,
  resetWarnCountByJID
} = require("../lib/warn");
ezra({
  'nomCom': "antitag",
  'categorie': "Maka-Settings",
  'reaction': '⚙️'
}, async (_0x4a1746, _0xa927bb, _0x179395) => {
  const {
    repondre: _0x24427e,
    arg: _0x13b5e8,
    verifAdmin: _0x1b338f,
    superUser: _0x1a2b29
  } = _0x179395;
  if (!_0x1b338f && !_0x1a2b29) {
    return _0x24427e("maka Admin only command.");
  }
  let _0xada8e4 = {};
  if (fs.existsSync("./fredie/anti.json")) {
    _0xada8e4 = JSON.parse(fs.readFileSync("./fredie/anti.json"));
  }
  const _0x1eb601 = _0x13b5e8[0]?.["toLowerCase"]();
  if (!['on', "off"].includes(_0x1eb601)) {
    return _0x24427e("Usage: .antitag-system on/off");
  }
  _0xada8e4.ANTI_TAG = _0x1eb601;
  fs.writeFileSync("./fredie/anti.json", JSON.stringify(_0xada8e4, null, 2));
  _0x24427e("✅ MAKA ANTI_TAG mode is now: " + _0x1eb601);
});
ezra({
  'nomCom': "antimentiongroup",
  'categorie': "Maka-Settings",
  'reaction': '⚙️'
}, async (_0x32d001, _0x3aa813, _0x45f4c0) => {
  const {
    repondre: _0x1702e0,
    arg: _0x32c78c,
    verifAdmin: _0x456c02,
    superUser: _0x25eb30
  } = _0x45f4c0;
  if (!_0x456c02 && !_0x25eb30) {
    return _0x1702e0("⛔ Admin only command.");
  }
  let _0x3cb779 = {};
  if (fs.existsSync("./fredie/anti.json")) {
    _0x3cb779 = JSON.parse(fs.readFileSync("./fredie/anti.json"));
  }
  const _0x50108d = _0x32c78c[0]?.["toLowerCase"]();
  if (!['on', "off"].includes(_0x50108d)) {
    return _0x1702e0("📌 Usage: .antimentiongroup on/off");
  }
  _0x3cb779.ANTI_MENTION_GROUP = _0x50108d;
  fs.writeFileSync("./fredie/anti.json", JSON.stringify(_0x3cb779, null, 2));
  _0x1702e0("✅ MAKA ANTI_MENTION_GROUP is now: *" + _0x50108d.toUpperCase() + '*');
});
ezra({
  'nomCom': "anti-link",
  'categorie': "Fredi-Settings",
  'reaction': '⚙️'
}, async (_0x3e3187, _0x5b24a0, {
  repondre: _0x5522de,
  arg: _0x26bc0a,
  verifAdmin: _0x4606c4,
  superUser: _0x269d9e
}) => {
  if (!_0x4606c4 && !_0x269d9e) {
    return _0x5522de("⛔ Admin only command.");
  }
  if (!_0x26bc0a[0] || !['on', "off"].includes(_0x26bc0a[0].toLowerCase())) {
    return _0x5522de("📌 Usage: .anti-link on/off");
  }
  if (_0x26bc0a[0].toLowerCase() === "off") {
    antilinkConfig.ANTI_LINK_GROUP = {
      'status': "off"
    };
    fs.writeFileSync("./fredie/anti.json", JSON.stringify(antilinkConfig, null, 2));
    return _0x5522de("✅ Anti-Link turned OFF.");
  }
  _0x5522de("⚙️ Choose Anti-Link Action:\n\n1 Delete Message\n2 Warn (5 warns = remove)\n3 Remove instantly\n\n_Reply with number_");
  _0x5b24a0.ev.once("messages.upsert", async ({
    messages: _0x372734
  }) => {
    const _0x210f9f = _0x372734[0];
    const _0x247a50 = _0x210f9f.message?.["conversation"]?.["trim"]();
    let _0xd26209;
    if (_0x247a50 === '1') {
      _0xd26209 = "delete";
    }
    if (_0x247a50 === '2') {
      _0xd26209 = "warn";
    }
    if (_0x247a50 === '3') {
      _0xd26209 = "remove";
    }
    if (!_0xd26209) {
      return _0x5522de("❌ Invalid choice.");
    }
    antilinkConfig.ANTI_LINK_GROUP = {
      'status': 'on',
      'action': _0xd26209,
      'reportTo': _0x3e3187
    };
    fs.writeFileSync("./fredie/anti.json", JSON.stringify(antilinkConfig, null, 2));
    _0x5522de("✅ Anti-Link turned ON with action: *" + _0xd26209.toUpperCase() + '*');
  });
});
ezra({
  'nomCom': "antishare",
  'categorie': "Maka-Settings",
  'reaction': '⚙️'
}, async (_0x46dda2, _0x463d3d, _0x43890e) => {
  const {
    repondre: _0x1d81a1,
    arg: _0x3873d0,
    verifAdmin: _0x593e39,
    superUser: _0x4f5879
  } = _0x43890e;
  if (!_0x593e39 && !_0x4f5879) {
    return _0x1d81a1("⛔ Admin only command.");
  }
  let _0x549293 = {};
  if (fs.existsSync("./fredie/anti.json")) {
    _0x549293 = JSON.parse(fs.readFileSync("./fredie/anti.json"));
  }
  const _0x5d3996 = _0x3873d0[0]?.["toLowerCase"]();
  if (!['on', "off"].includes(_0x5d3996)) {
    return _0x1d81a1("📌 Usage: .antisharegroup on/off");
  }
  _0x549293.ANTI_SHARE_GROUP = _0x5d3996;
  fs.writeFileSync("./fredie/anti.json", JSON.stringify(_0x549293, null, 2));
  _0x1d81a1("✅ LUCKY XFORCE ANTI_SHARE_GROUP is now: *" + _0x5d3996.toUpperCase() + '*');
});
