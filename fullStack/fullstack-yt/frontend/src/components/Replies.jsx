import React, { useEffect, useState } from "react";
import axios from "axios";
function Replies({ commentId }) {
  const [replies, setReplies] = useState([]);
  const [replyPage, setReplyPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isTotalFetched, setIsTotalFetched] = useState(false);

  const fetchSomeReplies = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:4000/api/v1/video/get-replies/${commentId}?page=${replyPage}&limit=20`
      );

      console.log("replies response:", await response);

      //   const fetchedReplies = response.data.message.replies;

      if (response.status == 200) {
        // setReplies((prev) => [...prev, ...fetch]);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);

      alert("Error occured while fetching replies");
    }
  };
  useEffect(() => {
    fetchSomeReplies();
  }, []);

  return (
    <>
      <div>replies</div>
      <button onClick={fetchSomeReplies}>Load more</button>
    </>
  );
}

export default Replies;
