import React from "react";
import Head from "next/head";
import Container from "../../components/ui/Container";
import DashboardHeader from "../../components/common/DashboardHeader";
import DashboardTitle from "../../components/common/DashboardTitle";
import Accordion from "../../components/ui/Accordion";
import { EnvelopeIcon, EnvelopeOpenIcon } from "@heroicons/react/24/solid";
import Info from "../../components/ui/Info";
import useMessages, { UserMessage } from "../../hooks/useMessages";
import moment from "moment";
import Loading from "../../components/common/Loading";
import Error from "../../components/common/Error";
import useViewMessage from "../../hooks/useViewMessage";
import useUser from "../../hooks/useUser";

const MessagesPage = () => {
  const { unRead, messages, isLoading, mutate, error } = useMessages();
  const handleViewMessage = useViewMessage();
  const {user} = useUser();

  const handleClick = async (message: UserMessage) => {
    if (message.viewed) {
      return;
    }
    await handleViewMessage(message.id);
  };

  return (
    <Container>
      <Head>
        <title>Messages</title>
        <meta name="author" content="Chisom Promise" />
        <meta
          name="description"
          content="View your all your messages and notifications"
        />
      </Head>
      <DashboardHeader title="Messages" />
      <div className="mt-8 space-y-5">
        <DashboardTitle icon="message" title="Messages" />
        {isLoading && <Loading className="h-full" />}
        {messages && (
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
            value={unRead!}
          />
        )}
        <div>
          {messages &&
            messages.map((message) => (
              <Accordion
                openIcon={EnvelopeOpenIcon}
                closeIcon={EnvelopeIcon}
                title={message.message.title}
                key={message.id}
                viewed={message.viewed}
                onView={() => handleClick(message)}
              >
                <div className="w-[90%] lg:w-[80%] mr-auto">
                  <p className="text-gray-800 text-sm md:text-base">
                    {message.message.content}
                  </p>
                  <div className="mt-2 text-justify text-primary text-xs md:text-sm font-medium flex items-center justify-between">
                    <span>{user ? user.name : ''}</span>
                    <span className="hidden md:inline">
                      {moment(message.created_at, true).format(
                        "dddd D MMMM, YYYY | HH:ss"
                      )}
                    </span>
                  </div>
                </div>
              </Accordion>
            ))}

          {error && <Error message={error.message} onRetry={() => mutate()} />}
        </div>
      </div>
    </Container>
  );
};

MessagesPage.isAuth = true;

export default MessagesPage;
