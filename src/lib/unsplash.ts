import axios from "axios";

export const getUnsplashImage = async (query: string) => {
  const { data } = await axios
    .get(
      `
  https://api.unsplash.com/search/photos?per_page=1&query=${query}&client_id=${process.env.UNSPLASH_API_KEY}
    `
    )
    .catch((error) => {
      console.error("Axios request error:", error);
      throw error;
    });

  const imageUrl = data.results[0]?.urls.small_s3;

  if (!imageUrl) {
    return "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1557683316-973673baf926";
  }
  return imageUrl;
};
