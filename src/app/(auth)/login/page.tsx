// app/(auth)/login/page.tsx

import LoginForm from "@/components/auth/LoginForm";
import React from "react";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome to Shopz
          </h1>
          <p className="text-gray-600">Your one-stop shop for everything</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
