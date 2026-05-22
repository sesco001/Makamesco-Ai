/**
 * Secure Utils Module for WhatsApp Bot
 * Enhanced with error handling and security measures
 */

/**
 * Delay execution safely
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise<void>}
 */
function delay(ms) {
  // Validate input
  if (typeof ms !== 'number' || ms < 0 || ms > 300000) {
    console.warn('Invalid delay value, using default 1000ms');
    ms = 1000;
  }
  
  return new Promise(resolve => {
    const timeoutId = setTimeout(() => {
      clearTimeout(timeoutId);
      resolve();
    }, ms);
  });
}

/**
 * Loading animation with proper error handling
 * @param {string} dest - Destination JID
 * @param {Object} zk - Baileys client
 */
async function loading(dest, zk) {
  try {
    // Validate parameters
    if (!dest || typeof dest !== 'string') {
      console.error('Invalid destination for loading');
      return;
    }

    if (!zk || typeof zk.sendMessage !== 'function') {
      console.error('Invalid Baileys client for loading');
      return;
    }

    const loadMessages = [
      "《 █▒▒▒▒▒▒▒▒▒▒▒》10%",
      "《 ████▒▒▒▒▒▒▒▒》30%",
      "《 ███████▒▒▒▒▒》50%",
      "《 ██████████▒▒》80%",
      "《 ████████████》100%",
      "Lucky load Completed✅"
    ];

    let key;
    try {
      const result = await zk.sendMessage(dest, { text: 'Loading Please Wait' });
      key = result.key;
    } catch (sendError) {
      console.error('Failed to send initial loading message:', sendError.message);
      return;
    }

    for (let i = 0; i < loadMessages.length; i++) {
      try {
        await delay(500);
        await zk.sendMessage(dest, { 
          text: loadMessages[i], 
          edit: key 
        });
      } catch (editError) {
        console.warn('Failed to edit loading message:', editError.message);
        // Continue with next iteration
      }
    }
  } catch (error) {
    console.error('Error in loading function:', error.message);
  }
}

/**
 * React to message with validation
 * @param {string} dest - Destination JID
 * @param {Object} zk - Baileys client
 * @param {Object} msg - Message object
 * @param {string} reaction - Reaction emoji
 */
function react(dest, zk, msg, reaction) {
  try {
    // Validate parameters
    if (!dest || typeof dest !== 'string') {
      console.error('Invalid destination for reaction');
      return;
    }

    if (!zk || typeof zk.sendMessage !== 'function') {
      console.error('Invalid Baileys client for reaction');
      return;
    }

    if (!msg || !msg.key) {
      console.error('Invalid message object for reaction');
      return;
    }

    // Validate reaction emoji
    if (!reaction || typeof reaction !== 'string') {
      reaction = '👍';
    }

    // Rate limiting for reactions
    if (global.reactionLimit && global.reactionLimit[dest]) {
      const now = Date.now();
      if (now - global.reactionLimit[dest] < 2000) {
        return; // Skip if too many reactions
      }
    }
    
    if (!global.reactionLimit) global.reactionLimit = {};
    global.reactionLimit[dest] = Date.now();

    zk.sendMessage(dest, { 
      react: { 
        text: reaction, 
        key: msg.key 
      } 
    }).catch(err => {
      console.error('Failed to send reaction:', err.message);
    });
  } catch (error) {
    console.error('Error in react function:', error.message);
  }
}

/**
 * Validate phone number format
 * @param {string} phone - Phone number to validate
 * @returns {boolean}
 */
function isValidPhone(phone) {
  if (!phone || typeof phone !== 'string') {
    return false;
  }
  
  // Remove common separators
  const cleaned = phone.replace(/[-\s()]/g, '');
  
  // Check if it's a valid number (10-15 digits)
  return /^\d{10,15}$/.test(cleaned);
}

/**
 * Validate JID format
 * @param {string} jid - JID to validate
 * @returns {boolean}
 */
function isValidJID(jid) {
  if (!jid || typeof jid !== 'string') {
    return false;
  }
  
  return /^[\d]+(@s\.whatsapp\.net|@g\.us)$/.test(jid);
}

/**
 * Sanitize user input
 * @param {string} input - Input to sanitize
 * @returns {string}
 */
function sanitizeInput(input) {
  if (!input || typeof input !== 'string') {
    return '';
  }
  
  // Remove potential script injections
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim();
}

module.exports = {
  delay,
  loading,
  react,
  isValidPhone,
  isValidJID,
  sanitizeInput
};
