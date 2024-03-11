import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { machine } from "./machine";
import { sale } from "./sale";

@Entity({ name: 'products' })
export class product {
    @PrimaryGeneratedColumn()
    idProduct: number;

    @Column()
    name: string;

    @Column()
    purchasePrice: number;

    @Column()
    sellingPrice: number;

    @Column()
    quantity: number;

    @Column()
    minimumQuantity: number;

    @ManyToOne(() => machine)
    @JoinColumn({name: 'idMachine' })
    idMachine: machine;

    @OneToMany(() => sale, (sale) => sale.idSale)
    idSale: sale;


}