import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { reportsdto } from './reports.dto';
import { machine } from 'src/typeorm/entities/machine';

@Controller('reports')
export class ReportsController {

    constructor(private reportsservice: ReportsService) {

    }

    @Get()
    async getAll() {
        return await this.reportsservice.findAll();
    }

    @Get(':idReport')
    async getOne(@Param('idReport', ParseIntPipe) idReport: number) {
        return await this.reportsservice.findOne(idReport);
    }

    @Get(':idMachine')
    async getOneFK(@Param('idMachine', ParseIntPipe) idMachine: machine) {
        return await this.reportsservice.findOneFK(idMachine);
    }

    @Post()
    async create(@Body() dto: reportsdto) {
        return await this.reportsservice.create(dto);
    }

    @Put(':idReport')
    async update(@Param('idReport', ParseIntPipe) idReport: number, @Body() dto:reportsdto) {
        return await this.reportsservice.update(idReport, dto);
    }

    @Delete(':idReport')
    async delete(@Param('idReport', ParseIntPipe) idReport: number) {
        return await this.reportsservice.delete(idReport);
    }
}
