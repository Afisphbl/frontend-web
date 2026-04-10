const API_URL = import.meta.VITE_API_URL || "http://localhost:5000";

export const getFetch = async (endpoint, option) => {
  try {
    const res = await fetch(`${API_URL}/${endpoint}`, {
      ...option,
    });

    if (!res.ok) throw new Error("Something went wrong");

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("💥💥💥 ERROR: " + error);
    throw error;
  }
};
