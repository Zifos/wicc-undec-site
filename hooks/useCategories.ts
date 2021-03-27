import { useEffect, useState } from "react";
import { ICategory } from "../models/category.model";

const useCategories = (
  initialCategories?: ICategory[]
): {
  categories: ICategory[];
  loading: boolean;
  getCategories: () => Promise<{ success: boolean; categories?: ICategory[] }>;
  createCategory: (title: string) => void;
  updateCategoryTitle: (cat: ICategory) => void;
  deleteCategory: (_id: string) => Promise<{ success: boolean }>;
} => {
  const [categories, setCategories] = useState<ICategory[]>(
    initialCategories || []
  );
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    if (!initialCategories && categories?.length) {
      fetch("/api/category").then(async (res) => {
        if (res.ok) {
          const response = await res.json();
          setCategories(response.categories);
        }
      });
    }
  }, [categories?.length, initialCategories, setCategories]);

  const createCategory = async (title: string) => {
    setLoading(true);
    const {
      newCategory,
    }: { success: boolean; newCategory: ICategory } = await fetch(
      "/api/category",
      {
        method: "POST",
        body: JSON.stringify({
          title,
        }),
      }
    ).then((res) => res.json());

    setCategories((values) => [...values, newCategory]);
    setLoading(false);
  };

  const updateCategoryTitle = async ({ _id, title }: ICategory) => {
    setLoading(true);
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
      return [...values];
    });
    setLoading(false);
  };

  const deleteCategory = async (_id: string) => {
    setLoading(true);
    const success = await fetch(`/api/category/${_id}`, {
      method: "DELETE",
    }).then((res) => res.json());
    const updatedCategoryIndex = categories.findIndex((cat) => cat._id === _id);
    setCategories((values) => {
      values.splice(updatedCategoryIndex, 1);
      return [...values];
    });
    setLoading(false);
    return success as { success: boolean };
  };

  const getCategories = (): Promise<{
    success: boolean;
    categories?: ICategory[];
  }> =>
    fetch("/api/category").then(async (res) => {
      if (res.ok) {
        const response = await res.json();
        if (response.categories) {
          setCategories(response.categories);
        }

        return { success: response.success, categories: response.categories };
      }
      return { success: false };
    });

  return {
    categories,
    loading,
    getCategories,
    createCategory,
    updateCategoryTitle,
    deleteCategory,
  };
};

export default useCategories;
