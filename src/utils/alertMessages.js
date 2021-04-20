import Swal from "sweetalert2";
import { DEFAULT_ERROR_MESSAGE } from "../constans";

export const errorAlert = (message) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: message ?? DEFAULT_ERROR_MESSAGE,
    timer: 4000,
    timerProgressBar: true,
  });
};

export const confirmAlert = (title, message) => {
  Swal.fire({
    icon: "success",
    title,
    text: message ?? DEFAULT_ERROR_MESSAGE,
    timer: 4000,
    timerProgressBar: true,
  });
};
