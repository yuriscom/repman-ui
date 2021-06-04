import Swal from "sweetalert2";
import { ALERT_PROCESSING_TIME, DEFAULT_ERROR_MESSAGE } from "../constans";

export const errorAlert = (message) =>
  Swal.fire({
    icon: "error",
    text: message ?? DEFAULT_ERROR_MESSAGE,
    timer: ALERT_PROCESSING_TIME,
    timerProgressBar: true,
  });

export const confirmAlert = (title, message) =>
  Swal.fire({
    icon: "success",
    title,
    text: message ?? DEFAULT_ERROR_MESSAGE,
    timer: ALERT_PROCESSING_TIME,
    timerProgressBar: true,
  });
