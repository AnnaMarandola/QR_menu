
const functions = require("firebase-functions");
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