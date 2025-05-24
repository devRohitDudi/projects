import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useAuthStore from "../store/useAuthStore.js";
import axios from "axios";
const Reply = ({ reply }) => {
  const [showReplies, setShowReplies] = useState(false);

  return (
    <div className="ml-6 mt-2">
      <div className="border p-2 rounded-md bg-gray-100">
        <p className="font-semibold">{reply.publisherUsername}</p>
        <p>{reply.content}</p>
      </div>
      {reply.replies?.length > 0 && (
        <>
          {!showReplies ? (
            <button
              className="text-sm text-blue-600 mt-1"
              onClick={() => setShowReplies(true)}
            >
              Show all {reply.replies.length} replies
            </button>
          ) : (
            <div className="mt-2">
              {reply.replies.map((r) => (
                <Reply key={r.id} reply={r} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

const PostComments = ({ comments }) => {
  const [commentText, setCommentText] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);
  const { post_id } = useParams();
  const { userAvatar } = useAuthStore();
  const handleComment = async () => {
    try {
      if (commentText.trim() === "") {
        return;
      }

      const response = await axios.post(
        `http://localhost:4000/api/v1/post/add-comment`,
        { post_id, message: commentText },
        { withCredentials: "include", headers: {} }
      );
      console.log(response);

      if (response.status === 200) {
        alert("comment added");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Comments</h2>
      <p>{comments.length} comments</p>
      <form onSubmit={handleComment} className="mb-6">
        <div className="flex gap-3">
          <img
            src={userAvatar}
            alt="Your avatar"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              className="w-full bg-transparent border-b border-zinc-700 pb-2 focus:border-blue-500 outline-none"
            />
            <div className="flex justify-end gap-2 mt-2">
              <button
                type="button"
                onClick={() => setCommentText("")}
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
        {comments.map((reply, index) => (
          <Reply key={index} reply={reply} />
        ))}
      </div>
    </div>
  );
};

export default PostComments;
