import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { productsdto } from './products.dto';
import { machine } from 'src/typeorm/entities/machine';

@Controller('products')
export class ProductsController {

    constructor(private productsservice: ProductsService) {}

    @Get('/get')
    async getAll() {
        return await this.productsservice.findAll();
    }

    @Get('/get/idp:idProduct')
    async getOne(@Param('idProduct', ParseIntPipe) idProduct: number) {
        return await this.productsservice.findOne(idProduct);
    }

   // @Get('/get/idm:idMachine')
   // async getOneFK(@Param('idMachine', ParseIntPipe) idMachine: number) {
   //     return await this.productsservice.findOneFK(idMachine);
   // }

    @Post('/post')
    async create(@Body() dto: productsdto) {
        return await this.productsservice.create(dto);
    }

    @Put('/put:idProduct')
    async update(@Param('idProduct', ParseIntPipe) idProduct: number, @Body() dto: productsdto) {
        return await this.productsservice.update(idProduct, dto);
    }

    @Delete('/delete:idProduct')
    async delete(@Param('idProduct', ParseIntPipe) idProduct: number) {
        return await this.productsservice.delete(idProduct);
    }

    
}
