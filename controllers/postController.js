const url = require("url");
const {
  getAllPostsModel,
  createPostModal,
  deletePostModal,
  editPostModal,
  likePostModel,
  getAllLikesPostModel,
  unlikePostModel,
  addCommentModel,
  editCommentModel,
  addReactionCommentModel,
  deleteReactionCommentModel,
  editReactionCommentModel,
  deleteCommentModel,
} = require("../models/postModel");

module.exports.getAllPostsController = async (res, options) => {
  try {
    const { status, data } = await getAllPostsModel();
    res.writeHead(status, { "content-type": "application/json", ...options });
    res.write(JSON.stringify({ status, data }));
    res.end();
  } catch (error) {
    res.writeHead(500, { "content-type": "application/json", ...options });
    res.write(JSON.stringify({ status: 500, message: error.message }));
    res.end();
  }
};

module.exports.createPostController = async (req, res, options) => {
  try {
    let reqBodyParts = [];
    req.on("data", (data) => {
      reqBodyParts.push(data);
    });
    req.on("end", async () => {
      const reqBody = JSON.parse(Buffer.concat(reqBodyParts).toString());
      const { status, message, data } = await createPostModal(reqBody);
      res.writeHead(status, { "content-type": "application/json", ...options });
      res.write(JSON.stringify({ status, message, data }));
      res.end();
    });
  } catch (error) {
    res.writeHead(500, { "content-type": "application/json", ...options });
    res.write(JSON.stringify({ status: 500, message: error.message }));
    res.end();
  }
};

module.exports.deletePostController = async (req, res, options) => {
  try {
    const parsedUrl = url.parse(req.url, true);
    const postID = parsedUrl.query.postID;
    const { status, message } = await deletePostModal(postID);
    res.writeHead(status, { "content-type": "application/json", ...options });
    res.write(JSON.stringify({ status, message }));
    res.end();
  } catch (error) {
    res.writeHead(500, { "content-type": "application/json", ...options });
    res.write(JSON.stringify({ status: 500, message: error.message }));
    res.end();
  }
};

module.exports.editPostController = async (req, res, options) => {
  try {
    const parsedUrl = url.parse(req.url, true);
    const postID = parsedUrl.query.postID;
    let reqBodyParts = [];
    req.on("data", (data) => {
      reqBodyParts.push(data);
    });
    req.on("end", async () => {
      const reqBody = JSON.parse(Buffer.concat(reqBodyParts).toString());
      const { status, message } = await editPostModal(postID, reqBody);
      res.writeHead(status, { "content-type": "application/json", ...options });
      res.write(JSON.stringify({ status, message }));
      res.end();
    });
  } catch (error) {
    res.writeHead(500, { "content-type": "application/json", ...options });
    res.write(JSON.stringify({ status: 500, message: error.message }));
    res.end();
  }
};

module.exports.likePostController = async (req, res, options) => {
  try {
    const reqBodyParts = [];
    req.on("data", (data) => {
      reqBodyParts.push(data)
    })
    req.on("end", async () => {
      const reqBody = JSON.parse(Buffer.concat(reqBodyParts).toString());
      const {status, message} = await likePostModel(reqBody);
      res.writeHead(status, { "content-type": "application/json", ...options });
      res.write(JSON.stringify({ status, message }));
      res.end();
    })
  } catch (error) {
    res.writeHead(500, { "content-type": "application/json", ...options });
    res.write(JSON.stringify({ status: 500, message: error.message }));
    res.end();
  }
}

module.exports.getAllLikesPostController = async (req,res, options) => {
  try {
    const parsedUrl = url.parse(req.url, true);
    const postID = parsedUrl.query.postID
    const { status, data } = await getAllLikesPostModel(postID);
    res.writeHead(status, { "content-type": "application/json", ...options });
    res.write(JSON.stringify({ status, data }));
    res.end();
  } catch (error) {
    res.writeHead(500, { "content-type": "application/json", ...options });
    res.write(JSON.stringify({ status: 500, message: error.message }));
    res.end();
  }
};


module.exports.unlikePostController = async (req, res, options) => {
  try {
    const parsedUrl = url.parse(req.url, true);
    const userID = parsedUrl.query.userID;
    const postID = parsedUrl.query.postID;
    const { status, message } = await unlikePostModel(userID, postID);
    res.writeHead(status, { "content-type": "application/json", ...options });
    res.write(JSON.stringify({ status, message }));
    res.end();
  } catch (error) {
    res.writeHead(500, { "content-type": "application/json", ...options });
    res.write(JSON.stringify({ status: 500, message: error.message }));
    res.end();
  }
};

module.exports.addCommentController = async (req, res, options) => {
  try {
    let reqBodyParts = [];
    req.on("data", (data) => {
      reqBodyParts.push(data);
    });
    req.on("end", async () => {
      const reqBody = JSON.parse(Buffer.concat(reqBodyParts).toString());
      const { status, message } = await addCommentModel(reqBody);
      res.writeHead(status, { "content-type": "application/json", ...options });
      res.write(JSON.stringify({ status, message }));
      res.end();
    });
  } catch (error) {
    res.writeHead(500, { "content-type": "application/json", ...options });
    res.write(JSON.stringify({ status: 500, message: error.message }));
    res.end();
  }
};

module.exports.editCommentController = async (req, res, options) => {
  try {
    const parsedUrl = url.parse(req.url, true);
    const postID = parsedUrl.query.postID;
    const commentID = parsedUrl.query.commentID;
    let reqBodyParts = [];
    req.on("data", (data) => {
      reqBodyParts.push(data);
    });
    req.on("end", async () => {
      const reqBody = JSON.parse(Buffer.concat(reqBodyParts).toString());
      const { status, message } = await editCommentModel(
        postID,
        commentID,
        reqBody
      );
      res.writeHead(status, { "content-type": "application/json", ...options });
      res.write(JSON.stringify({ status, message }));
      res.end();
    });
  } catch (error) {
    res.writeHead(500, { "content-type": "application/json", ...options });
    res.write(JSON.stringify({ status: 500, message: error.message }));
    res.end();
  }
};

module.exports.addReactionCommentController = async (req, res, options) => {
  try {
    const reqBodyParts = [];
    req.on("data", (data) => {
      reqBodyParts.push(data);
    });
    req.on("end", async () => {
      const reqBody = JSON.parse(Buffer.concat(reqBodyParts).toString());
      const { status } = await addReactionCommentModel(reqBody);
      res.writeHead(status, { "content-type": "application/json", ...options });
      res.write(JSON.stringify({ status }));
      res.end();
    });
  } catch (error) {
    res.writeHead(500, { "content-type": "application/json", ...options });
    res.write(JSON.stringify({ status: 500 }));
    res.end();
  }
};

module.exports.deleteReactionCommentController = async (req, res, options) => {
  try {
    const parsedUrl = url.parse(req.url, true);
    const postID = parsedUrl.query.postID;
    const commentID = parsedUrl.query.commentID;
    const userID = parsedUrl.query.userID;
    const { status } = await deleteReactionCommentModel(
      postID,
      commentID,
      userID
    );
    res.writeHead(status, { "content-type": "application/json", ...options });
    res.write(JSON.stringify({ status }));
    res.end();
  } catch (error) {
    res.writeHead(500, { "content-type": "application/json", ...options });
    res.write(JSON.stringify({ status: 500 }));
    res.end();
  }
};

module.exports.editReactionCommentController = async (req, res, options) => {
  try {
    const parsedUrl = url.parse(req.url, true);
    const postID = parsedUrl.query.postID;
    const commentID = parsedUrl.query.commentID;
    const userID = parsedUrl.query.userID;
    const reqBodyParts = [];
    req.on("data", (data) => {
      reqBodyParts.push(data);
    });
    req.on("end", async () => {
      const reqBody = JSON.parse(Buffer.concat(reqBodyParts).toString());
      const { status } = await editReactionCommentModel(
        postID,
        commentID,
        userID,
        reqBody
      );
      res.writeHead(status, { "content-type": "application/json", ...options });
      res.write(JSON.stringify({ status }));
      res.end();
    });
  } catch (error) {
    res.writeHead(500, { "content-type": "application/json", ...options });
    res.write(JSON.stringify({ status: 500 }));
    res.end();
  }
};

module.exports.deleteCommentController = async (req, res, options) => {
  try {
    const parsedUrl = url.parse(req.url, true);
    const commentID = parsedUrl.query.commentID;
    const postID = parsedUrl.query.postID;
    const { status, message } = await deleteCommentModel(commentID, postID);
    res.writeHead(status, { "content-type": "application/json", ...options });
    res.write(JSON.stringify({ status, message }));
    res.end();
  } catch (error) {
    res.writeHead(500, { "content-type": "application/json", ...options });
    res.write(JSON.stringify({ status: 500, message: error.message }));
    res.end();
  }
};
