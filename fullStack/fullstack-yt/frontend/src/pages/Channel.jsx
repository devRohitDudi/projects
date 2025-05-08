import { useState, useEffect } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const Channel = () => {
  const [searchParams] = useSearchParams();
  const { channelId } = useParams();
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("videos"); // videos, playlists, about

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const channelData = await axios.get(
          `http://localhost:4000/api/v1/channel/get/${channelId}`
        );
        const currentChannel = await channelData.json.stringify(channelData);
        console.log("currentChannel: ", currentChannel);

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
        <div className="h-48 bg-gradient-to-r from-blue-600 to-purple-600" />
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-4 -mt-16 pb-4">
            <img
              src={channel.avatarUrl}
              alt={channel.name}
              className="w-32 h-32 rounded-full border-4 border-black"
            />
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold">{channel.name}</h1>
              <p className="text-gray-400">@{channel.handle}</p>
              <div className="flex items-center justify-center md:justify-start gap-4 mt-2">
                <span className="text-sm">
                  {channel.subscribers} subscribers
                </span>
                <span className="text-sm">{channel.totalVideos} videos</span>
              </div>
            </div>
            <button className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700">
              Subscribe
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
            {videos.map((video) => (
              <Link
                key={video._id}
                to={`/watch?v=${video._id}`}
                className="group"
              >
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <span className="absolute bottom-2 right-2 bg-black bg-opacity-80 px-2 py-1 text-sm rounded">
                    {video.duration}
                  </span>
                </div>
                <div className="mt-2">
                  <h3 className="font-semibold line-clamp-2 group-hover:text-blue-400">
                    {video.title}
                  </h3>
                  <div className="text-sm text-gray-400 mt-1">
                    {video.views} views •{" "}
                    {new Date(video.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </Link>
            ))}
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Channel;
