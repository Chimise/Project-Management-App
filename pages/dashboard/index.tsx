import Container from "../../components/ui/Container";
import DashboardHeader from "../../components/common/DashboardHeader";
import DashboardTitle from "../../components/common/DashboardTitle";
import Card from "../../components/ui/Card";
import IconList from "../../components/ui/IconList";


const DashboardPage = () => {
    return (
      <Container>
        <DashboardHeader title="Dashboard" />
        <DashboardTitle className="mt-8" icon="dashboard" title="Dashboard">
          <span className="text-gray-500 text-base font-light">Welcome, <span className="text-black font-medium">Chisom</span></span>
        </DashboardTitle>

      <div className="mt-7 grid min-h-[350px] gap-4 grid-rows-1 grid-cols-1 md:grid-cols-2 md:grid-rows-2" >
        <div className="h-60 md:h-auto md:row-span-2">
        <Card img="project" className="w-full h-full">
          <IconList icon='dashboard'>
            <span className="text-gray-500 group-hover:text-gray-700 tracking-wide text-base font-light">You{`'`}ve got <span className="text-gray-700 font-medium group-hover:text-black">1 project</span></span>
          </IconList>
        </Card>
        </div>
        <div className="h-60 md:h-auto">
            <Card img='report' className="w-full h-full">
              <IconList icon='report'>
              <span className="text-gray-500 group-hover:text-gray-700 tracking-wide text-base font-light">You{`'`}ve got <span className="text-gray-700 font-medium group-hover:text-black">1 project</span></span>
              </IconList>
            </Card>
        </div>
        <div className="h-60 md:h-auto">
            <Card img='message' className="w-full h-full">
              <IconList icon='message'>
              <span className="text-gray-500 group-hover:text-gray-700 tracking-wide text-base font-light">You{`'`}ve got <span className="text-gray-700 font-medium group-hover:text-black">1 project</span></span>
              </IconList>
            </Card>
        </div>
      </div>
      </Container>
    )
  }
  
  export default DashboardPage;
  