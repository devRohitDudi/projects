import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
export default function PostPage() {
  const [post, setPost] = useState(null);
  const [postFetching, setPostFteching] = useState(false);
  const [commentsFetching, setCommentsFetching] = useState(false);
  const [commentsCount, setCommentsCount] = useState(null);
  const [fetchedCommentsCount, setFetchedCommentsCount] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentsPage, setCommentsPage] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);
  const { post_id } = useParams();
  const [postLoading, setPostLaoding] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(false);

  const fetchPost = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/v1/post/get/${post_id}`,
        { withCredentials: "include", headers: {} }
      );
      console.log("post response;", response);

      if (response.status === 200) {
        setPost(() => {
          return response.data.message.post;
        });
      }

      setPostLaoding(false);
    } catch (error) {
      setPostLaoding(false);
      console.error("while fetching post:", error);
    }
  };

  const fetchPostComents = async () => {
    try {
      setCommentsLoading(true);
      const response = await axios.get(
        `http://localhost:4000/api/v1/post/get-post-comments/${post_id}?page=${commentsPage}&limit=10`,
        { withCredentials: "include", headers: {} }
      );
      console.log("comments response:", response);
      const fetchedComments = response.data.message.comments;
      if (fetchPostComents.length <= 0) {
      }

      if (response.status === 200) {
        setCommentsPage((prev) => prev + 1);
        const fetchedComments = response.data.message.comments;
        setComments((prev) => [...prev, ...fetchedComments]);
        setFetchedCommentsCount((prev) => prev + fetchedComments.length);
      }
      setCommentsLoading(false);
    } catch (error) {
      setCommentsLoading(false);

      console.error("white fetching post comments", error);
    }
  };

  useEffect(() => {
    setPostLaoding(true);
    fetchPost();
  }, []);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % post.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? post.images.length - 1 : prev - 1));
  };

  if (postLoading)
    return <div className="text-center mt-10">Loading post...</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="bg-black shadow-md rounded-2xl p-6">
        <p className="text-gray-500 text-sm mb-4">
          By {post.owner.username} on {post.createdAt}
        </p>
        <p className="text-base  mb-4">{post.content}</p>

        {/* Pure JS Image Slider */}
        {post.images.length > 0 ? (
          <div className="relative w-full h-64 rounded-2xl overflow-hidden">
            <img
              src={post.images[currentImage]}
              alt={`Slide ${currentImage + 1}`}
              className="w-full h-full object-cover transition duration-300"
            />
            <button
              onClick={prevImage}
              className="absolute top-1/2 left-3 -translate-y-1/2 bg-black bg-opacity-40 text-white px-3 py-1 rounded-full"
            >
              ‹
            </button>
            <button
              onClick={nextImage}
              className="absolute top-1/2 right-3 -translate-y-1/2 bg-black bg-opacity-40 text-white px-3 py-1 rounded-full"
            >
              ›
            </button>
          </div>
        ) : null}
      </div>

      <div className="mt-8 bg-zinc-900 shadow-md rounded-2xl p-6"></div>
    </div>
  );
}
