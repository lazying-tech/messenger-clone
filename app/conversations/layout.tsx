import React, { ReactNode } from "react";
import getConversations from "../actions/getConversations";
import getUsers from "../actions/getUsers";
import SideBar from "../components/sidebar/SideBar";
import ConversationsList from "./components/ConversationsList";

const ConversationsLayout = async ({ children }: { children: ReactNode }) => {
  const conversations = await getConversations();
  const users = await getUsers();
  return (
    // @ts-expect-error Server Component
    <SideBar>
      <div className="h-full">
        <ConversationsList initialItems={conversations} users={users} />
        {children}
      </div>
    </SideBar>
  );
};

export default ConversationsLayout;
