const { ObjectId } = require("mongodb");
const { mainDB } = require("../libs/db");

module.exports.getAllContactsModel = async () => {
  try {
    const db = await mainDB();
    const contactsCollection = db.collection("contacts");
    const data = await contactsCollection.find({}).toArray();
    return { status: 200, data };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

module.exports.editContactModel = async (contactID, userID) => {
  try {
    const db = await mainDB();
    const contactsCollection = db.collection("contacts");
    const mainContact = await contactsCollection.findOne({
      _id: new ObjectId(contactID),
    });
    const mainContactFollowers =
      mainContact.followers === undefined ? [] : mainContact.followers;
    const isUserFollowContact = mainContactFollowers.some(
      (item) => item === userID
    );
    const newMainContactFollowers =
    isUserFollowContact
      ? mainContactFollowers.filter((item) => item !== userID)
      : [...mainContactFollowers, userID];
    const newMainContact = {
      ...mainContact,
      followers: newMainContactFollowers,
    };
    await contactsCollection.replaceOne({_id:new ObjectId(contactID)}, newMainContact)
    return { status: 200 };
  } catch (error) {
    return { status: 500 };
  }
};
