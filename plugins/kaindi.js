const util = require('util');
const fs = require('fs-extra');
const { ezra } = require(__dirname + "/../fredi/ezra");
const { format } = require(__dirname + "/../fredi/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)

ezra({ nomCom: "boost", categorie: "Islam" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre, mybotpic } = commandeOptions;
    let { cm } = require(__dirname + "/../fredi/ezra");
    var coms = {};
    var mode = "public";

    if ((s.MODE).toLocaleLowerCase() != "yes") {
        mode = "private";
    }

    cm.map((com) => {
        if (!coms[com.categorie]) coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('Etc/GMT');
    const temps = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');

    let infoMsg = `
╔═══════════════════════╗
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
📲 WhatsApp:
   ▸ +254769995625
   ▸ +254739285768

🛠️ *Want a website like this?*
💻 We offer *professional web development*.

━━━━━━━━━━━━━━━━━━━━
🌐 Makamesco Digital Solutions – *Get Discovered Instantly!*
━━━━━━━━━━━━━━━━━━━━
`;

    let menuMsg = `
Mode: *${mode.toUpperCase()}*
Date: *${date}*
Time: *${temps}*
RAM Usage: *${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}*
`;

    var lien = mybotpic();

    if (lien.match(/\.(mp4|gif)$/i)) {
        try {
            zk.sendMessage(
                dest,
                {
                    video: { url: lien },
                    caption: infoMsg + menuMsg,
                    footer: "Powered by Makamesco Digital",
                    gifPlayback: true
                },
                { quoted: ms }
            );
        } catch (e) {
            console.log("🥵 Menu error " + e);
            repondre("🥵 Menu error " + e);
        }
    } else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
        try {
            zk.sendMessage(
                dest,
                {
                    image: { url: lien },
                    caption: infoMsg + menuMsg,
                    footer: "Powered by Makamesco Digital"
                },
                { quoted: ms }
            );
        } catch (e) {
            console.log("🥵 Menu error " + e);
            repondre("🥵 Menu error " + e);
        }
    } else {
        repondre(infoMsg + menuMsg);
    }
});
