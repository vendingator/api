import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put} from '@nestjs/common';
import { machinesdto } from './machines.dto';
import { MachinesService } from './machines.service';
import { create } from 'domain';

@Controller('machines')
export class MachinesController {

    constructor(private machinesservice: MachinesService) {}

    @Get('/get')
    async getAll() {
        return await this.machinesservice.findAll();
    }

    @Get('/get/idm:idMachine')
    async getOne(@Param('idMachine', ParseIntPipe) idMachine: number) {
        return await this.machinesservice.findOne(idMachine);
    }

    @Post('/post')
    async create(@Body() dto: machinesdto) {
        return await this.machinesservice.create(dto);
    }

    @Put('/put:idMachine')
    async update(@Param('idMachine', ParseIntPipe) idMachine: number, @Body() dto: machinesdto) {
        return await this.machinesservice.update(idMachine, dto);
    }

    @Delete('/delete:idMachine')
    async delete(@Param('idMachine', ParseIntPipe) idMachine: number) {
        return await this.machinesservice.delete(idMachine);
    }
}

