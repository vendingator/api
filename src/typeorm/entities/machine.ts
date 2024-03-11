import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { product } from "./product";
import { report } from "./report";

@Entity({ name: 'machines' })
export class machine {

    @PrimaryGeneratedColumn()
    idMachine: number;

    @Column()
    state: string;

    @Column()
    type: string;

    @Column()
    location: string;

    @OneToMany(() => product, (product) => product.idMachine)
    idProduct: product;

    @OneToMany(() => report, (report) => report.idMachine)
    idReport: report;

}
