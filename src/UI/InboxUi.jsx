import React, { useState, useEffect } from "react";
import useUser from "../features/authentication/useUser";
import useMessages from "../features/Inbox/useMessages";
import Spinner from "./Spinner";
import ChatProfile from "./ChatProfile";
import Chat from "./Chat";
import { MdDelete } from "react-icons/md";
import { useMessageSubscription } from "../services/apiInbox";

function InboxUi() {
  useMessageSubscription();

  const [allConversations, setAllConversations] = useState([]);

  const {
    user: { id } = {},
    isAuthenticated,
    isLoading: isLoadingUser,
  } = useUser() || {};

  const [selectedChat, setSelectedChat] = useState("");

  const { data: messagesData, isLoading: isLoadingMessages } = useMessages(id);

  useEffect(() => {
    messagesData?.forEach((item) => {
      const conversationId =
        item.senderId === id ? item.receiverId : item.senderId;
      setAllConversations((prevConversations) => {
        if (!prevConversations.includes(conversationId)) {
          return [...prevConversations, conversationId];
        } else return prevConversations;
      });
    });
  }, [messagesData, id]);

  if (isLoadingMessages) return <Spinner />;

  return (
    <div className="flex items-start justify-start md:flex-row flex-col w-full h-full bg-[var(--bg-secondary)] md:pb-8">
      <aside className="md:w-[25%] w-full md:h-screen h-fit max-h-[50vh] p-4 overflow-y-auto">
        <div className="flex flex-col space-y-3">
          {allConversations.map((user) => (
            <ChatProfile
              userId={id}
              conversationId={user}
              key={user + Math.random()}
              selectedChat={selectedChat}
              setSelectedChat={setSelectedChat}
              setAllConversations={setAllConversations}
            />
          ))}
        </div>
      </aside>
      {/*load the chat here  */}
      <div className="md:w-[75%] w-full bg-[var(--bg-primary)] border-2 border-[var(--color-primary)]  h-full overflow-scroll ">
        {!selectedChat ? (
          <p className="grid place-content-center font-medium h-full text-[var(--color-dark)]">
            No Chat Selected
          </p>
        ) : (
          <Chat receiverId={selectedChat} userId={id} />
        )}
      </div>
    </div>
  );
}

export default InboxUi;
