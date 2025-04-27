import { useDeleteReviews } from "@/hooks/Reviews/useDeleteReviews";
import Image from "next/image";
import React from "react";
import { format } from "date-fns"; // Import date-fns for better date formatting

interface CommentProps {
  _id: string;
  customerId: string; // In a real app, you'd likely pass a user object here
  content: string;
  rating: number;
  commentAt: string;
}

const Comment: React.FC<CommentProps> = ({
  _id,
  // Assuming customerId is just a string ID for now
  // In a real app, you might fetch user details or receive a user object
  customerId,
  content,
  rating,
  commentAt,
}) => {
  const deleteReviews = useDeleteReviews();
  const handleDeleteReviews = () => {
    deleteReviews(_id); // _id is already string, no need for `as string`
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
          className="w-4 h-4 fill-yellow-400" // Changed to yellow fill for rating
        >
          <path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z" />
        </svg>
      );
    }
    // Add empty stars for a full 5-star representation
    for (let i = rating; i < 5; i++) {
      stars.push(
        <svg
          key={i + rating}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
          className="w-4 h-4 fill-gray-300" // Gray fill for empty stars
        >
          <path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z" />
        </svg>
      );
    }
    return stars;
  };

  // Format the date using date-fns
  const formattedDate = commentAt ? format(new Date(commentAt), "PP") : "N/A";

  // In a real app, you'd likely get the user's avatar and name from a user object
  const userInitial = customerId ? customerId.charAt(0).toUpperCase() : "U"; // Fallback to 'U'
  const userName = customerId || "Anonymous User"; // Fallback name

  return (
    <div className="border-b border-gray-200 py-6">
      {" "}
      {/* Use border-b for separation */}
      <div className="flex items-start gap-4">
        {" "}
        {/* Use items-start for top alignment */}
        {/* User Avatar/Initial */}
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-bold text-lg flex-shrink-0">
          {userInitial} {/* Display initial or an avatar image */}
          {/* You would use an Image component here if you had actual avatar URLs */}
          {/* <Image src="/path/to/avatar.jpg" alt="User Avatar" width={40} height={40} className="w-10 h-10 rounded-full object-cover"/> */}
        </div>
        <div className="flex-1">
          {/* User Info and Dropdown */}
          <div className="flex items-center justify-between mb-1">
            <div>
              <p className="font-semibold text-gray-900">{userName}</p>
              <p className="text-sm text-gray-500">{formattedDate}</p>
            </div>
            {/* Dropdown Menu */}
            <div className="dropdown dropdown-end">
              <button tabIndex={0} role="button" className="btn btn-ghost p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="w-4 h-4 text-gray-500"
                >
                  <path
                    fill="currentColor"
                    d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z"
                  />
                </svg>
              </button>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-40 p-2 shadow"
              >
                <li onClick={handleDeleteReviews}>
                  {/* Added hover effect and better spacing */}
                  <a className="flex items-center justify-between text-red-500 hover:bg-red-50 hover:text-red-600 rounded-md p-2">
                    Delete
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      className="w-4 h-4 fill-red-500 group-hover:fill-red-600"
                    >
                      <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
                    </svg>
                  </a>
                </li>
                {/* Report Option if needed */}
                {/* <li>
                  <a className="flex items-center justify-between text-gray-700 hover:bg-gray-100 rounded-md p-2">
                    Report
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      className="w-4 h-4 fill-gray-700"
                    >
                      <path d="M64 32C64 14.3 49.7 0 32 0S0 14.3 0 32L0 64 0 368 0 480c0 17.7 14.3 32 32 32s32-14.3 32-32l0-128 64.3-16.1c41.1-10.3 84.6-5.5 122.5 13.4c44.2 22.1 95.5 24.8 141.7 7.4l34.7-13c12.5-4.7 20.8-16.6 20.8-30l0-247.7c0-23-24.2-38-44.8-27.7l-9.6 4.8c-46.3 23.2-100.8 23.2-147.1 0c-35.1-17.6-75.4-22-113.5-12.5L64 48l0-16z" />
                    </svg>
                  </a>
                </li> */}
              </ul>
            </div>
          </div>

          {/* Rating Stars */}
          <div className="flex gap-0.5 mb-3">
            {" "}
            {/* Tighter gap for stars */}
            {renderStars()}
          </div>

          {/* Comment Content */}
          <p className="text-gray-800 mb-4">{content}</p>

          {/* Interaction Buttons (Reply, Likes, Dislikes) */}
          {/* Removed the Reply and Like/Dislike sections for simplicity based on common comment UI patterns.
              You can add them back if needed, styled appropriately.
              Comment UI often doesn't have per-comment likes/dislikes right on the main list.
              Replies are usually a separate nested component.
          */}

          {/* Optional: Add a divider if you want more separation between comments */}
          {/* <div className="divider mt-4 mb-0"></div> */}
        </div>
      </div>
    </div>
  );
};

export default Comment;
