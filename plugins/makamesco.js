const { ezra } = require("../fredi/ezra");

ezra({
  commandName: "boost",
  reaction: '⚡',
  category: "VIP"
}, async (client, message, args) => {
  const { reply } = args;

  try {
    await reply(`╔═══════════════════════╗
     ⚡ *MAKAMESCO BOOST PANEL* ⚡
╚═══════════════════════╝

❓ *Do you have a Makamesco Digital account?*

✅ *YES?*
🔗 Visit: https://Makamescodigitalsolutions.com
🔐 Login and choose your package.
🚀 Start boosting your:
   ▸ Followers 👥
   ▸ Views 👀
   ▸ Likes ❤️
   ▸ Comments 💬
   ▸ Subscribers 🔔
   ▸ And much more!

❌ *NO?*
🔗 Go to: https://Makamescodigitalsolutions.com
🆕 Tap on "Create Account"
🎥 Watch the tutorial:
▶️ https://youtu.be/Y0FiyP91NS4?si=NUsj4FQ2vIRUTz1B

💰 Affordable tools available!
💎 Premium offers also ready!

📞 *Need help or facing any difficulties?*
📲 Reach us via WhatsApp:
   ▸ +254769995625
   ▸ +254739285768

🛠️ *Need a website like this?*
💻 We also offer *custom web development.*
📍 Get in touch for your project today!

━━━━━━━━━━━━━━━━━━━━
🌐 Makamesco Digital Solutions – *Get Discovered Instantly!*
━━━━━━━━━━━━━━━━━━━━`);
  } catch (error) {
    console.error("Error handling boost command:", error.message);
    reply("❌ Oops! Something went wrong. Visit https://Makamescodigitalsolutions.com or reach support via WhatsApp at +254769995625.");
  }
});
