import { useState } from "react";
import fetch from "unfetch";

interface ICategory {
  id: string;
  title: string;
  posts?: Array<unknown>;
}

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

  const updateCategoryTitle = async ({ id, title }: ICategory) => {
    const updatedCategory: ICategory = await fetch(`/api/category/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        title,
      }),
    }).then((res) => res.json());
    const updatedCategoryIndex = categories.findIndex(
      (cat) => cat.id === updatedCategory.id
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
