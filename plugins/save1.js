ezra({ nomCom: "save1", categorie: "Maka-Mods" }, async (dest, zk, commandeOptions) => {

  const { repondre , msgRepondu , superUser, auteurMessage } = commandeOptions;

    if ( superUser) { 

      if(msgRepondu) {

        console.log(msgRepondu) ;

        let msg ;

        if (msgRepondu.imageMessage) {



       let media  = await zk.downloadAndSaveMediaMessage(msgRepondu.imageMessage) ;
       // console.log(msgRepondu) ;
       msg = {

         image : { url : media } ,
         caption : msgRepondu.imageMessage.caption,

       }


        } else if (msgRepondu.videoMessage) {

          let media  = await zk.downloadAndSaveMediaMessage(msgRepondu.videoMessage) ;

          msg = {

            video : { url : media } ,
            caption : msgRepondu.videoMessage.caption,

          }

        } else if (msgRepondu.audioMessage) {

          let media  = await zk.downloadAndSaveMediaMessage(msgRepondu.audioMessage) ;

          msg = {

            audio : { url : media } ,
            mimetype:'audio/mp4',
             }     

        } else if (msgRepondu.stickerMessage) {


          let media  = await zk.downloadAndSaveMediaMessage(msgRepondu.stickerMessage)

          let stickerMess = new Sticker(media, {
            pack: 'DAVE-XMD-TAG',
            type: StickerTypes.CROPPED,
            categories: ["🤩", "🎉"],
            id: "12345",
            quality: 70,
            background: "transparent",
          });
          const stickerBuffer2 = await stickerMess.toBuffer();

          msg = { sticker: stickerBuffer2}


        }  else {
            msg = {
               text : msgRepondu.conversation,
            }
        }

      zk.sendMessage(auteurMessage,msg)

      } else { repondre('Mention the message that you want to save') }

  } else {
    repondre('only mods can use this command')
  }


  })
;
