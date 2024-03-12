import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { product } from "./product";

@Entity({ name: 'sales' })
export class sale {
    @PrimaryGeneratedColumn()
    idSale: number;

    @Column()
    date: Date;

    @Column()
    quantity: number;

    @ManyToOne(() => product)
    @JoinColumn({name: 'idProduct'})
    idProduct: number;
}