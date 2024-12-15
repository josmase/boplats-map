import { ref } from "vue";
import axios, { AxiosError } from "axios";
import type { ApartmentDto } from "./responses.ts";
import type { GetApartmentRequest } from "./requests.ts";

const BASE_URL = "http://localhost:3000";

export default function useApartmentApi() {
  const responseData = ref<ApartmentDto[] | null>(null);
  const error = ref<string | null>(null);

  const fetchData = async (request: GetApartmentRequest) => {
    try {
      const response = await axios.get<ApartmentDto[]>(
        BASE_URL + "/apartments",
        { params: request },
      );
      responseData.value = response.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError;
        error.value = axiosError.message;
      } else {
        error.value = "An error occurred.";
      }
    }
  };

  return {
    responseData,
    error,
    fetchData,
  };
}
