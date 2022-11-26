import React from "react";
import Head from 'next/head';
import Container from "../../components/ui/Container";
import DashboardHeader from "../../components/common/DashboardHeader";
import DashboardTitle from "../../components/common/DashboardTitle";
import Accordion from "../../components/ui/Accordion";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import Info from "../../components/ui/Info";
import useReports, {UserReport} from "../../hooks/useReports";
import useViewReport from "../../hooks/useViewReport";
import moment from "moment";
import Error from '../../components/common/Error';
import Loading from "../../components/common/Loading";
import { mutate } from "swr";

const ReportPage = () => {
 const {reports, unRead, isLoading, error, mutate} = useReports();
 const handleViewReport = useViewReport();

 const handleClick = async (report: UserReport) => {
    if(report.viewed) {
      return;
    }
    await handleViewReport(report.id);
 }
  
  return (
    <Container>
      <Head>
        <title>Reports</title>
        <meta name='author' content='Chisom Promise' />
        <meta name='description' content='View all important updates and learn more about new features that has been introduced into taskr' />
      </Head>
      <DashboardHeader title="Reports" />
      <div className="mt-8 space-y-5">
        <DashboardTitle icon="report" title="Reports" />
        {isLoading && <Loading className="h-full" />}
        {reports && <Info
          type="report"
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 130,
            damping: 10,
            mass: 0.7,
          }}
          value={unRead!}
        />}
        <div>
        {reports && reports.map(report => (<Accordion
          openIcon={ExclamationCircleIcon}
          title={report.report.title}
          key={report.id}
          viewed={report.viewed}
          onView={() => handleClick(report)}
        >
          <div className="w-[90%] lg:w-[80%] mr-auto">
          <p className="text-gray-800 text-sm md:text-base">{report.report.content}</p>
          <div className="mt-2 text-justify text-primary text-xs md:text-sm font-medium flex items-center justify-between">
            <span className="bg-primary text-white p-1">{report.report.action}</span>
            <span>{moment(report.created_at, true).format('dddd D MMMM, YYYY | HH:ss')}</span>
          </div>
          </div>
        </Accordion>))}
        {error && <Error message={error.message} onRetry={() => mutate()} />}
        </div>
      </div>
    </Container>
  );
};

ReportPage.isAuth = true;

export default ReportPage;
