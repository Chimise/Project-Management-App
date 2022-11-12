import React from "react";
import Container from "../../components/ui/Container";
import DashboardHeader from "../../components/common/DashboardHeader";
import DashboardTitle from "../../components/common/DashboardTitle";
import Accordion from "../../components/ui/Accordion";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import Info from "../../components/ui/Info";
import useInfo from "../../hooks/useInfo";
import moment from "moment";

const ReportPage = () => {
  const { reports, handleViewReport, unreadReports } = useInfo();

  
  return (
    <Container>
      <DashboardHeader title="Reports" />
      <div className="mt-8 space-y-5">
        <DashboardTitle icon="report" title="Reports" />
        <Info
          type="report"
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 130,
            damping: 10,
            mass: 0.7,
          }}
          value={unreadReports}
        />
        <div>
        {reports.map(report => (<Accordion
          openIcon={ExclamationCircleIcon}
          title={report.title}
          key={report.id}
          viewed={report.viewed}
          onView={() => handleViewReport(report.id)}
        >
          <div className="w-[90%] lg:w-[80%] mr-auto">
          <p className="text-gray-800 text-sm md:text-base">{report.content}</p>
          <div className="mt-2 text-justify text-primary text-xs md:text-sm font-medium flex items-center justify-between">
            <span>Botty Bot</span>
            <span>{moment(report.createdAt, true).format('dddd D MMMM, YYYY | HH:ss')}</span>
          </div>
          </div>
        </Accordion>))}
        </div>
      </div>
    </Container>
  );
};

export default ReportPage;
