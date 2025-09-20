const { ezra } = require("../fredi/ezra");
const yts = require('yt-search');
const axios = require('axios');
const conf = require(__dirname + '/../set');
const fs = require('fs-extra');
const { downloadAndSaveMediaMessage } = require('@whiskeysockets/baileys');


// ------------------- PLAY COMMAND (API-based) -------------------
ezra({
  nomCom: "song2",
  aliases: ["playsong", "audio2", "mp32"],
  categorie: "download",
  reaction: "🎵"
}, async (dest, zk, { arg, ms, repondre }) => {
  try {
    // Get the search query
    const query = arg.join(" ").trim();
    if (!query) return repondre("What song do you want to download?");

    // Search for the song
    const searchResults = await yts(query);
    if (!searchResults || !searchResults.videos.length) {
      return repondre("No songs found!");
    }

    // Send a loading message
    await repondre("_Please wait, your download is in progress..._");

    // Get first video
    const video = searchResults.videos[0];
    const videoUrl = video.url;

    // Fetch audio data from API
    const response = await axios.get(`https://apis-keith.vercel.app/download/dlmp3?url=${videoUrl}`);
    const data = response.data;

    if (!data || !data.status || !data.result || !data.result.downloadUrl) {
      return repondre("Failed to fetch audio from the API. Please try again later.");
    }

    const audioUrl = data.result.downloadUrl;
    const title = data.result.title;

    // Send the audio to the chat
    await zk.sendMessage(dest, {
      audio: { url: audioUrl },
      mimetype: "audio/mpeg",
      fileName: `${title}.mp3`
    }, { quoted: ms });

  } catch (error) {
    console.error('Error in song2 command:', error);
    return repondre("Download failed. Please try again later.");
  }
});

