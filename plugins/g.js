const { ezra } = require("../fredi/ezra");

const tagCommands = [
  {
    commandName: "groupmembers",
    filter: () => true,
    title: "📣 TAG ALL MEMBERS"
  }, 
  {
    commandName: "admins",
    filter: (participant, adminIds) => adminIds.includes(participant.id),
    title: "👑 TAG ADMINS"
  }, 
  {
    commandName: "listactive",
    filter: participant => participant.isOnline,
    title: "🟢 LIST ONLINE MEMBERS"
  }, 
  {
    commandName: "listoffline",
    filter: participant => !participant.isOnline,
    title: "🔴 LIST INACTIVE MEMBERS"
  }
];

tagCommands.forEach(({ commandName, filter, title }) => {
  ezra({
    nomCom: commandName,
    categorie: "Untoldman-Group",
    reaction: '📯'
  }, async (messageInfo, messageUtils, commandArgs) => {
    const {
      ms: message,
      repondre: reply,
      arg: args,
      verifGroupe: isGroup,
      nomGroupe: groupName,
      infosGroupe: groupInfo,
      nomAuteurMessage: senderName
    } = commandArgs;

    if (!isGroup) {
      return reply("⚠️ This command is for groups only.");
    }

    const messageText = args && args.length > 0 ? args.join(" ") : "No message provided.";
    const participants = groupInfo.participants || [];
    const adminIds = participants.filter(p => p.admin).map(p => p.id);
    
    const participantsWithStatus = participants.map(participant => ({
      ...participant,
      isOnline: true
    }));

    const filteredParticipants = participantsWithStatus.filter(p => filter(p, adminIds));

    if (filteredParticipants.length === 0) {
      return reply("❌ No members found for this tag category.");
    }

    const randomSymbols = ['💡', '☢️', "🗡️", "🖌️", '🪫', '🔋', '⚙️', "🕶️", "🌡️", '✏️', '📌', '©️', '$', '®️', '™️', '⚔️', '🔏'];
    const randomSymbol = randomSymbols[Math.floor(Math.random() * randomSymbols.length)];

    let messageContent = `
┈┈┈┈┈┈┈┈┈┈┈┈
        
        ${title}
┈┈┈┈┈┈┈┈┈┈┈┈
👥 Group: ${groupName}
👤 By: *${senderName}*
📝 Message: *${messageText}*
┈┈┈┈┈┈┈┈┈┈┈┈

`;

    for (const participant of filteredParticipants) {
      messageContent += `${randomSymbol} @${participant.id.split('@')[0]}\n`;
    }

    messageUtils.sendMessage(messageInfo, {
      text: messageContent,
      mentions: filteredParticipants.map(p => p.id)
    }, {
      quoted: message
    });
  });
});
