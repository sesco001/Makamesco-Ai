const { ezra } = require('../fredi/ezra');
const axios = require('axios');
const ytSearch = require('yt-search');

// PrinceTech YT-MP3 API client
const princeApi = {
  base: 'https://api.princetechn.com/api',
  key: 'makamesco-md'
};

ezra({
  nomCom: "play",
  aliases: ["song", "playdoc", "audio", "mp3"],
  categorie: "Download",
  reaction: '🎧'
}, async (dest, zk, commandOptions) => {
  const { arg, ms, repondre } = commandOptions;

  if (!arg[0]) return repondre("Please provide a song name.");

  const query = arg.join(" ");

  try {
    // Search YouTube
    const searchResults = await ytSearch(query);
    if (!searchResults || !searchResults.videos.length) {
      return repondre("No song found for the specified query.");
    }

    const video = searchResults.videos[0];
    const videoUrl = video.url;

    // fetch helper
    const getDownloadData = async (url) => {
      try {
        const response = await axios.get(url);
        return response.data;
      } catch (error) {
        console.error("Error fetching data from API:", error);
        return null;
      }
    };

    // ✅ APIs list, Keith added
    const apis = [
      `https://api-rin-tohsaka.vercel.app/download/ytmp4?url=${encodeURIComponent(videoUrl)}`,
      `https://apis.davidcyriltech.my.id/download/ytmp3?url=${encodeURIComponent(videoUrl)}`,
      `https://www.dark-yasiya-api.site/download/ytmp3?url=${encodeURIComponent(videoUrl)}`,
      `https://api.giftedtech.web.id/api/download/dlmp3?url=${encodeURIComponent(videoUrl)}&apikey=gifted-md`,
      `https://api.dreaded.site/api/ytdl/audio?url=${encodeURIComponent(videoUrl)}`,
      `https://apis-keith.vercel.app/download/dlmp3?url=${encodeURIComponent(videoUrl)}`
    ];

    let finalData = null;

    for (const api of apis) {
      let res = await getDownloadData(api);
      if (!res) continue;

      // ✅ normalize different API formats
      if (res.success && res.result && res.result.download_url) {
        finalData = {
          download_url: res.result.download_url,
          title: res.result.title || video.title,
        };
        break;
      } else if (res.status && res.result && (res.result.link || res.result.url)) {
        finalData = {
          download_url: res.result.link || res.result.url,
          title: res.result.title || video.title,
        };
        break;
      }
    }

    if (!finalData) {
      return repondre("Failed to retrieve download URL. Please try again later.");
    }

    // ✅ Safe values
    const downloadUrl = finalData.download_url;
    const videoTitle = finalData.title;

    const messagePayloads = [
      {
        caption: `\n*Makamesco MD AUDIOS*\n
╭┈┈┈⊷
┊ *Made:* in 🇰🇪 
┊ *Quality:* High
┊ *Powered:* by marcas
╰┈┈┈┈┈┈┈┈┈┈┈┈⊷
🌐 *Bot Repo:* https://github.com/sesco001/Makamesco_md

> regards frediezra`,
        audio: { url: downloadUrl },
        mimetype: "audio/mp4",
        contextInfo: {
          externalAdReply: {
            title: conf.BOT,
            body: videoTitle,
            mediaType: 1,
            sourceUrl: conf.GURL,
            thumbnailUrl: video.thumbnail,
            renderLargerThumbnail: false,
            showAdAttribution: true,
          },
        },
      }
    ];

    for (const payload of messagePayloads) {
      await zk.sendMessage(dest, payload, { quoted: ms });
    }

  } catch (error) {
    console.error("Error during download process:", error);
    return repondre(`Download failed: ${error.message || error}`);
  }
});
