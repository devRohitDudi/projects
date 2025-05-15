import { useState } from "react";
import axios from "axios";
//baby comp for rendering every comment
const Comment = ({ comment }) => {
  return (
    <div className="flex gap-3 py-4 border-b border-zinc-800">
      <img
        src={comment.publisher.avatar}
        alt={comment.publisher.username}
        className="w-10 h-10 rounded-full"
      />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-medium">{comment.publisher.fullName}</span>
          <span className="text-sm text-gray-400">
            {new Date(comment.createdAt).toLocaleDateString()}
          </span>
        </div>
        <p className="mt-1 text-sm">{comment.message}</p>
        <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
          <button className="flex items-center gap-1 hover:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
            {comment.likeCount}
          </button>
          <button className="flex items-center gap-1 hover:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Dislike
          </button>
          <button className="hover:text-white">Reply</button>
        </div>
      </div>
    </div>
  );
};

const Comments = ({ comments, commentsCount, videoId }) => {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const message = newComment;
      const response = await axios.post(
        `http://localhost:4000/api/v1/video/add-comment/${videoId}`,
        { message },
        {
          headers: { Accept: "application/json" },
          withCredentials: "include",
        }
      );

      if (response.status === 200) {
        alert("Comment created successfully");
        if (onCommentAdded) {
          onCommentAdded(response.data.message.comment);
        }
      }
    } catch (error) {
      console.log("error while creating comment", error);
    }

    setNewComment("");
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Comments</h2>
      <p>{commentsCount} comments</p>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-3">
          <img
            src="https://via.placeholder.com/40"
            alt="Your avatar"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full bg-transparent border-b border-zinc-700 pb-2 focus:border-blue-500 outline-none"
            />
            <div className="flex justify-end gap-2 mt-2">
              <button
                type="button"
                onClick={() => setNewComment("")}
                className="px-4 py-2 text-sm text-gray-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-full hover:bg-blue-700"
              >
                Comment
              </button>
            </div>
          </div>
        </div>
      </form>

      <div className="space-y-2">
        {comments.map((comment, index) => (
          <Comment key={index} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default Comments;
