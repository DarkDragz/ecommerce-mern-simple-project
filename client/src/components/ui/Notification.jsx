import { toast } from "react-toastify";
import { capitalize } from "lodash-es";

import "react-toastify/dist/ReactToastify.css";

export const NotificationType = {
  NOTIFICATION: "notification",
  ERROR: "bg-red-500 text-white",
  SUCCESS: "bg-green-500 text-white",
  WARNING: "warning",
  INFO: "info",
};

export const Notification = ({ message, type = NotificationType.ERROR }) => {
  const capitalizedMessage =
    typeof message === "string" ? capitalize(message) : message;

  toast(capitalizedMessage, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: true,
    pauseOnHover: true,
    className: `${type}`,
  });
};
