import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getProdcuts } from "@/redux/products/thunk";
import { useEffect } from "react";

export const useFetchProducts = () => {
  // ** dispatch
  const dispatch = useAppDispatch();

  // ** Selectors
  const productsList = useAppSelector((state) => state.products.productsList);
  const getProductsLoading = useAppSelector(
    (state) => state.products.getProductsLoading
  );

  useEffect(() => {
    dispatch(getProdcuts());
  }, [dispatch]);

  return {
    productsList,
    getProductsLoading,
  };
};
