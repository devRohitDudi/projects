import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import VideoSuggestions from "../components/VideoSuggestions";
import Comments from "../components/Comments";

const Watch = () => {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  const [video, setVideo] = useState(null);
  const [isVideoFetched, setIsVideoFetched] = useState(false);
  const [channelPreview, setChannelPreview] = useState(null);
  //   const [suggestedVideos, setSuggestedVideos] = useState([]);
  const [commentsCount, setCommentsCount] = useState(0);
  const [likesCount, setLikesCount] = useState(0);
  const [subscribersCount, setSubscribersCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentsPage, setCommentsPage] = useState(0);
  const [viewAdded, setViewAdded] = useState(false);

  //TODO isLiked? && isDisliked?
  // for fetching video
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setLoading(true);
        console.log("videoId is:", videoId);

        const videoRes = await axios.get(
          `http://localhost:4000/api/v1/video/watch/${videoId}`
        );

        console.log("videoRes: ", videoRes);
        setIsVideoFetched(() => {
          const fetched = true;
          return fetched;
        });
        setVideo(videoRes.data.message.video);
        setChannelPreview(videoRes.data.message.channel);
        setCommentsCount(videoRes.data.message.commentsCount);
        setLikesCount(videoRes.data.message.likesCount);
        setSubscribersCount(videoRes.data.message.subscribersCount);
        // setComments(commentsRes.data);
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
    try {
      const response = await axios.get(
        `http://localhost:4000/api/v1/video/comments/${videoId}?page=${commentsPage}&limit=20`
      );

      console.log("Comments: ", response);

      setComments((prev) => {
        return [...prev, ...response.data.message.comments];
      });

      setCommentsPage((prev) => prev + 1);
    } catch (error) {
      console.log("Error while fetching comments: ", error);
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
                <button className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700">
                  Subscribe
                </button>
              </div>

              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 px-4 py-2 bg-zinc-800 rounded-full hover:bg-zinc-700">
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

                  {likesCount}
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
