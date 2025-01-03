const {
  getAllContactsModel,
  editContactModel,
} = require("../models/contactModel");
const url = require("url");

module.exports.getAllContactsController = async (res, options) => {
  try {
    const { status, data, message } = await getAllContactsModel();
    res.writeHead(status, { "content-type": "application/json", ...options });
    res.write(JSON.stringify({ status, data, message }));
    res.end();
  } catch (error) {
    res.writeHead(500, { "content-type": "application/json", ...options });
    res.write(JSON.stringify({ status: 500, message: error.message }));
    res.end();
  }
};

module.exports.editContactController = async (req, res, options) => {
  try {
    const parsedUrl = url.parse(req.url, true);
    const contactID = parsedUrl.query.contactID;
    const reqBodyParts = [];
    req.on("data", (data) => {
      reqBodyParts.push(data);
    });
    req.on("end", async () => {
      const reqBody = JSON.parse(Buffer.concat(reqBodyParts).toString());
      const { status } = await editContactModel(contactID, reqBody.userID);
      res.writeHead(status, { "contact-type": "application/json", ...options });
      res.write(JSON.stringify({ status }));
      res.end();
    });
  } catch (error) {
    res.writeHead(500, { "contact-type": "application/json", ...options });
    res.write(JSON.stringify({ status: 500 }));
    res.end();
  }
};
