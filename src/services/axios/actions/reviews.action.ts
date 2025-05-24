import { client } from "..";
import { reviewsEndpoint } from "../endpoints/reviews.endpoint";
import mockReviews from "@/mock_data/reviews.json";

const reviewsAction = {
  async getAll() {
    // Using mock data instead of API call
    return mockReviews.reviews;
  },

  async getById(id: string) {
    // Using mock data instead of API call
    const review = mockReviews.reviews.find(r => r._id === id);
    return review;
  },

  async postReview(data: any) {
    // Simulate posting a review
    const newReview = {
      _id: `review${mockReviews.reviews.length + 1}`,
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    mockReviews.reviews.push(newReview);
    return newReview;
  },

  async deleteReview(id: string) {
    // Simulate deleting a review
    const index = mockReviews.reviews.findIndex(r => r._id === id);
    if (index !== -1) {
      mockReviews.reviews.splice(index, 1);
    }
    return { success: true };
  },

  async getByProductId(id: string) {
    // Using mock data instead of API call
    const reviews = mockReviews.reviews.filter(r => r.reviewsableId === id);
    return reviews;
  }
};

export default reviewsAction;