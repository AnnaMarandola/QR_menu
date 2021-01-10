
const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const admin = require("firebase-admin");

admin.initializeApp();


exports.onMenuCreate = functions.firestore
  .document("menus/{menuId}")
  .onCreate( async(snapshot, context) => {
    const menuId = context.params.menuId;
    const data = snapshot.data();
    const restoId = data.restoId
    return admin.firestore()
      .collection("restaurants")
      .doc(restoId)
      .update({ menuId: menuId, template: data.template });
  });


  exports.onUploadLogo = functions.storage.object().onFinalize(object => {
    console.log(object)
    const restoId = object.name
      .split('/')
      .pop()
      .split('-')[0]
      .split('.')[0]
    return admin.firestore()
      .collection('restaurants')
      .doc(restoId)
      .update({ logo: object.mediaLink })
  })




  exports.onMessageCreate = functions.firestore
      .document("messages/{messageID}")
      .onCreate( async(snapshot) => {

        const message = snapshot.data()
        console.log("message", message)
        
        const gmailEmail = functions.config().gmail.email;
        const gmailPassword = functions.config().gmail.password;
        console.log("gmail", gmailEmail)
        

        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: 'qrmenu.contact',
            pass: gmailPassword,
          },
        });

        const messageOptions = {
          from: message.email,
          to: gmailEmail,
          subject: message.subject || `${message.name} just messaged me from my app`,
          text: message.message,
          html: `<p>${message.message}</p>
                 <p>${message.name}</p>
                 <p>${message.email}</p>`
        };


        return transporter.sendMail(messageOptions)
    
      });