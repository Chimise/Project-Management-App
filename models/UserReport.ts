import ReportPage from "../pages/dashboard/reports";
import { BaseSchema } from "../utils";
import { getKnex } from "../utils/connectDb";

export interface Report extends BaseSchema {
    title: string;
    content: string;
    action: string;
  }

export interface UserReportSchema extends BaseSchema {
    user_id: number;
    viewed: boolean;
    report_id: number;
  }

type FindValues = Pick<UserReportSchema, 'report_id'|'user_id'| 'id'>

class UserReport {
    id: number;
    user_id: number;
    viewed: boolean;
    report_id: number;
    created_at: string;
    updated_at: string
    report!: Report;

    constructor({id, user_id, viewed, report_id, created_at, updated_at}: UserReportSchema) {
        this.id = id;
        this.user_id = user_id;
        this.viewed = viewed;
        this.report_id = report_id;
        this.created_at = created_at;
        this.updated_at = updated_at;

    }

    static async insert(values: Omit<FindValues, 'id'> | Omit<FindValues, 'id'>[]) {
        const knex = getKnex();
        const reports = await knex<UserReportSchema>('user_reports').insert(values).returning('*');
        const userReports =  await Promise.all(reports.map(async report => {
            const userReport = new UserReport(report);
            await userReport.getReport();
            return userReport;
        }));
        return userReports;
    }

    async getReport() {
        const knex = getKnex();
        const reports: Report[] = await knex<UserReportSchema>('user_reports').select('reports.*').join<Report>('reports', 'user_reports.report_id', 'reports.id').where('user_reports.user_id', this.user_id).andWhere('user_reports.report_id', this.report_id);
        this.report = reports[0];
    }

    static async findOne(values: Partial<FindValues>) {
        const knex = getKnex();
        const report = (await knex<UserReportSchema>('user_reports').select('*').where(values))[0];
        if(!report) {
            return null;
        }
        const userReport =  new UserReport(report);
        await userReport.getReport();
        return userReport;
    }

    static async find(values: Partial<FindValues>) {
        const knex = getKnex();
        const reports = await knex<UserReportSchema>('user_reports').select('*').where(values);
        if(reports.length === 0) {
            return [];
        }
        const userReports = await Promise.all(reports.map(async report => {
            const userReport = new UserReport(report);
            await userReport.getReport();
            return userReport
        }));

        return userReports;
    }

    async viewReport() {
        const knex = getKnex();
        await knex<UserReportSchema>('user_reports').update({viewed: true}).where({id: this.id});
        this.viewed = true;
    }

    toJSON() {
        const {viewed, id, created_at, updated_at, user_id, report} = this;
        return {
            id,
            viewed,
            user_id,
            created_at,
            updated_at,
            report
        }
    }

}

export default UserReport;