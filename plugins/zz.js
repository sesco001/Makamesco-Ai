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
    const searchResults = await ytSearch(query);
    if (!searchResults || !searchResults.videos.length) {
      return repondre("No song found for the specified query.");
    }

    const video = searchResults.videos[0];
    const videoUrl = video.url;

    const getDownloadData = async (url) => {
      try {
        const response = await axios.get(url);
        return response.data;
      } catch (error) {
        console.error("Error fetching data from API:", error);
        return { success: false };
      }
    };

    // ✅ Your framework, only Keith added at bottom
    const apis = [
      `https://api-rin-tohsaka.vercel.app/download/ytmp4?url=${encodeURIComponent(videoUrl)}`,
      `https://apis.davidcyriltech.my.id/download/ytmp3?url=${encodeURIComponent(videoUrl)}`,
      `https://www.dark-yasiya-api.site/download/ytmp3?url=${encodeURIComponent(videoUrl)}`,
      `https://api.giftedtech.web.id/api/download/dlmp3?url=${encodeURIComponent(videoUrl)}&apikey=gifted-md`,
      `https://api.dreaded.site/api/ytdl/audio?url=${encodeURIComponent(videoUrl)}`,
      `https://apis-keith.vercel.app/download/dlmp3?url=${encodeURIComponent(videoUrl)}`
    ];

    let downloadData;
    for (const api of apis) {
      downloadData = await getDownloadData(api);
      if (downloadData && downloadData.success) break;
    }

    if (!downloadData || !downloadData.success) {
      return repondre("Failed to retrieve download URL. Please try again later.");
    }

    const downloadUrl = downloadData.result.download_url;
    const videoDetails = downloadData.result;

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
            body: videoDetails.title,
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
    return repondre(`Download failed due to an error: ${error.message || error}`);
  }
});
