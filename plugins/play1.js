const { ezra } = require('../fredi/ezra');
const axios = require('axios');
const ytSearch = require('yt-search');

// PrinceTech YT-MP3 API client
const princeApi = {
  base: 'https://api.princetechn.com/api/download/ytmp3',
  apikey: process.env.PRINCE_API_KEY || 'prince',
  async fetchMeta(videoUrl) {
    try {
      const params = new URLSearchParams({ apikey: this.apikey, url: videoUrl });
      const url = `${this.base}?${params.toString()}`;
      const { data } = await axios.get(url, {
        timeout: 20000,
        headers: { 'user-agent': 'Mozilla/5.0', accept: 'application/json' }
      });
      return data;
    } catch (err) {
      console.error("Prince API error:", err.message);
      return { success: false };
    }
  }
};

// Savetube client (fallback)
const savetube = {
  api: {
    base: "https://media.savetube.me/api",
    info: "/v2/info"
  },
  headers: {
    'user-agent': 'Mozilla/5.0',
    accept: 'application/json'
  },
  async fetchMeta(videoUrl) {
    try {
      const url = `${this.api.base}${this.api.info}?url=${encodeURIComponent(videoUrl)}`;
      const { data } = await axios.get(url, { headers: this.headers, timeout: 20000 });
      return data;
    } catch (err) {
      console.error("Savetube error:", err.message);
      return { success: false };
    }
  }
};

// Izumiiiiiii API (final fallback)
const izumiiii = {
  async fetchMeta(videoUrl) {
    try {
      const apiUrl = `https://izumiiiiiiii.dpdns.org/downloader/youtube?url=${encodeURIComponent(videoUrl)}&format=mp3`;
      const { data } = await axios.get(apiUrl, {
        timeout: 20000,
        headers: { 'user-agent': 'Mozilla/5.0', accept: 'application/json' }
      });
      return data;
    } catch (err) {
      console.error("Izumiiii error:", err.message);
      return { success: false };
    }
  }
};

// Define the command
ezra({
  nomCom: "music",
  aliases: ["play", "music", "ytmp3", "audio", "mp3"],
  categorie: "Music",
  reaction: "🎙️"
}, async (dest, zk, commandOptions) => {
  const { arg, ms, repondre } = commandOptions;

  if (!arg[0]) {
    return repondre("Please provide a song name 🎶");
  }

  const query = arg.join(" ");

  try {
    // 🔍 Search YouTube
    const searchResults = await ytSearch(query);
    if (!searchResults || !searchResults.videos.length) {
      return repondre("No song found for your query.");
    }

    const firstVideo = searchResults.videos[0];
    const videoUrl = firstVideo.url;

    // 🎧 Try APIs in order
    let downloadData = await princeApi.fetchMeta(videoUrl);
    if (!downloadData || !downloadData.success) {
      downloadData = await savetube.fetchMeta(videoUrl);
    }
    if (!downloadData || !downloadData.success) {
      downloadData = await izumiiii.fetchMeta(videoUrl);
    }

    if (!downloadData || !downloadData.success) {
      return repondre("Failed to fetch audio from all sources. Try again later.");
    }

    // Extract download URL & title
    const downloadUrl = downloadData.result?.download_url || downloadData.url;
    const title = downloadData.result?.title || firstVideo.title;

    const messagePayload = {
      document: { url: downloadUrl },
      mimetype: 'audio/mp4',
      fileName: `${title}.mp3`,
      contextInfo: {
        externalAdReply: {
          title,
          body: title,
          mediaType: 1,
          sourceUrl: videoUrl,
          thumbnailUrl: firstVideo.thumbnail,
          renderLargerThumbnail: false,
          showAdAttribution: true,
        },
      },
    };

    await zk.sendMessage(dest, messagePayload, { quoted: ms });

  } catch (error) {
    console.error("Download error:", error);
    repondre(`Download failed: ${error.message}`);
  }
});
