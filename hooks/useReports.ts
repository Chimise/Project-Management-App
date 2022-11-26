import useSWR from 'swr';
import useAuth from './useAuth';
import RequestError from '../utils/RequestError';
import {UserReportSchema, Report} from '../models/UserReport';

export type UserReport = Omit<UserReportSchema, 'report_id'> & {
    report: Report
}

const useReports = () => {
    const {token} = useAuth();
    const {data: reports, error, mutate} = useSWR<UserReport[], RequestError>(token && ['/api/reports', token]);
    return {
        reports,
        error: reports ? undefined : error,
        mutate,
        isLoading: !reports && !error,
        unRead: !reports ? undefined : reports.filter(report => report.viewed === false).length
    }
}

export default useReports;