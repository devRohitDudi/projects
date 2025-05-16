import React, { useEffect, useState } from "react";
import axios from "axios";
function Replies({ commentId }) {
  const [replies, setReplies] = useState([]);
  const [replyPage, setReplyPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isTotalFetched, setIsTotalFetched] = useState(false);

  const fetchSomeReplies = async () => {
    if (isTotalFetched) return;
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:4000/api/v1/video/get-replies/${commentId}?page=${replyPage}&limit=20`,
        { withCredentials: "include", headers: {} }
      );

      console.log("replies response:", response);
      const fetchedReplies = response.data.message.replies;

      if (fetchedReplies.length == 0) {
        setIsTotalFetched(true);
      }

      if (response.status == 200) {
        setReplies((prev) => [...prev, ...fetchedReplies]);
        setLoading(false);
        setReplyPage((prev) => prev + 1);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };
  useEffect(() => {
    if (isTotalFetched) return;
    fetchSomeReplies();
  }, []);
  return (
    <>
      <div>
        {replies.map((reply) => (
          <div
            key={reply._id}
            style={{
              paddingLeft: "1rem",
              marginBottom: "0.5rem",
              borderLeft: "2px solid #ddd",
              paddingBottom: "0.5rem",
            }}
          >
            <p style={{ margin: 0 }}>
              <strong>{reply.publisher?.fullName || "Unknown"}:</strong>{" "}
              {reply.message}
            </p>
            <small style={{ color: "gray" }}>
              {new Date(reply.createdAt).toLocaleString()}
            </small>
          </div>
        ))}
      </div>

      {!isTotalFetched && (
        <button onClick={fetchSomeReplies} disabled={loading}>
          {loading ? "Loading..." : "Load more"}
        </button>
      )}
    </>
  );
}

export default Replies;
