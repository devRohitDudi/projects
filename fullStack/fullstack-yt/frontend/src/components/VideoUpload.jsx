import { useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { X, Upload, FileVideo } from "lucide-react";
import useAuthStore from "../store/useAuthStore";
const VideoUpload = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const thumbnailInputRef = useRef(null);
  const { isLoggedIn } = useAuthStore();
  if (!isLoggedIn) {
    // window.location.href = "/login";
  }
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith("video/")) {
      setFile(droppedFile);
    }
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith("video/")) {
      setFile(selectedFile);
    }
  };

  const handleThumbnailSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setThumbnail(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file || !title) {
      setError("Please provide a video file and title");
      return;
    }

    try {
      setIsUploading(true);
      setError(null);

      const formData = new FormData();
      formData.append("video", file);
      formData.append("title", title);
      formData.append("description", description);
      if (thumbnail) {
        formData.append("thumbnail", thumbnail);
      }

      await axios.post("/api/videos/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(progress);
        },
      });

      // Reset form
      setFile(null);
      setTitle("");
      setDescription("");
      setThumbnail(null);
      setUploadProgress(0);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to upload video");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-zinc-900 rounded-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Upload Video</h2>
          <Link to="/" className="text-gray-400 hover:text-white">
            <X size={24} />
          </Link>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}

        <div className="space-y-6">
          {/* Video Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center ${
              file ? "border-blue-500" : "border-gray-600"
            }`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="video/*"
              className="hidden"
            />
            {file ? (
              <div className="flex items-center justify-center gap-2">
                <FileVideo className="w-8 h-8 text-blue-500" />
                <span>{file.name}</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <Upload className="w-8 h-8 text-gray-400" />
                <p>Drag and drop your video here, or click to select</p>
                <p className="text-sm text-gray-400">
                  MP4 or WebM. Max file size: 100MB
                </p>
              </div>
            )}
          </div>

          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter video title"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 focus:border-blue-500 outline-none"
            />
          </div>

          {/* Description Input */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter video description"
              rows={4}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 focus:border-blue-500 outline-none"
            />
          </div>

          {/* Thumbnail Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">Thumbnail</label>
            <div
              className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer"
              onClick={() => thumbnailInputRef.current?.click()}
            >
              <input
                type="file"
                ref={thumbnailInputRef}
                onChange={handleThumbnailSelect}
                accept="image/*"
                className="hidden"
              />
              {thumbnail ? (
                <div className="flex items-center justify-center gap-2">
                  <img
                    src={URL.createObjectURL(thumbnail)}
                    alt="Thumbnail preview"
                    className="h-20 object-cover rounded"
                  />
                  <span>{thumbnail.name}</span>
                </div>
              ) : (
                <p className="text-gray-400">Click to upload thumbnail</p>
              )}
            </div>
          </div>

          {/* Upload Progress */}
          {isUploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Upload Button */}
          <button
            onClick={handleUpload}
            disabled={isUploading || !file || !title}
            className={`w-full py-3 rounded-lg font-medium ${
              isUploading || !file || !title
                ? "bg-zinc-700 text-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isUploading ? "Uploading..." : "Upload Video"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoUpload;
