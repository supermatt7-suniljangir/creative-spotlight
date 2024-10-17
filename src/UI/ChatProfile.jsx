import React from "react";
import useProfile from "../features/profile/useProfile";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import useDeleteChat from "../features/Inbox/useDeleteConversation";

function ChatProfile({
  conversationId,
  userId,
  selectedChat,
  setSelectedChat,
  setAllConversations,
}) {
  const { deleteConversation, isPending, isSuccess } = useDeleteChat();

  const { profileData, isLoading: isLoadingProfile } =
    useProfile(conversationId);
  const { profile: { email, fullName, avatar } = {} } = profileData || {};

  function deleteChat() {
    deleteConversation(
      { senderId: userId, receiverId: conversationId },
      {
        onSuccess: () => {
          setAllConversations((prevChats) =>
            prevChats.filter((item) => item !== conversationId)
          );
          setSelectedChat(null);
        },
      }
    );
  }

  return (
    <div className="flex justify-between items-center bg-[var(--bg-secondary-light)] w-full px-2">
      <div
        className="flex justify-start gap-2 items-center cursor-pointer py-2 rounded-md "
        onClick={() => setSelectedChat(conversationId)}
      >
        <img
          src={avatar}
          alt="user avatar"
          className="w-10 aspect-square rounded-full"
        />
        <span className="text-lg pb-1">{fullName}</span>
      </div>
      <button
        disabled={isPending}
        className="ml-auto text-xl"
        onClick={deleteChat}
      >
        <MdDelete />
      </button>
    </div>
  );
}

export default ChatProfile;
