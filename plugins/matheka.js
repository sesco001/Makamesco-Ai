const { ezra } = require("../fredi/ezra");

ezra({
  commandName: "boost",
  aliases: ["session", "pair", "paircode", "qrcode"],
  reaction: '⚡',
  category: "General"
}, async (client, message, args) => {
  const { reply } = args;

  try {
    await reply(`❓ *Do you have a Makamesco Digital account?*

If *YES* ✅:
🔸 Visit: https://Makamescodigitalsolutions.com
🔸 Login and choose your package.
🔸 Start boosting your *followers, views, likes,* and more instantly!

If *NO* ❌:
🔸 Go to: https://Makamescodigitalsolutions.com
🔸 Tap on "Create Account".
🔸 Follow the video tutorial and start gaining reach.

📌 All tools are free to try. Premium offers available.

🆘 Need help? Visit the site and click *Support*.`);
  } catch (error) {
    console.error("Error handling pair command:", error.message);
    reply("❌ Oops! Something went wrong. Visit https://Makamescodigitalsolutions.com for assistance.");
  }
});
