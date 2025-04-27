import React, { useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}
const CategoryFilter = ({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const container = scrollContainerRef.current;
      const targetScroll =
        direction === "left"
          ? container.scrollLeft - scrollAmount
          : container.scrollLeft + scrollAmount;
      container.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }
  };
  // Remove duplicates and add "All Products" category
  const uniqueCategories = ["All Products", ...new Set(categories)];
  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-4 flex items-center gap-4">
        <button
          onClick={() => scroll("left")}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
          aria-label="Scroll left"
        >
          <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
        </button>
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-x-auto flex items-center gap-3 scrollbar-hide scroll-smooth"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {uniqueCategories.map((category, index) => (
            <button
              key={index}
              onClick={() => onSelectCategory(category)}
              className={`
                px-6 py-2.5 rounded-full font-medium whitespace-nowrap transition-all
                ${
                  selectedCategory === category
                    ? "bg-primary text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>
        <button
          onClick={() => scroll("right")}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
          aria-label="Scroll right"
        >
          <ChevronRightIcon className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
};
export default CategoryFilter;
