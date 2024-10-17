import React, { useState } from "react";
import useConversation from "../features/Inbox/useConversation";
import Spinner from "./Spinner";
import useSendMessage from "../features/Inbox/useSendMessage";
import useProfile from "../features/profile/useProfile";
import { Link } from "react-router-dom";
import { useMessageSubscription } from "../services/apiInbox";

function Chat({ userId, receiverId }) {
  useMessageSubscription();
  const { sendMessage, isLoading: isSendingMessage } = useSendMessage();
  const {
    profileData: { profile },
    isLoading: isLoadingUser,
  } = useProfile(receiverId);
  const { data, isLoading } = useConversation(userId, receiverId);
  const [message, setMessage] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    sendMessage({ receiverId, senderId: userId, message });
    setMessage("");
  }

  if (isLoading) return <Spinner />;

  return (
    <div className="flex flex-col h-full md:px-8 px-4 py-2 ">
      <div className=" w-full bg-[var(--bg-secondary)] p-2">
        <Link
          to={`/profile/${profile?.userId}`}
          className="flex items-center space-x-2 w-fit relative"
        >
          <img
            src={profile?.avatar}
            className="w-8 aspect-square rounded-full"
          />
          <span>{profile?.fullName}</span>
        </Link>
      </div>

      <div className="flex flex-col space-y-3 h-3/4 overflow-scroll w-full p-4">
        {data.map((chat) => {
          const {
            created_at,
            message,
            receiverId: id,
            senderId,
            messageId,
          } = chat;
          return (
            <span
              key={messageId}
              className={`px-4 py-2 rounded-md text-lg font-medium ${
                userId === senderId
                  ? "bg-[var(--bg-quaternary)] text-[var(--color-primary)]  ml-auto"
                  : "bg-[var(--bg-secondary)] left-16 mr-auto"
              }`}
            >
              {message}
            </span>
          );
        })}
      </div>

      <div className="w-full h-fit">
        <form
          onSubmit={handleSubmit}
          className="flex space-x-4 w-full items-center justify-end "
        >
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-3/4 bg-[var(--bg-secondary)] resize-none rounded-3xl p-4"
            rows="1"
          />
          <button
            type="submit"
            className="px-5  rounded-md pt-1 pb-2 bg-[var(--bg-btn-primary)] cursor-pointer"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
