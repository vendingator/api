import { machine } from "src/typeorm/entities/machine";

export class reportsdto {
    date: Date;
    descripcion: string;
    idMachine: machine;
}