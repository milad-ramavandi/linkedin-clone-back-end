const http = require("http");
const {
  getAllPostsController,
  createPostController,
  deletePostController,
  editPostController,
  likePostController,
  getAllLikesPostController,
  unlikePostController,
  editCommentController,
  deleteCommentController,
  addReactionCommentController,
  deleteReactionCommentController,
  editReactionCommentController,
  addCommentController,
} = require("./controllers/postController");
const { getAllContactsController, editContactController } = require("./controllers/contactController");
require("dotenv").config();

const options = {
  "access-control-allow-origin": `${process.env.ALLOW_ORIGIN}`,
  "access-control-allow-methods": "GET,POST,DELETE,PUT",
  "access-control-allow-headers": "*",
};

const server = http.createServer((req, res) => {
  if (req.url === "/" && req.method === "GET") {
    res.writeHead(200, { ...options });
    res.write("Welcome to linkedin clone backend");
    res.end();
  } else if (req.url === "/posts" && req.method === "GET") {
    getAllPostsController(res, options);
  } else if (req.url === "/posts" && req.method === "POST") {
    createPostController(req, res, options);
  } else if (req.url.startsWith("/posts") && req.method === "DELETE") {
    deletePostController(req, res, options);
  } else if (req.url.startsWith("/posts") && req.method === "PUT") {
    editPostController(req, res, options);
  } else if (req.url === "/comments" && req.method === "POST") {
    addCommentController(req, res, options);
  } else if (req.url.startsWith("/comments") && req.method === "PUT") {
    editCommentController(req, res, options)
  } else if (req.url.startsWith("/comments") && req.method === "DELETE") {
    deleteCommentController(req, res, options);
  } else if (req.url === "/reactions" && req.method === "POST") {
    addReactionCommentController(req, res, options);
  } else if (
    req.url.startsWith("/reactions") &&
    req.method === "DELETE"
  ) {
    deleteReactionCommentController(req, res, options);
  } else if (req.url.startsWith("/reactions") && req.method === "PUT") {
    editReactionCommentController(req, res, options);
  } else if (req.url.startsWith("/likes") && req.method === "GET") {
    getAllLikesPostController(req, res, options);
  } else if (req.url === "/likes" && req.method === "POST") {
    likePostController(req, res, options);
  } else if (req.url.startsWith("/likes") && req.method === "DELETE") {
    unlikePostController(req, res, options);
  } else if (req.url === "/contacts" && req.method === "GET") {
    getAllContactsController(res, options)
  } else if (req.url.startsWith("/contacts") && req.method === "PUT") {
    editContactController(req, res, options)
  }
});

server.listen(process.env.PORT, () => console.log("server is running..."));
