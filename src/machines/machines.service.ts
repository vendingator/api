import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { machine } from 'src/typeorm/entities/machine';
import { Repository } from 'typeorm';
import { machinesdto } from './machines.dto';

@Injectable()
export class MachinesService {

    constructor (@InjectRepository(machine) private machineRepository: Repository<machine>) {

    }

    async findAll():Promise<machine[]> {
        const findMachines = this.machineRepository.find();

        if(!(await findMachines).length) {
            throw new NotFoundException({message: 'The list is empty'});
        }

        return await findMachines;
    }

    async findOne(idMachine: number): Promise<machine | null> {
        const findByID = this.machineRepository.findOneBy({idMachine});
        if(!(await findByID)) {
            throw new NotFoundException({message: 'Machine ID does not exist.'})
        }

        return await findByID;
    }

    async create(dto: machinesdto) {
        const newMachine = this.machineRepository.create(dto);

        return await this.machineRepository.save(newMachine);
    }

    async update(idMachine: number, dto: machinesdto) {
        const updateMachine = await this.findOne(idMachine);
        dto.type? updateMachine.type = dto.type : updateMachine.type = updateMachine.type;
        dto.state? updateMachine.state = dto.state : updateMachine.state = updateMachine.state;
        dto.location? updateMachine.location = dto.location : updateMachine.location = updateMachine.location;

        return await this.machineRepository.save(updateMachine);
    }

    async delete(idMachine: number) {
        const deleteMachine = await this.findOne(idMachine);
        await this.machineRepository.delete(deleteMachine);
        return ({message: 'Machine deleted'});
    }

}
