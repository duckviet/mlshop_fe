// app/product/[id]/page.tsx
import PostDetail from "@/components/post/PostDetail";
import businessesAction from "@/services/axios/actions/businesses.action";
import productAction from "@/services/axios/actions/product.endpoint";
import type { Metadata, ResolvingMetadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function getProductData(id: string) {
  try {
    const product = await productAction.getById(id);
    if (!product) {
      throw new Error("Product not found");
    }
    const businesses = product.businessesId
      ? await businessesAction.getById(product.businessesId)
      : null;
    return { product, businesses };
  } catch (error) {
    console.error("Error fetching product data:", error);
    return { product: null, businesses: null };
  }
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params;
  const { product } = await getProductData(id);
  const previousImages = (await parent).openGraph?.images || [];

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found",
    };
  }

  return {
    title: product.name || "Product Detail",
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image || "/default-product.jpg", ...previousImages],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const { product, businesses } = await getProductData(id);

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-600">
            The requested product could not be found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <PostDetail product={product} businesses={businesses} productId={id} />
  );
}
