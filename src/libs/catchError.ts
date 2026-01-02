import axios from "axios";
import { toast } from "react-toastify";

export const CatchError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    if (error.response?.data?.message) {
      toast.error(error.response.data.message);
      return;
    }

    if (error.request) {
      toast.error("Server not responding. Please try again later.");
      return;
    }
  }

  if (error instanceof Error) {
    toast.error(error.message);
    return;
  }

  toast.error("Something went wrong - unknow error");
};

export default CatchError;
