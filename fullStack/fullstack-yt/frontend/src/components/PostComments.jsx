import React, { useState } from "react";

const Reply = ({ reply }) => {
  const [showReplies, setShowReplies] = useState(false);

  return (
    <div className="ml-6 mt-2">
      <div className="border p-2 rounded-md bg-gray-100">
        <p className="font-semibold">{reply.author}</p>
        <p>{reply.text}</p>
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

const Comments = ({ comments }) => {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className="border p-4 rounded-md">
          <p className="font-bold">{comment.author}</p>
          <p>{comment.text}</p>

          {comment.replies?.length > 0 && <Reply reply={comment} />}
        </div>
      ))}
    </div>
  );
};

export default Comments;
