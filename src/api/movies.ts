import { MovieDetail } from "../models/movie";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchData = async (page: number = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}${API_KEY}&s=Pokemon&Page=${page}`
    );

    if (!response.ok) {
      throw new Error(`HTTP Hatası! Durum: ${response.status}`);
    }

    const data = await response.json();

    return {
      movies: data.Search || [],
      totalResults: data.totalResults ? parseInt(data.totalResults, 10) : 0,
    };
  } catch (error) {
    console.error("API çağrısı sırasında hata oluştu:", error);
    return { movies: [], totalResults: 0 };
  }
};

export const fetchByImdbId = async (
  id: string
): Promise<MovieDetail | null> => {
  try {
    const response = await fetch(`${BASE_URL}${API_KEY}&i=${id}`);
    if (!response.ok) {
      throw new Error(`HTTP Hatası! Durum: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("API çağrısı sırasında hata oluştu:", error);
    return null;
  }
};

export const searchByMovieName = async (
  name: string,
  year?: string,
  type?: string,
  page?: number = 1
): Promise<{ movies: MovieDetail[]; totalResults: number } | null> => {
  try {
    const url = new URL(`${BASE_URL}${API_KEY}`);
    url.searchParams.append("s", name);
    if (year) url.searchParams.append("y", year);
    if (type) url.searchParams.append("type", type);
    if (page) url.searchParams.append("Page", page.toString());

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`HTTP Hatası! Durum: ${response.status}`);
    }

    const data = await response.json();

    return {
      movies: data.Search || [],
      totalResults: data.totalResults ? parseInt(data.totalResults, 10) : 0,
    };
  } catch (error) {
    console.error("API çağrısı sırasında hata oluştu:", error);
    return null;
  }
};
