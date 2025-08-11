const { ezra } = require(__dirname + '/../fredi/ezra');
const axios = require("axios");
const fs = require('fs-extra');
const { mediafireDl } = require("../fredi/dl/Function");
const conf = require(__dirname + "/../set");

ezra(
  {
    nomCom: "steal",
    aliases: ["zip", "clone"],
    categorie: "download"
  },
  async (dest, zk, context) => {
    const { ms, repondre, arg } = context;
    const githubLink = arg.join(" ");

    // Check if the GitHub link is provided and valid
    if (!githubLink || !githubLink.includes("github.com")) {
      return repondre("🔗 Please provide a valid GitHub repository link.");
    }

    // Extract owner and repo from the GitHub URL using a regex pattern
    let [, owner, repo] =
      githubLink.match(/(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i) || [];

    if (!owner || !repo) {
      return repondre("⚠️ Could not extract owner and repository name.");
    }

    // Remove the .git suffix from the repo name if present
    repo = repo.replace(/\.git$/, "");

    // GitHub API URL for the zipball
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/zipball`;

    try {
      // Get file metadata
      const response = await axios.head(apiUrl);
      const fileName =
        response.headers["content-disposition"]
          ?.match(/attachment; filename="?(.+?)"?$/)?.[1] || `${repo}`;

      // Send the zip file as a document
      await zk.sendMessage(
        dest,
        {
          document: { url: apiUrl },
          fileName: `${fileName}`,
          mimetype: "application/zip",
          caption: `📦 GitHub Zip by MAKAMESCO-𝐗𝐌𝐃`,
          contextInfo: {
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: "120363418628641913@newsletter", // Yours
              newsletterName: "MAKAMESCO-𝐗𝐌𝐃",
              serverMessageId: 1,
            },
          },
        },
        { quoted: ms }
      );
    } catch (error) {
      console.error(error);
      repondre("❌ Failed to fetch GitHub repository zip.");
    }
  }
);
