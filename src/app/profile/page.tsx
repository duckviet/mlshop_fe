"use client";
import { useSession } from "next-auth/react";
import useApi from "@/hooks/useApi";
// import { useCustomer } from "@/providers/CustomerProvider";
import { ordersEndpoint } from "@/services/axios/endpoints/order.endpoint";
import React from "react";
import {
  FaShoppingBag,
  FaUser,
  FaBox,
  FaCreditCard,
  FaCalendarAlt,
} from "react-icons/fa";

const Page = () => {
  const { data: session } = useSession();
  const { data: myOrders } = useApi<any>(
    `${process.env.NEXT_PUBLIC_SERVER}${ordersEndpoint["get-by-customerId"](
      session?.user?.id as string
    )}`,
    "GET"
  );
  // const profile = useCustomer();

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
                <div className="w-32 h-32 mx-auto bg-white rounded-full flex items-center justify-center border-4 border-white shadow-inner">
                  <FaUser className="text-blue-500 text-5xl" />
                </div>
              </div>
              <div className="p-6 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  profile?.username
                </h2>
                <p className="text-gray-600 mb-4">profile?.email</p>
                <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-indigo-700 transition duration-300 shadow-md">
                  Edit Profile
                </button>
              </div>
            </div>
            <div className="mt-8 bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Account Summary
              </h3>
              <div className="space-y-4">
                <div className="flex items-center text-gray-700">
                  <FaBox className="mr-3 text-blue-500" />
                  <span>Total Orders: {myOrders?.length || 0}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <FaCreditCard className="mr-3 text-blue-500" />
                  <span>Payment Methods: 2</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <FaCalendarAlt className="mr-3 text-blue-500" />
                  <span>Member Since: {new Date().getFullYear()}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                <FaShoppingBag className="mr-3 text-blue-500" /> My Orders
              </h2>
              {myOrders && myOrders.length > 0 ? (
                <div className="space-y-8">
                  {myOrders.map((order: any) => (
                    <div
                      key={order._id}
                      className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition duration-300"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-gray-800">
                          Order #{order._id.slice(-6)}
                        </h3>
                        <span
                          className={`px-4 py-2 text-sm font-semibold rounded-full ${
                            order.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {order.items.map((item: any) => (
                          <div
                            key={item._id}
                            className="flex items-center bg-white p-4 rounded-lg shadow-sm min-w-[500px]"
                          >
                            <img
                              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                              alt="Product"
                              className="w-20 mr-3 h-20 object-cover  rounded-md"
                            />{" "}
                            <div className="flex-grow">
                              <p className="font-semibold text-gray-800">
                                {item.productId}
                              </p>
                              <p className="text-sm text-gray-600">
                                {item.quantity}x {item.size} {item.color}
                              </p>
                              <p className="font-medium text-blue-600">
                                ${item.price.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 items-end flex justify-between">
                        <p className="text-sm font-light">
                          Order date: {order.orderDate.slice(0, 10)}
                        </p>
                        <div>
                          <p className="text-sm text-gray-600">Total Amount</p>
                          <p className="text-2xl font-bold text-gray-800">
                            ${order.totalAmount.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <FaShoppingBag className="mx-auto text-gray-300 text-6xl mb-4" />
                  <p className="text-2xl font-semibold text-gray-600 mb-4">
                    You have no orders yet
                  </p>
                  <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-indigo-700 transition duration-300 shadow-md">
                    Start Shopping
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
