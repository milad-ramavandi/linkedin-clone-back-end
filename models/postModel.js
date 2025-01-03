const { ObjectId } = require("mongodb");
const { mainDB } = require("../libs/db");

module.exports.getAllPostsModel = async () => {
  try {
    const db = await mainDB();
    const postsCollection = db.collection("posts");
    const data = await postsCollection.find({}).toArray();
    return { status: 200, data };
  } catch (error) {
    return { status: 500, message:error.message };
  }
};

module.exports.createPostModal = async (reqBody) => {
  try {
    const db = await mainDB();
    const postsCollection = db.collection("posts");
    const newPostModal = {
      ...reqBody,
      createdAt: new Date(),
      isEdited: false,
    };
    await postsCollection.insertOne(newPostModal);
    return { status: 201, message: "Add post successfully" };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

module.exports.deletePostModal = async (postID) => {
  try {
    const db = await mainDB();
    const postsCollection = db.collection("posts");
    await postsCollection.deleteOne({ _id: new ObjectId(postID) });
    return { status: 200, message: "Delete post successfully" };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

module.exports.editPostModal = async (postID, reqBody) => {
  try {
    const db = await mainDB();
    const postsCollection = db.collection("posts");
    await postsCollection.updateOne({_id:new ObjectId(postID)}, { $set: { ...reqBody } });
    return { status: 200, message: "Edit post successfully" };
  } catch (error) {
    return { status: 500, message: error.message }
  }
};

module.exports.likePostModel = async (reqBody) => {
  try {
    const db = await mainDB();
    const postsCollection = db.collection("posts");
    const {userID, postID} = reqBody
    const mainPost = await postsCollection.findOne({_id:new ObjectId(postID)});
    let likesPost = mainPost.likes === undefined ? [] : mainPost.likes;
    likesPost.push(userID)
    await postsCollection.updateOne({_id: new ObjectId(postID)}, { $set: { likes:likesPost } })
    return {status:201, message:"Like post successfully"}
  } catch (error) {
    return {status:500, message:error.message}
  }
}


module.exports.unlikePostModel = async (userID, postID) => {
  try {
    const db = await mainDB();
    const postsCollection = db.collection("posts");
    const mainPost = await postsCollection.findOne({_id: new ObjectId(postID)});
    const newLikes = mainPost.likes.filter(item => item !== userID)
    await postsCollection.updateOne({_id: new ObjectId(postID)}, { $set: { likes:newLikes } })
    return { status: 200, message: "Unlike post successfully" };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

module.exports.deleteCommentModel = async (commentID, postID) => {
  try {
    const db = await mainDB();
    const postsCollection = db.collection("posts");
    const mainPost = await postsCollection.findOne({ _id: new ObjectId(postID) });
    const filteredCommentsPost = mainPost.comments.filter(item => item.id !== commentID)
    await postsCollection.updateOne({_id:new ObjectId(postID)}, {$set:{comments:filteredCommentsPost}})
    return { status: 200, message: "Delete comment successfully" };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

module.exports.editCommentModel = async (postID, commentID, reqBody) => {
  try {
    const db = await mainDB();
    const postsCollection = db.collection("posts");
    const mainPost = await postsCollection.findOne({_id : new ObjectId(postID)})
    const mainComment = mainPost.comments.find(item => item.id === commentID);
    const newMainComment = {...mainComment, ...reqBody}
    const newCommentsPost = mainPost.comments.map(item => {
      if (item.id === commentID) {
        return newMainComment
      } 
      return item
    })
    const newMainPost = {...mainPost, comments:newCommentsPost};
    await postsCollection.replaceOne({_id:new ObjectId(postID)}, newMainPost)
    return {status:200, message:"Edit comment successfully"}
  } catch (error) {
    return {status:500, message:error.message}
  }
}

module.exports.addCommentModel = async (reqBody) => {
  try {
    const db = await mainDB();
    const postsCollection = db.collection("posts");
    const {postID} = reqBody;
    const mainPost = await postsCollection.findOne({
      _id: new ObjectId(postID),
    });
    let commentsPost = mainPost.comments === undefined ? [] : mainPost.comments
    const newCommentModel = {
      id:crypto.randomUUID(),
      ...reqBody,
      createdAt: new Date()
    }
    commentsPost.push(newCommentModel)
    await postsCollection.updateOne(
      { _id: new ObjectId(postID) },
      { $set: { comments: commentsPost } }
    );
    return { status: 201, message: "Add comment successfully" };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

module.exports.addReactionCommentModel = async (reqBody) => {
  try {
    const db = await mainDB();
    const postsCollection = db.collection("posts");
    const {postID, commentID, userID, userImage, codeReaction} = reqBody
    const mainPost = await postsCollection.findOne({_id: new ObjectId(postID)})
    const mainComment = mainPost.comments.find(item => item.id === commentID)
    let reactionsComment = mainComment.reactions === undefined ? [] : mainComment.reactions
    reactionsComment.push({userID, userImage, codeReaction});
    const newMainComment = {...mainComment, reactions:reactionsComment};
    const newCommentsPost = mainPost.comments.map(item => {
      if (item.id === commentID) {
        return newMainComment
      }
      return item
    });
    const newMainPost = {...mainPost, comments:newCommentsPost}
    await postsCollection.replaceOne({_id: new ObjectId(postID)}, newMainPost)
    return { status: 201 };
  } catch (error) {
    return { status: 500 };
  }
};

module.exports.deleteReactionCommentModel = async (postID, commentID, userID) => {
  try {
    const db = await mainDB();
    const postsCollection = db.collection("posts");
    const mainPost = await postsCollection.findOne({_id: new ObjectId(postID)});
    const mainComment = mainPost.comments.find(item => item.id === commentID);
    const newReactionsComment = mainComment.reactions.filter(item => item.userID !== userID)
    const newMainComment = {...mainComment, reactions: newReactionsComment}
    const newCommentsPost = mainPost.comments.map(item => {
      if (item.id === commentID) {
        return newMainComment
      }
      return item
    })
    const newMainPost = {...mainPost, comments:newCommentsPost};
    await postsCollection.replaceOne({_id:new ObjectId(postID)}, newMainPost)
    return { status: 200 };
  } catch (error) {
    return { status: 500 };
  }
};

module.exports.editReactionCommentModel = async (postID, commentID, userID, reqBody) => {
  try {
    const db = await mainDB();
    const postsCollection = db.collection("posts");
    const mainPost = await postsCollection.findOne({_id:new ObjectId(postID)});
    const mainComment = mainPost.comments.find(item => item.id === commentID);
    const mainReaction = mainComment.reactions.find(item => item.userID === userID)
    const newMainReaction = {...mainReaction, ...reqBody};
    const newReactionsMainComment = mainComment.reactions.map(item => {
      if (item.userID === userID) {
        return newMainReaction
      }
      return item
    })
    const newCommentsPost = mainPost.comments.map(item => {
      if (item.id === commentID) {
        return {...mainComment, reactions:newReactionsMainComment}
      }
      return item
    })
    const newMainPost = {...mainPost, comments:newCommentsPost}
    await postsCollection.replaceOne({_id: new ObjectId(postID)}, newMainPost)
    return { status: 200 };
  } catch (error) {
    return { status: 500 };
  }
};

