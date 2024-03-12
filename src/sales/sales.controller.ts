import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { SalesService } from './sales.service';
import { product } from 'src/typeorm/entities/product';
import { salesdto } from './sales.dto';

@Controller('sales')
export class SalesController {

    constructor(private salesservice: SalesService) {

    }

    @Get('/get')
    async getAll() {
        return await this.salesservice.findAll();
    }

    @Get('/get/ids:idSale')
    async getOne(@Param('idSale', ParseIntPipe) idSale:number) {
        return await this.salesservice.findOne(idSale);
    }

    @Get('/get/idp:idProduct')
    async getOneFK(@Param('idProduct', ParseIntPipe) idProduct:number) {
        return await this.salesservice.findOneFK(idProduct);
    }

    @Post('/post')
    async create(@Body() dto:salesdto) {
        return await this.salesservice.create(dto);
    }

    @Put('/put:idSale')
    async update(@Param('idSale', ParseIntPipe) idSale:number, @Body() dto: salesdto) {
        return await this.salesservice.update(idSale, dto);
    }

    @Delete('/delete:idSale')
    async delete(@Param('idSale', ParseIntPipe) idSale:number) {
        return await this.salesservice.delete(idSale);
    }

}
