import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { product } from 'src/typeorm/entities/product';
import { Repository } from 'typeorm';
import { productsdto } from './products.dto';
import { machine } from 'src/typeorm/entities/machine';

@Injectable()
export class ProductsService {

    constructor(@InjectRepository(product) private productRepository: Repository<product>) {

    }

    async findAll(): Promise<product[]> {
        const findProducts = this.productRepository.find();

        if(!(await findProducts).length) {
            throw new NotFoundException({message: 'The list is empty'});
        }

        return await findProducts
    }

    async findOne(idProduct: number): Promise<product | null> {
        const findByID = this.productRepository.findOneBy({idProduct});
        if(!(await findByID)) {
            throw new NotFoundException({message: 'Product ID not found'});
        }

        return await findByID;
    }

    async findOneFK(idMachine: machine): Promise<product | null> {
        const findByID = this.productRepository.findOneBy({idMachine});
        if(!(await findByID)) {
            throw new NotFoundException({message: 'Machine ID not found'});
        }

        return await findByID;
    }

    async create(dto: productsdto) {
        const newProduct = this.productRepository.create(dto);

        return await this.productRepository.save(newProduct);
    }

    async update(idProduct: number, dto: productsdto) {
        const updateProduct = await this.findOne(idProduct);
        dto.name? updateProduct.name = dto.name : updateProduct.name = updateProduct.name;
        dto.purchasePrice? updateProduct.purchasePrice = dto.purchasePrice : updateProduct.purchasePrice = updateProduct.purchasePrice;
        dto.sellingPrice? updateProduct.sellingPrice = dto.sellingPrice : updateProduct.sellingPrice = updateProduct.sellingPrice;
        dto.quantity? updateProduct.quantity =dto.quantity : updateProduct.quantity = updateProduct.quantity;
        dto.minimumQuantity? updateProduct.minimumQuantity = dto.minimumQuantity : updateProduct.minimumQuantity = updateProduct.minimumQuantity;
        dto.idMachine? updateProduct.idMachine = dto.idMachine : updateProduct.idMachine = updateProduct.idMachine;

        return await this.productRepository.save(updateProduct);
    }

    async delete(idProduct: number) {
        const deleteProduct = await this.findOne(idProduct);
        await this.productRepository.delete(deleteProduct);
        return ({message: 'Product deleted'});
    }

}
