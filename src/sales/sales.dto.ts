import { product } from "src/typeorm/entities/product";

export class salesdto {
    date: Date;
    quantity: number;
    idProduct: product;
}