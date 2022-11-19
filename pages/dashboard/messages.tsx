import React from "react";
import Container from "../../components/ui/Container";
import DashboardHeader from "../../components/common/DashboardHeader";
import DashboardTitle from "../../components/common/DashboardTitle";
import Accordion from "../../components/ui/Accordion";
import { EnvelopeIcon, EnvelopeOpenIcon } from "@heroicons/react/24/solid";
import Info from "../../components/ui/Info";
import useInfo from "../../hooks/useInfo";
import moment from "moment";

const MessagesPage = () => {
  const { messages, handleViewMessage, unreadMessages } = useInfo();

  
  return (
    <Container>
      <DashboardHeader title="Messages" />
      <div className="mt-8 space-y-5">
        <DashboardTitle icon="message" title="Messages" />
        <Info
          type="message"
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 130,
            damping: 10,
            mass: 0.7,
          }}
          value={unreadMessages}
        />
        <div>
        {messages.map(message => (<Accordion
          openIcon={EnvelopeOpenIcon}
          closeIcon={EnvelopeIcon}
          title={message.title}
          key={message.id}
          viewed={message.viewed}
          onView={() => handleViewMessage(message.id)}
        >
          <div className="w-[90%] lg:w-[80%] mr-auto">
          <p className="text-gray-800 text-sm md:text-base">{message.content}</p>
          <div className="mt-2 text-justify text-primary text-xs md:text-sm font-medium flex items-center justify-between">
            <span>Botty Bot</span>
            <span>{moment(message.createdAt, true).format('dddd D MMMM, YYYY | HH:ss')}</span>
          </div>
          </div>
        </Accordion>))}
        </div>
      </div>
    </Container>
  );
};

MessagesPage.isAuth = true;

export default MessagesPage;
