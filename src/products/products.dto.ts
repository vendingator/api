import { machine } from "src/typeorm/entities/machine";

export class productsdto {
    name: string;
    purchasePrice: number;
    sellingPrice: number;
    quantity: number;
    minimumQuantity: number;
    idMachine: machine;
}