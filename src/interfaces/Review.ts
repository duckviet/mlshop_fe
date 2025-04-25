export interface Reviews {
  _id: string;
  reviewsableId: string;
  reviewsableType: string;
  customerId: string;
  rating: number;
  content: string;
  parentId?: string;
  createdAt: Date;
  updatedAt: Date;
}
