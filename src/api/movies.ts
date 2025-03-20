import { MovieDetail } from "../models/movie";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchData = async () => {
  try {
    const response = await fetch(`${BASE_URL}${API_KEY}&s=Pokemon`);
    if (!response.ok) {
      throw new Error(`HTTP Hatası! Durum: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("API çağrısı sırasında hata oluştu:", error);
    return null;
  }
};

export const fetchByImdbId = async (
  id: string
): Promise<MovieDetail | null> => {
  try {
    const response = await fetch(`${BASE_URL}${API_KEY}&i=${id}`);
    console.log({ response });
    if (!response.ok) {
      throw new Error(`HTTP Hatası! Durum: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("API çağrısı sırasında hata oluştu:", error);
    return null;
  }
};
