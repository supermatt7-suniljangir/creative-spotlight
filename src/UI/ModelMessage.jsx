import React, { useState } from "react";
import useSendMessage from "../features/Inbox/useSendMessage";
import toast from "react-hot-toast";

function ModelMessage({ receiverId, fullName, reference, senderId, close }) {
  const { isLoading, sendMessage } = useSendMessage();
  const [message, setMessage] = useState("");

  return (
    <div
      className="fixed z-10 sm:w-96 w-3/4 aspect-square bg-[var(--bg-quaternary)] top-8 rounded-md right-8 p-4 flex items-center flex-col space-y-4"
      ref={reference}
    >
      <h3 className="sm:text-2xl text-lg text-center m-4 text-[var(--color-primary)] font-semibold">
        Message {fullName}
      </h3>
      <textarea
        className="w-full aspect-video bg-[var(--bg-quaternary)] font-medium text-[var(--color-primary)] p-2 resize-none border border-[var(--bg-secondary)] placeholder:text-[var(--color-primary)]"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="enter your message"
      ></textarea>
      <button
        onClick={() => {
          sendMessage(
            { receiverId, senderId, message },
            {
              onSuccess: toast.success(
                "message sent sucessfully, check your inbox"
              ),
            }
          );
          close?.();
        }}
        className={`bg-[var(--bg-btn-primary)] px-4 py-2`}
      >
        Send Message
      </button>
    </div>
  );
}

export default ModelMessage;
