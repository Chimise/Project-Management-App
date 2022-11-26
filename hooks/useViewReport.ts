import { useEffect } from "react";
import { sendRequest } from "../utils";
import useRequest from "./useRequest";
import useReports, {UserReport} from './useReports';


const viewReport = async (id: number, token: string) => {
    const report = await sendRequest<UserReport, null>({url: `/api/reports/${id}`, token: token, method: 'PATCH'});
    return report;
}

const useViewReport = () => {
    const {data: report, error, sendRequest} = useRequest(viewReport);
    const {mutate} = useReports();
    useEffect(() => {
        if(report) {
            mutate((reports) => {
                if(!reports) {
                    return;
                }
                const newReports = [...reports];
                const reportIndex = newReports.findIndex(data => data.id === report.id);
                if(reportIndex === -1) {
                    return newReports;
                }
                newReports[reportIndex] = report;
                return newReports;

            }, false);
        }
    }, [report, mutate])
    return sendRequest;

}

export default useViewReport;