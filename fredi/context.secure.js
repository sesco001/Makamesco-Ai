/**
 * Secure Context Info Module for WhatsApp Bot
 * Uses official Baileys with enhanced security measures
 */

module.exports = {
  /**
   * Get secure context info for messages
   * @param {Object} ms - Message object
   * @returns {Object} Context info with security validations
   */
  getContextInfo: (ms) => {
    // Validate input
    if (!ms || typeof ms !== 'object') {
      return {
        mentionedJid: [],
        forwardingScore: 0,
        isForwarded: false
      };
    }

    const senderJid = ms.sender || ms.from;
    
    // Validate JID format
    if (!senderJid || !/^[\d]+@s\.whatsapp\.net$/.test(senderJid)) {
      return {
        mentionedJid: [],
        forwardingScore: 0,
        isForwarded: false
      };
    }

    return {
      mentionedJid: [senderJid],
      forwardingScore: 1,
      isForwarded: false,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363418628641913@newsletter',
        newsletterName: 'Untoldman😎',
        serverMessageId: 143
      }
    };
  },

  /**
   * Secure message reply function with validation
   * @param {Object} zk - Baileys client
   * @param {string} dest - Destination JID
   * @param {Object} ms - Message object
   * @param {string} text - Text to send
   * @param {Object} options - Additional options
   */
  repondre: async (zk, dest, ms, text, options = {}) => {
    try {
      // Validate parameters
      if (!zk || typeof zk.sendMessage !== 'function') {
        console.error('Invalid Baileys client');
        return;
      }

      if (!dest || typeof dest !== 'string') {
        console.error('Invalid destination JID');
        return;
      }

      // Validate JID format
      if (!/^[\d]+(@s\.whatsapp\.net|@g\.us)$/.test(dest)) {
        console.error('Invalid JID format:', dest);
        return;
      }

      // Rate limiting check (basic)
      if (global.rateLimit && global.rateLimit[dest]) {
        const now = Date.now();
        if (now - global.rateLimit[dest].lastCall < 1000) {
          global.rateLimit[dest].count++;
          if (global.rateLimit[dest].count > 5) {
            console.warn('Rate limit exceeded for:', dest);
            return;
          }
        } else {
          global.rateLimit[dest].count = 1;
          global.rateLimit[dest].lastCall = now;
        }
      } else {
        if (!global.rateLimit) global.rateLimit = {};
        global.rateLimit[dest] = { count: 1, lastCall: Date.now() };
      }

      const contextInfo = {
        ...module.exports.getContextInfo(ms),
        ...(options.contextInfo || {})
      };

      await zk.sendMessage(dest, {
        text: text || '',
        contextInfo: contextInfo
      }, { 
        quoted: ms && ms.key ? ms : null 
      });
    } catch (error) {
      console.error('Error in repondre:', error.message);
      // Don't expose internal errors to users
    }
  },

  /**
   * Secure sendMessage function with validation
   * @param {Object} zk - Baileys client
   * @param {string} dest - Destination JID
   * @param {Object} ms - Message object
   * @param {Object} options - Message options
   */
  sendMessage: async (zk, dest, ms, options) => {
    try {
      // Validate parameters
      if (!zk || typeof zk.sendMessage !== 'function') {
        console.error('Invalid Baileys client');
        return;
      }

      if (!dest || typeof dest !== 'string') {
        console.error('Invalid destination JID');
        return;
      }

      // Validate JID format
      if (!/^[\d]+(@s\.whatsapp\.net|@g\.us)$/.test(dest)) {
        console.error('Invalid JID format:', dest);
        return;
      }

      // Validate options
      if (!options || typeof options !== 'object') {
        console.error('Invalid options object');
        return;
      }

      // Security: Prevent dangerous message types
      const dangerousTypes = ['viewOnceMessage', 'disappearingMessage'];
      for (const type of dangerousTypes) {
        if (options[type]) {
          console.warn('Blocked dangerous message type:', type);
          delete options[type];
        }
      }

      const contextInfo = {
        ...module.exports.getContextInfo(ms),
        ...(options.contextInfo || {})
      };

      // Rate limiting
      if (global.rateLimit && global.rateLimit[dest]) {
        const now = Date.now();
        if (now - global.rateLimit[dest].lastCall < 1000) {
          global.rateLimit[dest].count++;
          if (global.rateLimit[dest].count > 10) {
            console.warn('Rate limit exceeded for:', dest);
            return;
          }
        } else {
          global.rateLimit[dest].count = 1;
          global.rateLimit[dest].lastCall = now;
        }
      } else {
        if (!global.rateLimit) global.rateLimit = {};
        global.rateLimit[dest] = { count: 1, lastCall: Date.now() };
      }

      await zk.sendMessage(dest, {
        ...options,
        contextInfo: contextInfo
      }, { 
        quoted: ms && ms.key ? ms : null 
      });
    } catch (error) {
      console.error('Error in sendMessage:', error.message);
      // Don't expose internal errors to users
    }
  }
};
