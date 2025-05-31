"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { showErrorToast, showSuccessToast } from "@/utils/showToast";
import { post } from "@/utils/apiRequest";
import authenticationAction from "@/services/axios/actions/authentication.action";

interface SignUpFormData {
  email: string;
  password: string;
  username: string;
  gender: "male" | "female" | "other";
  birthday: string;
  address: {
    street: string;
    city: string;
    country: string;
    detail: string;
  };
}

const SignUpForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState<SignUpFormData>({
    email: "",
    password: "",
    username: "",
    gender: "other",
    birthday: "",
    address: {
      street: "",
      city: "",
      country: "",
      detail: "",
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await authenticationAction.login(
        form.email,
        form.password
      );

      if (response.data) {
        showSuccessToast("Account created successfully!");
        router.push("/login");
      }
    } catch (error: any) {
      console.error("Error signing up:", error);
      showErrorToast(
        error.response?.data?.message || "Failed to create account"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddressChange = (
    field: keyof typeof form.address,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value,
      },
    }));
  };

  return (
    <div className="flex p-10 flex-col justify-between rounded-2xl h-full bg-white w-[500px] shadow-lg">
      <div>
        <h2 className="text-2xl font-bold text-indigo-900 mb-2">
          Create Account
        </h2>
        <p className="text-gray-600">Join our community today</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={form.username}
              onChange={(e) =>
                setForm((f) => ({ ...f, username: e.target.value }))
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={form.email}
              onChange={(e) =>
                setForm((f) => ({ ...f, email: e.target.value }))
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={form.password}
            onChange={(e) =>
              setForm((f) => ({ ...f, password: e.target.value }))
            }
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="gender"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Gender
            </label>
            <select
              id="gender"
              value={form.gender}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  gender: e.target.value as "male" | "female" | "other",
                }))
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="birthday"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Birthday
            </label>
            <input
              type="date"
              id="birthday"
              value={form.birthday}
              onChange={(e) =>
                setForm((f) => ({ ...f, birthday: e.target.value }))
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Address</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="street"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Street
              </label>
              <input
                type="text"
                id="street"
                value={form.address.street}
                onChange={(e) => handleAddressChange("street", e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>

            <div>
              <label
                htmlFor="city"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                value={form.address.city}
                onChange={(e) => handleAddressChange("city", e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>

            <div>
              <label
                htmlFor="country"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Country
              </label>
              <input
                type="text"
                id="country"
                value={form.address.country}
                onChange={(e) => handleAddressChange("country", e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>

            <div>
              <label
                htmlFor="detail"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Additional Details
              </label>
              <input
                type="text"
                id="detail"
                value={form.address.detail}
                onChange={(e) => handleAddressChange("detail", e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Creating account...
            </span>
          ) : (
            "Create Account"
          )}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
