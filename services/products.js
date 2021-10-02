const BASE_URL = "https://fakestoreapi.com/products";

const apiHandler = async (url, fetchApiName) => {
  if (fetchApiName) fetchApiName = url;
  try {
    const config = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, config);
    const data = await response.json();
    if (response.status !== 200) throw data;
    return data;
  } catch (err) {
    if (err.response) {
      console.log(`${fetchApiName}-Error : `, err.response.data);
      throw err.response.data;
    } else {
      console.log(`${fetchApiName}-Error : `, err.message);
      const data = { message: err.message };
      throw data;
    }
  }
};

export const getAllCategories = async () => {
  return await apiHandler(`${BASE_URL}/categories`, "getAllCategories");
};

export const getAllProdByCategory = async ({ category }) => {
  return await apiHandler(
    `${BASE_URL}/category/${category}`,
    "getAllProdByCategory"
  );
};

export const getSingleProduct = async ({ id }) => {
  return await apiHandler(`${BASE_URL}/${id}`, "getSingleProduct");
};

export const getAllProducts = async () => {
  return await apiHandler(`${BASE_URL}`, "getAllProducts");
};
