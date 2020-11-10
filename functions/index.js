
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
      .update({ menuId: menuId });
  });

