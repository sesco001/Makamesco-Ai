const { ezra } = require("../fredi/ezra");
const fs = require("fs-extra");
const path = require("path");

const dataFile = path.join(__dirname, "../fredie/antisticker.json");

function loadData() {
  try { return JSON.parse(fs.readFileSync(dataFile, "utf8")); }
  catch { return {}; }
}
function saveData(data) {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
}
if (!fs.existsSync(dataFile)) saveData({});

ezra({ nomCom: "antisticker", categorie: "Group", reaction: "🚫" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg, verifGroupe, verifAdmin, superUser } = commandeOptions;

  if (!verifGroupe) return repondre("⚠️ This command is for groups only.");
  if (!verifAdmin && !superUser) return repondre("⚠️ This command is reserved for admins.");

  const data = loadData();

  if (!arg || !arg[0]) {
    const status = data[dest] ? "✅ *ON*" : "❌ *OFF*";
    return repondre(
      `*━━━『 ANTISTICKER 』━━━*\n\nCurrent status: ${status}\n\nUsage:\n• *antisticker on* — block stickers\n• *antisticker off* — allow stickers\n\n_Powered by MAKAMESCO-MD_`
    );
  }

  const option = arg[0].toLowerCase();

  if (option === "on") {
    if (data[dest]) return repondre("✅ AntiSticker is already *ON* for this group.");
    data[dest] = true;
    saveData(data);
    repondre("✅ *AntiSticker activated!*\nStickers will now be deleted from this group.");
  } else if (option === "off") {
    if (!data[dest]) return repondre("❌ AntiSticker is already *OFF* for this group.");
    delete data[dest];
    saveData(data);
    repondre("❌ *AntiSticker deactivated!*\nStickers are now allowed in this group.");
  } else {
    repondre("Invalid option. Use: *antisticker on* or *antisticker off*");
  }
});

ezra({ nomCom: "groupstatus", categorie: "Group", reaction: "📊" }, async (dest, zk, commandeOptions) => {
  const { repondre, verifGroupe, infosGroupe } = commandeOptions;

  if (!verifGroupe) return repondre("⚠️ This command is for groups only.");

  try {
    const info = await zk.groupMetadata(dest);
    const total = info.participants.length;
    const admins = info.participants.filter(p => p.admin).length;
    const members = total - admins;
    const isLocked = info.announce ? "🔒 Closed (Only admins can send)" : "🔓 Open (Everyone can send)";
    const isRestricted = info.restrict ? "🔒 Only admins can edit" : "🔓 Anyone can edit";

    let ppgroup;
    try { ppgroup = await zk.profilePictureUrl(dest, "image"); }
    catch { ppgroup = null; }

    const createdDate = info.creation
      ? new Date(info.creation * 1000).toLocaleDateString("en-KE", { timeZone: "Africa/Nairobi" })
      : "Unknown";

    const statusMsg =
      `*━━━『 GROUP STATUS 』━━━*\n\n` +
      `📛 *Name:* ${info.subject}\n` +
      `🆔 *ID:* ${dest}\n` +
      `📅 *Created:* ${createdDate}\n\n` +
      `👥 *Members:* ${total}\n` +
      `👑 *Admins:* ${admins}\n` +
      `👤 *Regular:* ${members}\n\n` +
      `💬 *Messaging:* ${isLocked}\n` +
      `✏️ *Settings:* ${isRestricted}\n\n` +
      `📝 *Description:*\n${info.desc || "No description set"}\n\n` +
      `_Powered by MAKAMESCO-MD_`;

    if (ppgroup) {
      await zk.sendMessage(dest, { image: { url: ppgroup }, caption: statusMsg });
    } else {
      repondre(statusMsg);
    }
  } catch (e) {
    repondre("❌ Error fetching group status: " + e.message);
  }
});

module.exports = { loadData };
