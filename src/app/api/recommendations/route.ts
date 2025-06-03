import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { session_id, current_events, top_k } = body;

    // Here you would typically call your recommendation service/ML model
    // For now, we'll return mock data
    const recommendations = [
      {
        _id: "1",
        name: "Product 1",
        price: 99.99,
        category: "Electronics",
        image: "https://example.com/image1.jpg",
      },
      {
        _id: "2",
        name: "Product 2",
        price: 149.99,
        category: "Electronics",
        image: "https://example.com/image2.jpg",
      },
      {
        _id: "3",
        name: "Product 3",
        price: 149.99,
        category: "Electronics",
        image: "https://example.com/image2.jpg",
      },
      {
        _id: "4",
        name: "Product 4",
        price: 149.99,
        category: "Electronics",
        image: "https://example.com/image2.jpg",
      },
      {
        _id: "5",
        name: "Product 5",
        price: 149.99,
        category: "Electronics",
        image: "https://example.com/image2.jpg",
      },
      {
        _id: "6",
        name: "Product 6",
        price: 149.99,
        category: "Electronics",
        image: "https://example.com/image2.jpg",
      },
    ];

    const response = await axios.post(
      "http://192.168.28.39:8000/recommendations",
      {
        session_id,
        current_events,
        top_k,
      }
    );
    console.log(response);
    return NextResponse.json(recommendations);
  } catch (error) {
    console.error("Error in recommendations API:", error);
    return NextResponse.json(
      { error: "Failed to get recommendations" },
      { status: 500 }
    );
  }
}
