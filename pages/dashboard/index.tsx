import { useRouter } from "next/router";
import Head from "next/head";
import Container from "../../components/ui/Container";
import DashboardHeader from "../../components/common/DashboardHeader";
import DashboardTitle from "../../components/common/DashboardTitle";
import Card from "../../components/ui/Card";
import IconList from "../../components/ui/IconList";
import useUser from "../../hooks/useUser";
import useProjects from "../../hooks/useProjects";
import useReports from "../../hooks/useReports";
import useMessages from "../../hooks/useMessages";

const DashboardPage = () => {
  const { firstName } = useUser();
  const router = useRouter();
  const { projects } = useProjects();
  const { unRead: unReadMessages } = useReports();
  const { unRead: unReadReports } = useMessages();

  return (
    <Container>
      <Head>
        <title>Dashboard</title>
        <meta name="author" content="Chisom Promise" />
        <meta
          name="description"
          content="Create new projects or add tasks to already created projects"
        />
      </Head>
      <DashboardHeader title="Dashboard" />
      <DashboardTitle className="mt-8" icon="dashboard" title="Dashboard">
        <span className="text-gray-500 text-base font-light">
          Welcome,{" "}
          <span className="text-black font-medium">
            {firstName ? firstName : ""}
          </span>
        </span>
      </DashboardTitle>

      <div role={'grid'} className="mt-7 grid min-h-[350px] gap-4 grid-rows-1 grid-cols-1 md:grid-cols-2 md:grid-rows-2">
        <div
          role="button"
          aria-labelledby="dashboard"
          onClick={() => router.push("/dashboard/projects")}
          className="h-60 md:h-auto md:row-span-2"
        >
          <Card img="project" className="w-full h-full">
            <IconList icon="dashboard">
              <span className="text-gray-500 group-hover:text-gray-700 tracking-wide text-base font-light">
                You{`'`}ve got{" "}
                <span
                  id="dashboard"
                  className="text-gray-700 font-medium group-hover:text-black"
                >
                  {projects ? projects.length : null}{" "}
                  {projects
                    ? projects.length > 1
                      ? "projects"
                      : "project"
                    : null}
                </span>
              </span>
            </IconList>
          </Card>
        </div>
        <div
          role="button"
          aria-labelledby="report"
          onClick={() => router.push("/dashboard/reports")}
          className="h-60 md:h-auto"
        >
          <Card img="report" className="w-full h-full">
            <IconList icon="report">
              <span className="text-gray-500 group-hover:text-gray-700 tracking-wide text-base font-light">
                You{`'`}ve got{" "}
                <span
                  className="text-gray-700 font-medium group-hover:text-black"
                  id="report"
                >
                  {unReadReports !== undefined ? unReadReports : null}{" "}
                  {unReadReports !== undefined ? (unReadReports > 1 ? "new reports" : "new report") : null}
                </span>
              </span>
            </IconList>
          </Card>
        </div>
        <div
          role="button"
          aria-labelledby="message"
          onClick={() => router.push("/dashboard/messages")}
          className="h-60 md:h-auto"
        >
          <Card img="message" className="w-full h-full">
            <IconList icon="message">
              <span className="text-gray-500 group-hover:text-gray-700 tracking-wide text-base font-light">
                You{`'`}ve got{" "}
                <span
                  className="text-gray-700 font-medium group-hover:text-black"
                  id="message"
                >
                  {unReadMessages !== undefined ? unReadMessages : null}{" "}
                  {unReadMessages !== undefined
                    ? unReadMessages > 1
                      ? "new messages"
                      : "new message"
                    : null}
                </span>
              </span>
            </IconList>
          </Card>
        </div>
      </div>
    </Container>
  );
};

DashboardPage.isAuth = true;

export default DashboardPage;
