import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import ChannelVideoCard from "../components/ChannelVideoCard";
const Channel = () => {
  const { username } = useParams();
  const { isLoggedIn, currentUsername } = useAuthStore();
  const [channel, setChannel] = useState(null);
  const [subscribersCount, setSubscribersCount] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [videos, setVideos] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  const [videosCount, setVideosCount] = useState(0);
  const [playlistsCount, setPlaylistsCount] = useState(0);

  const [fetchedVideosCount, setFetchedVideosCount] = useState(0);
  const [fetchedPlaylistsCount, setFetchedPlaylistsCount] = useState(0);

  const [loading, setLoading] = useState(true);
  const [videosPage, setVideosPage] = useState(1);
  const [playlistsPage, setPlaylistsPage] = useState(1);
  const [videosLoading, setVideosLoading] = useState(false);
  const [playlistsLoading, setPlaylistsLoading] = useState(false);
  const [postsLoading, setPostsLoading] = useState(false);

  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("videos");
  let channelId = "";
  if (username) {
    channelId = username;
  } else {
    channelId = currentUsername;
  }
  const setupChannelData = async (message) => {
    setChannel(message.channelInfo[0]);
    // setPlaylists(message.channel.playlists);
    setSubscribersCount(message.channelInfo[0].subscribersCount);
    setIsSubscribed(message.channelInfo[0].isSubscribed);
    console.log("message.videoCount", message.videosCount);
    setVideosCount(() => {
      const newCount = message.videosCount;
      //and here it is 1
      console.log("channel videos count:", newCount);
      return newCount;
    });
    setPlaylistsCount(() => {
      const newCount = message.playlistsCount;
      console.log("playlists count:", newCount);
      return newCount;
    });
  };

  const handleSubscribe = async () => {
    if (!isLoggedIn) {
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
          withCredentials: true,
        }
      );
      if (response) {
        if (isSubscribed) {
          setIsSubscribed(!isSubscribed);
          setSubscribersCount((prev) => prev - 1);
        } else {
          setIsSubscribed(!isSubscribed);
          setSubscribersCount((prev) => prev + 1);
        }
        console.log("response:", response);
      }
    } catch (error) {
      console.error("Error on subscribe: ", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const channelData = await axios.get(
          `http://localhost:4000/api/v1/channel/get/${channelId}`,
          {
            headers: {
              // Let browser set Content-Type for FormData
              Accept: "application/json", // Backend likely expects this
            },
            withCredentials: true, // For CORS cookies
          }
        );

        console.log("currentChannel: ", channelData);
        setupChannelData(channelData.data.message);
        setError(null);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch channel data");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (channelId) {
      fetchData();
    }
  }, [channelId]);

  // Second useEffect fetch videos only after videosCount is available
  useEffect(() => {
    if (activeTab !== "videos") return;

    if (videosCount === 0) return;

    const getVideos = async () => {
      if (fetchedVideosCount >= videosCount) return;

      try {
        setVideosLoading(true);
        const channelVideos = await axios.get(
          `http://localhost:4000/api/v1/channel/get-channel-videos/${channelId}?page=${videosPage}&limit=20`,
          {
            headers: { Accept: "application/json" },
            withCredentials: "include",
          }
        );
        setVideosPage((prev) => prev + 1);
        setVideos((prev) => [
          ...prev,
          ...channelVideos.data.message.channelVideos,
        ]);

        setFetchedVideosCount((prev) => {
          const updatedCount =
            prev + channelVideos.data.message.channelVideos.length;
          console.log("fetched videos count:", updatedCount);
          return updatedCount;
        });

        setVideosLoading(false);
      } catch (error) {
        setError("while fetching videos", error);
        setVideosLoading(false);
      }
    };

    getVideos();

    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 50
      ) {
        getVideos();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [videosCount, channelId, fetchedVideosCount, activeTab, videosPage]);

  //third useEffect for playlist fetching
  useEffect(() => {
    if (activeTab !== "playlists") return;
    if (playlistsCount === 0) return; // wait for actual value
    console.log("playlistsCount:", playlistsCount);

    const getPlaylists = async () => {
      if (fetchedPlaylistsCount >= playlistsCount) return;

      try {
        setPlaylistsLoading(true);
        const channelPlaylists = await axios.get(
          `http://localhost:4000/api/v1/channel/get-channel-playlists/${channelId}?page=${playlistsPage}&limit=20`,
          {
            headers: { Accept: "application/json" },
            withCredentials: "include",
          }
        );
        console.log("channelPlaylists: ", channelPlaylists);

        setPlaylistsPage((prev) => prev + 1);
        setPlaylists((prev) => [
          ...prev,
          ...channelPlaylists.data.message.channelPlaylists,
        ]);

        setFetchedPlaylistsCount((prev) => {
          const updatedCount =
            prev + channelPlaylists.data.message.channelPlaylists.length;
          console.log("fetched playlists count:", updatedCount);
          return updatedCount;
        });
        if (channelPlaylists.data.message.channelPlaylists.length == 0) {
          console.log(
            "channel info is saying that there are ",
            playlistsCount,
            "public playlists but fetching 0. the issue is likely in backend"
          );

          setPlaylistsCount(0);
        }

        setPlaylistsLoading(false);
      } catch (error) {
        setError("while fetching playlists", error);
        setPlaylistsLoading(false);
      }
    };

    getPlaylists();

    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 50
      ) {
        getPlaylists();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [
    playlistsCount,
    channelId,
    fetchedPlaylistsCount,
    activeTab,
    playlistsPage,
  ]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen flex-col">
        <div className="flex justify-center items-center min-h-screen text-red-500">
          {error}
        </div>
        <button
          onClick={() => {
            window.history.back();
          }}
        >
          Go back
        </button>
      </div>
    );
  }

  if (!channel) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl">Channel not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Channel Header */}
      <div className="relative">
        <div className="aspect-[16/6] w-full overflow-hidden rounded-xl">
          <img
            className="w-full h-full object-cover"
            src={channel.coverImage}
            alt={channel.fullName}
          />
        </div>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-4  pb-4">
            <div className="flex justify-arround w-full items-center">
              <img
                src={channel.avatar}
                alt={channel.fullName}
                className="w-32 h-32 rounded-full border-4 border-black"
              />
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-2xl font-bold">{channel.fullName}</h1>
                <p className="text-gray-400">@{channelId}</p>
                <div className="flex items-center justify-center md:justify-start gap-4 mt-2">
                  <span className="text-sm">
                    {subscribersCount} subscribers
                  </span>
                  <span className="text-sm">{videosCount} videos</span>
                  {/* <span className="text-sm">{channel.totalVideos} videos</span> */}
                </div>
              </div>
            </div>
            <div className="align-start text-start w-full font-gray-800">
              {channel.bio}
            </div>
            <button
              onClick={handleSubscribe}
              className={`px-6 py-2 rounded-full transition-colors duration-200 ${
                isSubscribed
                  ? "bg-zinc-800 text-white hover:bg-zinc-700"
                  : "bg-gray-100 text-black hover:bg-gray-200"
              }`}
            >
              {isSubscribed ? "Unsubscribe" : "Subscribe"}
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab("videos")}
              className={`py-4 border-b-2 ${
                activeTab === "videos"
                  ? "border-white"
                  : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              VIDEOS
            </button>
            <button
              onClick={() => setActiveTab("playlists")}
              className={`py-4 border-b-2 ${
                activeTab === "playlists"
                  ? "border-white"
                  : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              PLAYLISTS
            </button>
            <button
              onClick={() => setActiveTab("posts")}
              className={`py-4 border-b-2 ${
                activeTab === "posts"
                  ? "border-white"
                  : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              POSTS
            </button>
            <button
              onClick={() => setActiveTab("about")}
              className={`py-4 border-b-2 ${
                activeTab === "about"
                  ? "border-white"
                  : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              ABOUT
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === "videos" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videos.map((video) => {
              //   console.log(video._id);
              return <ChannelVideoCard video={video} />;
            })}
            {videosLoading && (
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                {fetchedVideosCount >= videosCount ? (
                  <p className="text-white">All videos are here</p>
                ) : null}
              </div>
            )}
          </div>
        )}

        {activeTab === "playlists" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {playlists.map((playlist) => (
              <div
                key={playlist._id}
                className="bg-zinc-900 rounded-lg overflow-hidden hover:bg-zinc-800 transition-colors"
              >
                <div className="relative aspect-video">
                  <img
                    src={playlist.thumbnailUrl}
                    alt={playlist.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <span className="text-lg font-semibold">
                      {playlist.videoCount} videos
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">{playlist.title}</h3>
                  <p className="text-sm text-gray-400 mt-1">
                    {playlist.videoCount} videos • Updated{" "}
                    {new Date(playlist.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
            {/* section loading */}
            {playlistsLoading && (
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            )}
          </div>
        )}

        {activeTab === "about" && (
          <div className="max-w-3xl">
            <div className="prose prose-invert">
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p className="whitespace-pre-wrap">{channel.description}</p>

              <h2 className="text-xl font-semibold mt-8 mb-4">Details</h2>
              <div className="space-y-2">
                <div className="flex">
                  <span className="w-32 text-gray-400">Location</span>
                  <span>{channel.location || "Not specified"}</span>
                </div>
                <div className="flex">
                  <span className="w-32 text-gray-400">Joined</span>
                  <span>
                    {new Date(channel.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex">
                  <span className="w-32 text-gray-400">Total views</span>
                  <span>{channel.totalViews.toLocaleString()}</span>
                </div>
              </div>

              {channel.links && channel.links.length > 0 && (
                <>
                  <h2 className="text-xl font-semibold mt-8 mb-4">Links</h2>
                  <div className="space-y-2">
                    {channel.links.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-blue-400 hover:underline"
                      >
                        {link.title}
                      </a>
                    ))}
                  </div>
                </>
              )}
            </div>
            {/* section loading */}
            {sectionLoading && (
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Channel;
