//** Envoirment var */
type EnvoirmentT = "develop" | "production";
export const envoirment: EnvoirmentT =
  import.meta.env.VITE_ENVIRONMENT || "develop";

export const baseUrl: string =
  envoirment === "production" ? "https://api.com" : " http://localhost:3000";

// Get orders url
export const getOrdersUrl = `${baseUrl}/orders`;

// Get order by id url
export const getOrderByIdUrl = (orderId: string) =>
  `${baseUrl}/orders/${orderId}`;

export const postConfirmOrderUrl = (orderId: string) =>
  `${baseUrl}/orders/${orderId}/confirm`;

// ** products
export const getProductsUrl = `${baseUrl}/products`;
