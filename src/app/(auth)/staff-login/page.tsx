import React from "react";

const page = () => {
  return (
    <main className="main">
      <div className="flex justify-center items-center drop-shadow-lg">
        <div className="flex p-10 flex-col justify-between rounded-2xl h-full  bg-white w-[500px]">
          <h2 className="text-2xl font-bold  text-indigo-900">Login</h2>
          <form className="space-y-4 z-50 w-full ">
            <div className="mt-10 mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Account
              </label>
              <input
                type="text"
                id="username"
                data-testid="username"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@flowbite.com"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="******"
                data-testid="password"
                autoComplete="on"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <div className="flex items-start mb-5">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                />
              </div>
              <label
                htmlFor="remember"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Remember me
              </label>
            </div>
            <button
              // disabled={isSubmitting}
              type="submit"
              data-testid="login"
              className="w-full py-2 px-4 bg-black text-white rounded hover:bg-gray-900"
            >
              {/* {isSubmitting ? (
          <span className="loading loading-spinner loading-md"></span>
        ) : (
          "Login"
        )} */}
              Login
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default page;
