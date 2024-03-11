import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { reportsdto } from 'src/reports/reports.dto';
import { machine } from 'src/typeorm/entities/machine';
import { report } from 'src/typeorm/entities/report';
import { Repository } from 'typeorm';

@Injectable()
export class ReportsService {

    constructor (@InjectRepository(report) private reportRepository: Repository<report>) {

    }

    async findAll():Promise<report[]> {
        const findReports = this.reportRepository.find();

        if(!(await findReports).length) {
            throw new NotFoundException({message: 'The list is empty'});
        }

        return await findReports;
    }

    async findOne(idReport:number): Promise<report | null> {
        const findByID = this.reportRepository.findOneBy({idReport});
        if(!(await findByID)) {
            throw new NotFoundException({message: 'Report ID does not exist'});
        }

        return await findByID;
    }

    async findOneFK(idMachine:machine):Promise<report | null> {
        const findByFK = this.reportRepository.findOneBy({idMachine});
        if(!(await findByFK)) {
            throw new NotFoundException({message: 'Machine ID does not exist'});
        }

        return await findByFK;
    }

    async create(dto: reportsdto) {
        const newReport = this.reportRepository.create(dto);

        return await this.reportRepository.save(newReport);
    }

    async update(idReport: number, dto: reportsdto) {
        const updateReport = await this.findOne(idReport);
        dto.date? updateReport.date = dto.date : updateReport.date = updateReport.date;
        dto.descripcion? updateReport.description = dto.descripcion : updateReport.description = updateReport.description;
        dto.idMachine?updateReport.idMachine = dto.idMachine : updateReport.idMachine = updateReport.idMachine;

        return await this.reportRepository.save(updateReport);
    }

    async delete(idReport: number) {
        const deleteReport = await this.findOne(idReport);
        await this.reportRepository.delete(deleteReport);
        return ({message: 'Report deleted'});
    }
}