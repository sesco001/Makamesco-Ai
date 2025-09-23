const {
  ezra
} = require("../fredi/ezra");
const axios = require("axios");
const ytSearch = require("yt-search");
const conf = require(__dirname + "/../set");
ezra({
  'nomCom': "play3",
  'aliases': ["song", "playdoc", "audio", "mp3"],
  'categorie': "sir cheruiyot-Search",
  'reaction': '🎸'
}, async (_0x52adfd, _0x3169bc, _0x3f281f) => {
  const {
    arg: _0x2cc854,
    ms: _0x564244,
    repondre: _0x13d03f
  } = _0x3f281f;
  if (!_0x2cc854[0]) {
    return _0x13d03f("😐 Please provide a audio name or YouTube link.");
  }
  let _0x1411e7;
  let _0x41136f;
  const _0x2f4242 = _0x2cc854.join(" ");
  try {
    if (_0x2f4242.match(/(youtube\.com|youtu\.be)/i)) {
      _0x1411e7 = _0x2f4242;
      const _0x2965d4 = _0x1411e7.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i)?.[1];
      _0x41136f = await ytSearch({
        'videoId': _0x2965d4
      });
    } else {
      const _0x41a87b = await ytSearch(_0x2f4242);
      if (!_0x41a87b || !_0x41a87b.videos.length) {
        return _0x13d03f("⚠️ No audio found for the specified query.");
      }
      _0x41136f = _0x41a87b.videos[0];
      _0x1411e7 = _0x41136f.url;
    }
    const _0x4a647f = async _0x5da5e7 => {
      try {
        const _0x856bc5 = await axios.get(_0x5da5e7, {
          'timeout': 0x2710
        });
        return _0x856bc5.data;
      } catch (_0x58cd8c) {
        console.error("Error fetching data from API:", _0x58cd8c.message);
        return {
          'status': false
        };
      }
    };
    const _0x1c7c37 = ["https://apis-keith.vercel.app/download/ytmp3?url=" + encodeURIComponent(_0x1411e7), "https://apis-keith.vercel.app/download/mp3?url=" + encodeURIComponent(_0x1411e7), "https://apis-keith.vercel.app/download/dlmp3?url=" + encodeURIComponent(_0x1411e7), "https://apis-keith.vercel.app/download/audio?url=" + encodeURIComponent(_0x1411e7)];
    let _0x43e884;
    for (const _0x2b6fc7 of _0x1c7c37) {
      const _0x36975d = await _0x4a647f(_0x2b6fc7);
      if (_0x36975d && _0x36975d.status) {
        if (_0x2b6fc7.includes("ytmp3")) {
          _0x43e884 = _0x36975d.result.url;
        } else {
          if (_0x2b6fc7.includes("mp3")) {
            _0x43e884 = _0x36975d.result.downloadUrl;
          } else {
            if (_0x2b6fc7.includes("dlmp3")) {
              _0x43e884 = _0x36975d.result.data.downloadUrl;
            } else if (_0x2b6fc7.includes("audio")) {
              _0x43e884 = _0x36975d.result;
            }
          }
        }
        if (_0x43e884) {
          break;
        }
      }
    }
    if (!_0x43e884) {
      return _0x13d03f("⚠️ Failed to retrieve download URL from all sources. Please try again later.");
    }
    const _0x696f04 = [{
      'audio': {
        'url': _0x43e884
      },
      'mimetype': "audio/mpeg3",
      'contextInfo': {
        'externalAdReply': {
          'title': _0x41136f.title || "jeepersxmd Audio Download",
          'body': "Powered by maka ai site",
          'mediaType': 0x1,
          'sourceUrl': conf.GURL || _0x1411e7,
          'thumbnailUrl': _0x41136f.thumbnail || "https://i.ytimg.com/vi/2WmBa1CviYE/hqdefault.jpg",
          'renderLargerThumbnail': false
        }
      }
    }, {
      'document': {
        'url': _0x43e884
      },
      'mimetype': "audio/mpeg",
      'fileName': _0x41136f.title.replace(/[^\w\s]/gi, '') + ".mp3" || "audio.mp3",
      'contextInfo': {
        'externalAdReply': {
          'title': _0x41136f.title || "Audio Documents Download",
          'body': "Document version - Powered by sir bravin Ai site",
          'mediaType': 0x1,
          'sourceUrl': conf.GURL || _0x1411e7,
          'thumbnailUrl': _0x41136f.thumbnail || "https://i.ytimg.com/vi/2WmBa1CviYE/hqdefault.jpg",
          'renderLargerThumbnail': false
        }
      }
    }];
    for (const _0x15846d of _0x696f04) {
      await _0x3169bc.sendMessage(_0x52adfd, _0x15846d, {
        'quoted': _0x564244
      });
    }
  } catch (_0x31ba37) {
    console.error("⚠️ Error during download process:", _0x31ba37);
    return _0x13d03f("⚠️ Download failed due to an error: " + (_0x31ba37.message || _0x31ba37));
  }
});
ezra({
  'nomCom': "video3",
  'aliases': ["vdoc", "videodoc", "videos", "mp4"],
  'categorie': "sir cheruiyot-Search",
  'reaction': '🎬'
}, async (_0x20490e, _0x60c014, _0x41fb43) => {
  const {
    arg: _0x2e050e,
    ms: _0x232b0d,
    repondre: _0x7be622
  } = _0x41fb43;
  if (!_0x2e050e[0]) {
    return _0x7be622("😐 Please provide a video name or YouTube link.");
  }
  let _0x186849;
  let _0x5a045f;
  const _0x4b3cc6 = _0x2e050e.join(" ");
  try {
    if (_0x4b3cc6.match(/(youtube\.com|youtu\.be)/i)) {
      _0x186849 = _0x4b3cc6;
      const _0x5a6449 = _0x186849.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i)?.[1];
      _0x5a045f = await ytSearch({
        'videoId': _0x5a6449
      });
    } else {
      const _0x41ba78 = await ytSearch(_0x4b3cc6);
      if (!_0x41ba78 || !_0x41ba78.videos.length) {
        return _0x7be622("⚠️ No video found for the specified query.");
      }
      _0x5a045f = _0x41ba78.videos[0];
      _0x186849 = _0x5a045f.url;
    }
    const _0x4ca009 = async _0x3ab083 => {
      try {
        const _0x478896 = await axios.get(_0x3ab083, {
          'timeout': 0x2710
        });
        return _0x478896.data;
      } catch (_0xb4ad5) {
        console.error("Error fetching data from API:", _0xb4ad5.message);
        return {
          'status': false
        };
      }
    };
    const _0x40fe13 = ["https://apis-keith.vercel.app/download/ytmp4?url=" + encodeURIComponent(_0x186849), "https://apis-keith.vercel.app/download/mp4?url=" + encodeURIComponent(_0x186849), "https://apis-keith.vercel.app/download/dlmp4?url=" + encodeURIComponent(_0x186849), "https://apis-keith.vercel.app/download/video?url=" + encodeURIComponent(_0x186849)];
    let _0x341113;
    for (const _0x4e520c of _0x40fe13) {
      const _0x51fbb3 = await _0x4ca009(_0x4e520c);
      if (_0x51fbb3 && _0x51fbb3.status) {
        if (_0x4e520c.includes("ytmp4")) {
          _0x341113 = _0x51fbb3.result.url;
        } else {
          if (_0x4e520c.includes("mp4")) {
            _0x341113 = _0x51fbb3.result.downloadUrl;
          } else {
            if (_0x4e520c.includes("dlmp4")) {
              _0x341113 = _0x51fbb3.result.data.downloadUrl;
            } else if (_0x4e520c.includes("video")) {
              _0x341113 = _0x51fbb3.result;
            }
          }
        }
        if (_0x341113) {
          break;
        }
      }
    }
    if (!_0x341113) {
      return _0x7be622("⚠️ Failed to retrieve download URL from all sources. Please try again later.");
    }
    const _0x2945ac = [{
      'audio': {
        'url': _0x341113
      },
      'mimetype': "video/mpeg",
      'contextInfo': {
        'externalAdReply': {
          'title': _0x5a045f.title || "sir bravin Video Download",
          'body': "Powered by sir bravin ai site",
          'mediaType': 0x1,
          'sourceUrl': conf.GURL || _0x186849,
          'thumbnailUrl': _0x5a045f.thumbnail || "https://i.ytimg.com/vi/2WmBa1CviYE/hqdefault.jpg",
          'renderLargerThumbnail': false
        }
      }
    }, {
      'document': {
        'url': _0x341113
      },
      'mimetype': "video/mpeg",
      'fileName': _0x5a045f.title.replace(/[^\w\s]/gi, '') + ".mp4" || "audio.mp4",
      'contextInfo': {
        'externalAdReply': {
          'title': _0x5a045f.title || "maka Documents Download",
          'body': "Document version - Powered by maka Ai site",
          'mediaType': 0x1,
          'sourceUrl': conf.GURL || _0x186849,
          'thumbnailUrl': _0x5a045f.thumbnail || "https://i.ytimg.com/vi/2WmBa1CviYE/hqdefault.jpg",
          'renderLargerThumbnail': false
        }
      }
    }];
    for (const _0x496b1d of _0x2945ac) {
      await _0x60c014.sendMessage(_0x20490e, _0x496b1d, {
        'quoted': _0x232b0d
      });
    }
  } catch (_0x53d58e) {
    console.error("⚠️ Error during download process:", _0x53d58e);
    return _0x7be622("⚠️ Download failed due to an error: " + (_0x53d58e.message || _0x53d58e));
  }
});
