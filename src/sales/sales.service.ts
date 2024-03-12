import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { product } from "src/typeorm/entities/product";
import { sale } from "src/typeorm/entities/sale";
import { Repository } from "typeorm";
import { salesdto } from "./sales.dto";

@Injectable()
export class SalesService {

    constructor (@InjectRepository(sale) private salesrepository: Repository<sale>) {

    }

    async findAll():Promise<sale[]> {
        const findSales = this.salesrepository.find();

        if(!(await findSales).length) {
            throw new NotFoundException({message:'The list is empty'});
        }

        return await findSales;
    }

    async findOne(idSale: number): Promise<sale | null> {
        const findByID = this.salesrepository.findOneBy({idSale});
        if(!(await findByID)) {
            throw new NotFoundException({message: 'Sale ID does not exist'});
        }

        return await findByID;
    }

    async findOneFK(idProduct: number): Promise<sale | null> {
        const findByFK = this.salesrepository.findOneBy({idProduct});
        if(!(await findByFK)) {
            throw new NotFoundException({message:'Product ID does not exist'})
        }

        return await findByFK;
    }

    async create(dto: salesdto) {
        const newSale = this.salesrepository.create(dto);

        return await this.salesrepository.save(newSale);
    }

    async update(idSale: number, dto:salesdto) {
        const updateSale = await this.findOne(idSale);
        dto.date? updateSale.date = dto.date : updateSale.date = updateSale.date;
        dto.quantity? updateSale.quantity = dto.quantity : updateSale.quantity = updateSale.quantity;
        dto.idProduct? updateSale.idProduct = dto.idProduct : updateSale.idProduct = updateSale.idProduct;

        return await this.salesrepository.save(updateSale);
    }

    async delete(idSale: number) {
        const deleteSale = await this.findOne(idSale);
        await this.salesrepository.delete(deleteSale);
        return ({message:'Sale deleted'});
    }
}
