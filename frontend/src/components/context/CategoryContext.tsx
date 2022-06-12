import React from "react";

interface Category {
  id: number;
  description: string;
}

interface CategoryContextValues {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

const CategoryContext = React.createContext<CategoryContextValues>({
  categories: [],
  setCategories: () => {},
});

export default CategoryContext;
