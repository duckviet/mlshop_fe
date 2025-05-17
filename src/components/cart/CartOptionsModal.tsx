import { useAddToCart } from "@/hooks/Cart/useAddToCart";
import { Cart } from "@/interfaces/Cart";
import { Product } from "@/interfaces/Product";
import { showSuccessToast } from "@/utils/showToast";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

interface CartOptionsModalProps {
  product: Product;
  modal: boolean;
  setModal: (state: boolean) => void;
}

const CartOptionsModal: React.FC<CartOptionsModalProps> = ({
  product,
  modal,
  setModal,
}) => {
  const { data: session } = useSession();
  const addToCart = useAddToCart();

  const initialOption = { size: "", color: "", material: "", quantity: 1 };
  const [option, setOption] = useState<{
    size: string;
    color: string;
    material: string;
    quantity: number;
  }>(initialOption);

  const handleAddToCart = async () => {
    await addToCart({
      customerId: session?.user.id,
      productId: product._id,
      ...option,
      price: product.price,
    } as Cart);
    showSuccessToast("Add to cart succesful");
    setOption(initialOption);
  };

  return (
    <div
      onClick={(e) => [e.preventDefault()]}
      className="fixed drop-shadow-lg bg-black bg-opacity-15 backdrop-blur-sm inset-0 flex items-center justify-center z-50"
    >
      <div className="bg-white p-5 rounded-xl min-w-[300px]">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-2xl">Options </h3>
          <button onClick={() => setModal(!modal)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              className="w-4 h-4"
            >
              <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
            </svg>
          </button>
        </div>
        <div className="divider"></div>

        <div className="mb-4">
          <p className="font-semibold">
            Quantity:
            <input
              value={option.quantity}
              type="text"
              className="w-10 px-2 border-solid border-2 rounded-md"
              onChange={(e) =>
                setOption((prevOption) => ({
                  ...prevOption,
                  quantity: Number(e.target.value),
                }))
              }
            />
          </p>
          <input
            type="range"
            min={0}
            max="20"
            onChange={(e) =>
              setOption((prevOption) => ({
                ...prevOption,
                quantity: Number(e.target.value),
              }))
            }
            value={option.quantity}
            className="range mt-2 range-sm"
          />
        </div>

        <div className="flex flex-col justify-between">
          <div className="mb-4">
            <p className="font-semibold">Color: {option.color}</p>
            <div className="flex gap-2 mt-2">
              {product?.variants?.color.map((cl: string, index: number) => (
                <div
                  key={index}
                  onClick={() =>
                    setOption((prevOption) => ({ ...prevOption, color: cl }))
                  }
                  className={
                    option.color === cl
                      ? `px-2 py-1 min-w-8 flex items-center justify-center bg-gray-200 rounded cursor-pointer border-solid border-2 border-black`
                      : `px-2 py-1 min-w-8 flex items-center justify-center bg-gray-200 rounded cursor-pointer`
                  }
                >
                  {cl}
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <p className="font-semibold">Size: {option.size}</p>
            <div className="flex gap-2 mt-2">
              {product?.variants?.size.map((sz: string, index: number) => (
                <div
                  key={index}
                  onClick={() =>
                    setOption((prevOption) => ({ ...prevOption, size: sz }))
                  }
                  className={
                    option.size === sz
                      ? `px-2 py-1 min-w-8 flex items-center justify-center bg-gray-200 rounded cursor-pointer border-solid border-2 border-black`
                      : `px-2 py-1 min-w-8 flex items-center justify-center bg-gray-200 rounded cursor-pointer`
                  }
                >
                  {sz}
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <p className="font-semibold">Material: {option.material}</p>
            <div className="flex gap-2 mt-2">
              {product?.variants?.material.map(
                (material: string, index: number) => (
                  <div
                    key={index}
                    onClick={() =>
                      setOption((prevOption) => ({
                        ...prevOption,
                        material: material,
                      }))
                    }
                    className={
                      option.material === material
                        ? `px-2 py-1 min-w-8 flex items-center justify-center bg-gray-200 rounded cursor-pointer border-solid border-2 border-black`
                        : `px-2 py-1 min-w-8 flex items-center justify-center bg-gray-200 rounded cursor-pointer`
                    }
                  >
                    {material}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
        <div className="modal-action">
          <button
            className="btn btn-sm btn-ghost"
            onClick={() => setModal(!modal)}
          >
            Close
          </button>
          <button
            className="btn bg-green-500 btn-sm text-white"
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartOptionsModal;
