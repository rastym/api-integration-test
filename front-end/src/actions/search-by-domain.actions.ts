import axios from "axios";

// Action to fetch infections data from the NestJS API
export const fetchInfections = async (domain: string) => {
  try {
    const authToken = localStorage.getItem("authToken");
    const response = await axios.post(
      "http://localhost:3001/search-by-domain/infections", // Adjust the URL if your NestJS server is hosted elsewhere
      {
        domain,
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return response.data; // Returning the response data to be used in the component
  } catch (error) {
    console.error("Error fetching infections data", error);
    throw new Error("Failed to fetch infections data");
  }
};
