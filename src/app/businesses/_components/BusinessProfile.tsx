import React from "react";
const BusinessProfile = ({ information, productCount }: any) => {
  const defaultCover =
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";
  const defaultLogo =
    "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80";
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Cover Image Section */}
      <div className="relative h-80">
        <img
          src={information?.coverImage || defaultCover}
          alt="Business Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/60" />
        {/* Business Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="flex items-end gap-8">
            {/* Logo */}
            <div className="relative">
              <img
                src={information?.logo || defaultLogo}
                alt="Business Logo"
                className="w-32 h-32 rounded-2xl border-4 border-white shadow-lg object-cover"
              />
            </div>
            {/* Business Details */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-2">
                {information?.name}
              </h1>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
                  {information?.category}
                </span>
                <span className="text-white/80 text-sm">
                  Joined {new Date(information?.createAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            {/* Action Buttons */}
            <div className="flex gap-4">
              <button className="px-6 py-2.5 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors shadow-lg">
                Follow
              </button>
              <button className="px-6 py-2.5 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-full font-medium hover:bg-white/20 transition-colors">
                Message
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Business Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 p-8 border-b border-gray-100">
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-800">{productCount}</div>
          <div className="text-gray-500 mt-1">Products</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-800">4.5</div>
          <div className="text-gray-500 mt-1">Rating</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-800">100</div>
          <div className="text-gray-500 mt-1">Followers</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-800">
            {new Date(information?.createAt).getFullYear().toString()}
          </div>
          <div className="text-gray-500 mt-1">Est.</div>
        </div>
      </div>
      {/* Contact Information */}
      <div className="px-8 py-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-primary"
              viewBox="0 0 28.314 28.323"
            >
              <path d="m27.728 20.384-4.242-4.242a1.982 1.982 0 0 0-1.413-.586h-.002c-.534 0-1.036.209-1.413.586L17.83 18.97l-8.485-8.485 2.828-2.828c.78-.78.78-2.05-.001-2.83L7.929.585A1.986 1.986 0 0 0 6.516 0h-.001C5.98 0 5.478.209 5.101.587L.858 4.83C.729 4.958-.389 6.168.142 8.827c.626 3.129 3.246 7.019 7.787 11.56 6.499 6.499 10.598 7.937 12.953 7.937 1.63 0 2.426-.689 2.604-.867l4.242-4.242c.378-.378.587-.881.586-1.416 0-.534-.208-1.037-.586-1.415zm-5.656 5.658c-.028.028-3.409 2.249-12.729-7.07C-.178 9.452 2.276 6.243 2.272 6.244L6.515 2l4.243 4.244-3.535 3.535a.999.999 0 0 0 0 1.414l9.899 9.899a.999.999 0 0 0 1.414 0l3.535-3.536 4.243 4.244-4.242 4.242z" />
            </svg>
          </div>
          <div>
            <div className="text-sm text-gray-500">Phone</div>
            <div className="text-gray-800">{information?.phone}</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <svg
              className="h-5 w-5 text-primary"
              data-name="1-Email"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
            >
              <path d="M29 4H3a3 3 0 0 0-3 3v18a3 3 0 0 0 3 3h26a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-.72 2L16 14.77 3.72 6zM30 25a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.23l13.42 9.58a1 1 0 0 0 1.16 0L30 7.23z" />
            </svg>
          </div>
          <div>
            <div className="text-sm text-gray-500">Email</div>
            <div className="text-gray-800">{information?.email}</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-primary"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <div className="text-sm text-gray-500">Address</div>
            <div className="text-gray-800">
              {information?.address.street}, {information?.address.city}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BusinessProfile;
