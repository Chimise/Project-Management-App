import Container from "../../components/ui/Container";
import DashboardHeader from "../../components/common/DashboardHeader";
import DashboardTitle from "../../components/common/DashboardTitle";

const DashboardPage = () => {
    return (
      <Container>
        <DashboardHeader title="Dashboard" />
        <DashboardTitle icon="dashboard" title="Dashboard" />
      </Container>
    )
  }
  
  export default DashboardPage;
  