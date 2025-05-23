import { Link } from "react-router-dom";
import { useState } from "react";

function ChannelPostCard({ post }) {
  console.log("post is:", post);

  const [currentIndex, setCurrentIndex] = useState(0);
  const images = post.images || [];

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Link to={`/post/${post._id}`} className="group block">
      <div className="border border-gray-800 rounded-lg p-4 hover:border-blue-500 transition-colors">
        {images.length > 0 && (
          <div className="relative aspect-video rounded-lg overflow-hidden mb-3">
            <img
              src={images[currentIndex]}
              alt={`Post image ${currentIndex + 1}`}
              className="w-full h-full object-cover"
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    prevImage();
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 px-2 py-1 text-white rounded"
                >
                  ‹
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    nextImage();
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 px-2 py-1 text-white rounded"
                >
                  ›
                </button>
              </>
            )}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-300 mt-2 line-clamp-3">
              {post.content}
            </p>
            <div className="text-xs text-gray-500 mt-3">
              {post.likes} likes •{" "}
              {new Date(post.createdAt).toLocaleDateString()}
            </div>
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e3e3e3"
            >
              <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ChannelPostCard;
