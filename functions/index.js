const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const admin = require("firebase-admin");

admin.initializeApp();


exports.onUploadLogo = functions.storage.object().onFinalize((object) => {
  console.log(object);
  const filePath = object.name;
  console.log("filePath", filePath);
  if (filePath.startsWith("logo-pictures/")) {
    const restoId = object.name.split("/").pop().split("-")[0].split(".")[0];
    return admin
      .firestore()
      .collection("restaurants")
      .doc(restoId)
      .update({ logo: object.mediaLink });
  } else {
    return false;
  }
});

exports.onMessageCreate = functions.firestore
  .document("messages/{messageID}")
  .onCreate(async (snapshot) => {
    const message = snapshot.data();
    console.log("message", message);

    const gmailEmail = functions.config().gmail.email;
    const gmailPassword = functions.config().gmail.password;
    console.log("gmail", gmailEmail);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "qrmenu.contact",
        pass: gmailPassword,
      },
    });

    const messageOptions = {
      from: message.email,
      to: gmailEmail,
      subject:
        message.subject || `${message.name} just messaged me from my app`,
      text: message.message,
      html: `<p>${message.message}</p>
                 <p>${message.name}</p>
                 <p>${message.email}</p>`,
    };

    return transporter.sendMail(messageOptions);
  });

exports.onUploadCarouselPicture = functions.storage
  .object()
  .onFinalize(async (object) => {
    console.log(object);
    const filePath = object.name;
    console.log("filePath", filePath);
    if (filePath.startsWith("carousel-pictures/")) {
      const restoId = object.name.split("/").pop().split("-")[0].split(".")[0];
      return admin
        .firestore()
        .collection("restaurants")
        .doc(restoId)
        .update({
          carousel: admin.firestore.FieldValue.arrayUnion(object.mediaLink),
        });
    } else {
      return false;
    }
  });

exports.onUploadDishPic = functions.storage
  .object()
  .onFinalize(async (object) => {
    console.log(object);
    const filePath = object.name;
    console.log("filePath", filePath);
    if (filePath.startsWith("dish-pictures/")) {
      const dishId = object.name.split("/").pop().split("-")[0].split(".")[0];
      return admin
        .firestore()
        .collection("dishes")
        .doc(dishId)
        .update({ picture: object.mediaLink });
    } else {
      return false;
    }
  });

exports.onRestoMessageCreate = functions.firestore
  .document("restoMessages/{restoMessageID}")
  .onCreate(async (snapshot) => {
    const message = snapshot.data();
    console.log("message", message);

    const gmailEmail = functions.config().gmail.email;
    const gmailPassword = functions.config().gmail.password;
    console.log("gmail", gmailEmail);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "qrmenu.contact",
        pass: gmailPassword,
      },
    });

    const messageOptions = {
      from: gmailEmail,
      to: message.recipient,
      subject: `${message.name} vous a envoyé un message depuis l'application QR Menu`,
      text: message.message,
      html: `<p>${message.message}</p>
                 <p>${message.name}</p>
                 <p>${message.emailSender}</p>`,
    };

    return transporter.sendMail(messageOptions);
  });
