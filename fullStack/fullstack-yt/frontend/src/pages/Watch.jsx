import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import VideoSuggestions from "../components/VideoSuggestions";
import Comments from "../components/Comments";
import useAuthStore from "../store/useAuthStore";
const Watch = () => {
  const isLoggedIn = useAuthStore();
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  const [video, setVideo] = useState(null);
  const [isVideoFetched, setIsVideoFetched] = useState(false);
  const [isCommentsFetched, setIsCommentsFetched] = useState(false);
  const [isCommentsFetching, setIsCommentsFetching] = useState(false);

  const [channelPreview, setChannelPreview] = useState(null);
  //   const [suggestedVideos, setSuggestedVideos] = useState([]);
  const [commentsCount, setCommentsCount] = useState(0);
  const [likesCount, setLikesCount] = useState(0);
  const [subscribersCount, setSubscribersCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentsPage, setCommentsPage] = useState(1);
  const [viewAdded, setViewAdded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [channelId, setChannelId] = useState(null);
  //TODO isLiked? && isDisliked?
  // for fetching video
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setLoading(true);

        const videoRes = await axios.get(
          `http://localhost:4000/api/v1/video/watch/${videoId}`,
          {
            withCredentials: "include",
            headers: {},
          }
        );

        console.log("videoRes: ", videoRes);
        setIsVideoFetched(() => {
          const fetched = true;
          return fetched;
        });
        setVideo(videoRes.data.message.video);
        setChannelPreview(videoRes.data.message.channel);
        setChannelId(videoRes.data.message.channel.username);
        setCommentsCount(videoRes.data.message.commentsCount);
        setLikesCount(videoRes.data.message.likesCount);
        setSubscribersCount(videoRes.data.message.subscribersCount);
        setIsLiked(videoRes.data.message.isLiked);
        setIsDisliked(videoRes.data.message.isDisliked);
        setIsSubscribed(videoRes.data.message.isSubscribed);

        setError(null);
      } catch (error) {
        setError(error.response?.data?.message || "failed to fetch video");
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (videoId) {
      if (!isVideoFetched) {
        fetchVideo();
      }
    }
  }, [videoId, isVideoFetched]);

  //for add view history
  useEffect(() => {
    const addViewhistory = async () => {
      const addToHistoryRes = await axios.patch(
        `http://localhost:4000/api/v1/video/add-view-history/${videoId}`,
        {},
        { withCredentials: "include" }
      );
      if (addToHistoryRes.status === 200) {
        setViewAdded(() => {
          const added = true;
          return added;
        });
        console.log(addToHistoryRes.data.message);
      }
    };

    if (video) {
      if (!viewAdded) {
        addViewhistory();
      }
    }
  }, [video, videoId, viewAdded]);

  const fetchSomeComments = async () => {
    if (isCommentsFetching || isCommentsFetched) return;
    try {
      setIsCommentsFetching(true);
      const response = await axios.get(
        `http://localhost:4000/api/v1/video/comments/${videoId}?page=${commentsPage}&limit=20`,
        { withCredentials: "include", headers: {} }
      );

      console.log("Comments: ", response);
      const newComments = await response.data.message.comments;
      if (newComments.length == 0) {
        setIsCommentsFetched(true);
      }

      setComments((prev) => {
        return [...prev, ...newComments];
      });

      setCommentsPage((prev) => prev + 1);
      setIsCommentsFetching(false);
    } catch (error) {
      setIsCommentsFetching(false);
    }
  };
  useEffect(() => {
    const handleScroll = () => {
      if (isCommentsFetching || isCommentsFetched) return;

      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 50
      ) {
        fetchSomeComments();
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Trigger fetch only once on first render
    fetchSomeComments();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [video, isCommentsFetched, comments, commentsPage]);

  async function handleLike() {
    if (isDisliked) {
      handleDislike();
    }
    try {
      const response = await axios.patch(
        `http://localhost:4000/api/v1/video/add-like/${videoId}`,
        {},
        {
          withCredentials: "include",
          headers: {},
        }
      );
      if (response.status == 200) {
        setLikesCount((prev) => {
          if (isLiked) {
            return prev - 1;
          } else {
            return prev + 1;
          }
        });
        setIsLiked((prev) => !prev);
      }
    } catch (error) {
      console.log("Error occured while liking the video");
    }
  }
  async function handleDislike() {
    if (isLiked) {
      handleLike();
    }
    try {
      const response = await axios.patch(
        `http://localhost:4000/api/v1/video/add-like/${videoId}`,
        {},
        {
          withCredentials: "include",
          headers: {},
        }
      );
      if (response.status == 200) {
        setIsDisliked((prev) => !prev);
      }
    } catch (error) {
      console.log("Error occured while liking the video");
    }
  }
  const handleSubscribe = async () => {
    if (!isLoggedIn) {
      console.log("islogin?", isLoggedIn);

      alert("Login is required to subscribe");
      return;
    }
    try {
      const response = await axios.patch(
        `http://localhost:4000/api/v1/channel/subscribe/${channelId}`,
        {}, // Empty body if no data
        {
          headers: {
            Accept: "application/json",
          },
          withCredentials: "include",
        }
      );
      if (response.status == 200) {
        setIsSubscribed(!isSubscribed);
        setSubscribersCount((prev) => {
          if (isSubscribed) {
            return prev - 1;
          } else {
            return prev + 1;
          }
        });
      }
    } catch (error) {
      console.error(error || "Error occured while subscribing");
    }
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        {error}
      </div>
    );
  }

  if (!video) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl">Video not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1">
          {/* Video Player */}
          <div className="aspect-video bg-black rounded-lg overflow-hidden">
            <video
              src={video.videoURL}
              controls
              className="w-full h-full"
              poster={video.thumbnail1}
            />
          </div>

          {/* Video Info */}
          <div className="mt-4">
            <h1 className="text-2xl font-bold">{video.title}</h1>

            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <img
                    src={channelPreview.avatar}
                    alt={channelPreview.username}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold">{channelPreview.fullName}</h3>
                    <p className="text-sm text-gray-400">
                      {subscribersCount} subscribers
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleSubscribe();
                  }}
                  className={`
                    ${
                      isSubscribed
                        ? "bg-gray-800 hover:bg-gray-500"
                        : "bg-red-600 hover:bg-red-500"
                    }
                    px-4 py-2 text-white rounded-full transition-colors duration-200
                  `}
                >
                  {isSubscribed ? "Unsubscribe" : "Subscribe"}
                </button>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => {
                    handleLike();
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-zinc-800 rounded-full hover:bg-zinc-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill={isLiked ? "blue" : "currentColor"}
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>

                  {likesCount}
                </button>
                <button
                  onClick={() => {
                    handleDislike();
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-zinc-800 rounded-full hover:bg-zinc-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill={isDisliked ? "blue" : "currentColor"}
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Dislike
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-zinc-800 rounded-full hover:bg-zinc-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#e3e3e3"
                  >
                    <path d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Zm80-122 200-86 200 86v-518H280v518Zm0-518h400-400Z" />
                  </svg>
                  Add to
                </button>

                <button className="flex items-center gap-2 px-4 py-2 bg-zinc-800 rounded-full hover:bg-zinc-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Share
                </button>
              </div>
            </div>
          </div>

          {/* Video Description */}
          <div className="mt-4 p-4 bg-zinc-900 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
              <span>{video.views} views</span>
              <span>•</span>
              <span>{new Date(video.createdAt).toLocaleDateString()}</span>
            </div>
            <p className="whitespace-pre-wrap">{video.description}</p>
          </div>

          {/* Comments Section */}
          <Comments
            comments={comments}
            commentsCount={commentsCount}
            videoId={videoId}
          />
        </div>

        {/* Suggested Videos Sidebar */}
        <div className="lg:w-80">
          suggested videos
          {/* <VideoSuggestions videos={suggestedVideos} /> */}
        </div>
      </div>
    </div>
  );
};

export default Watch;
