import React from "react";

const ProfileCard = () => {
  return (
    <div className="bg-white rounded-xl p-10 shadow-lg flex flex-col justify-between min-w-72">
      <div>
        <div>
          <div className="w-28 h-28 mx-auto  rounded-full overflow-hidden border-4 border-white relative">
            <picture></picture>
          </div>
        </div>

        <h2 className="text-3xl mb-5 font-bold text-gray-800 text-center">
          {}
        </h2>
        <div className="bg-gray-200 p-2 rounded-lg my-3">
          <p className="text-base font-medium">Basic Details</p>
        </div>

        <p className="text-sm text-gray-600 mb-2">
          <span className="text-sm font-semibold">Date of Birth</span> <br />
          <span className="text-sm">{}</span>
        </p>
        <p className="text-sm text-gray-600 mb-2">
          <span className="text-sm font-semibold">Address</span> <br />
          <span className="text-sm">
            {}, {}
          </span>
        </p>
        <p className="text-sm text-gray-600 mb-2">
          <span className="text-sm font-semibold">Identification</span> <br />
          <span className="text-sm">{}</span>
        </p>

        <div className="bg-gray-200 p-2 rounded-lg my-3">
          <p className="text-base font-medium">Contact Information</p>
        </div>
        <p className="text-sm text-gray-600 mb-2">
          <span className="text-sm font-semibold">Email</span> <br />
          <span className="text-sm">{}</span>
        </p>
        <p className="text-sm text-gray-600 mb-2">
          <span className="text-sm font-semibold">Phone</span> <br />
          <span className="text-sm">{}</span>
        </p>
      </div>
      <button
        className="btn btn-ghost"
        // onClick={() => setShowProfileModal(!showProfileModal)}
      >
        Edit profile
      </button>
    </div>
  );
};

export default ProfileCard;
