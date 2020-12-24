import axios from "axios";

export const getCategories = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/categories`);
};

export const getCategory = async (slug) => {
  return await axios.get(`${process.env.REACT_APP_API}/category/${slug}`);
};

export const RemoveCategory = async (slug, authtoken) => {
  return await axios.delete(`${process.env.REACT_APP_API}/category/${slug}`, {
    headers: {
      authtoken: authtoken,
    },
  });
};

export const UpdateCategory = async (slug, authtoken) => {
    return await axios.delete(`${process.env.REACT_APP_API}/category/${slug}`, {
      headers: {
        authtoken: authtoken,
      },
    });
  };
