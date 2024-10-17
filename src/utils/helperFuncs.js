import toast from "react-hot-toast";

export const copyToClipboard = (userId) => {
    navigator.clipboard
      .writeText(userId)
      .then(() => {
        toast.success("User ID copied to clipboard");
      })
      .catch((err) => {
        toast.error("Failed to copy: ", err);
      });
  };