import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn,} from "typeorm";
import { machine } from "./machine";

@Entity({ name: 'reports' })
export class report {
    @PrimaryGeneratedColumn()
    idReport: number;

    @Column()
    date: Date;

    @Column('text')
    description: string;

    @ManyToOne(() => machine)
    @JoinColumn({name: 'idMachine'})
    idMachine: number;
}