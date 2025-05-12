import { Link } from "react-router-dom";
import { useState } from "react";

function ChannelPostCard({ post }) {
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
              src={images[currentIndex].url}
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

        <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-blue-400">
          {post.title}
        </h3>
        <p className="text-sm text-gray-300 mt-2 line-clamp-3">
          {post.content}
        </p>
        <div className="text-xs text-gray-500 mt-3">
          {post.likes} likes • {new Date(post.createdAt).toLocaleDateString()}
        </div>
      </div>
    </Link>
  );
}

export default ChannelPostCard;
