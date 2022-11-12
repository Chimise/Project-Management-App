import React, { useState } from "react";

export interface Message {
  id: string;
  title: string;
  content: string;
  viewed: boolean;
  createdAt: string;
}

export interface Report extends Message {}

interface InfoContext {
  messages: Message[];
  reports: Report[];
  handleViewReport: (id: string) => void;
  handleViewMessage: (id: string) => void;
  unreadMessages: number;
  unreadReports: number;
}

const messages: Message[] = [
  {
    id: "1",
    title: "Thanks for your support",
    content: "Thanks a lot for your support, we really appreciate",
    viewed: false,
    createdAt: new Date(Date.now() - 10000).toISOString(),
  },
  {
    id: "2",
    title: "Welcome to Taskr!",
    content:
      "Hello! Welcome to Taskr - the place to breakdown your projects into smaller managable tasks! Navigate to the 'Projects' page and get started right away! We hope you have a pleasant experience organizing your work.",
    viewed: false,
    createdAt: new Date().toISOString(),
  },
];
const reports: Report[] = [
  {
    id: "1",
    title: "Taskr v1.0.0",
    content:
      "Taskr is currently in Beta stage production, creating your own projects, adding and updating tasks and checking message reports",
    viewed: false,
    createdAt: new Date().toISOString(),
  },
];

export const InfoContext = React.createContext<InfoContext | null>(null);

const InfoContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [info, setInfo] = useState({ messages, reports });

  const unreadMessages = info.messages.filter(message => message.viewed === false).length;
  const unreadReports = info.reports.filter(report => report.viewed === false).length;

  const handleViewReport = (id: string) => {
    const reportIndex = info.reports.findIndex((report) => report.id === id);
    if (reportIndex === -1) {
      return;
    }

    const updatedReports = [...info.reports];
    updatedReports[reportIndex] = {
      ...updatedReports[reportIndex],
      viewed: true,
    };

    setInfo({
      ...info,
      reports: updatedReports,
    });
  };

  const handleViewMessage = (id: string) => {
    const messageIndex = info.messages.findIndex(
      (message) => message.id === id
    );
    if (messageIndex === -1) {
      return;
    }

    const updatedMessages = [...info.messages];
    updatedMessages[messageIndex] = {
      ...updatedMessages[messageIndex],
      viewed: true,
    };

    setInfo({
      ...info,
      messages: updatedMessages,
    });
  };

  return (
    <InfoContext.Provider
      value={{ ...info, handleViewReport, handleViewMessage, unreadMessages, unreadReports }}
    >
      {children}
    </InfoContext.Provider>
  );
};

export default InfoContextProvider;
