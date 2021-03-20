import { useState } from "react";
import fetch from "unfetch";
import { ICategory } from "../models/category.model";

export default (): {
  categories: ICategory[];
  createCategory: (title: string) => void;
  updateCategoryTitle: (cat: ICategory) => void;
} => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  const createCategory = async (title: string) => {
    const newCategory: ICategory = await fetch("/api/category", {
      method: "POST",
      body: JSON.stringify({
        title,
      }),
    }).then((res) => res.json());

    setCategories((values) => [...values, newCategory]);
  };

  const updateCategoryTitle = async ({ _id, title }: ICategory) => {
    const updatedCategory: ICategory = await fetch(`/api/category/${_id}`, {
      method: "PUT",
      body: JSON.stringify({
        title,
      }),
    }).then((res) => res.json());
    const updatedCategoryIndex = categories.findIndex(
      (cat) => cat._id === updatedCategory._id
    );
    setCategories((values) => {
      values.splice(updatedCategoryIndex, 1, updatedCategory);
      return values;
    });
  };

  return {
    categories,
    createCategory,
    updateCategoryTitle,
  };
};
