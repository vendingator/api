import { Module } from '@nestjs/common';
import { MachinesController } from './machines.controller';
import { MachinesService } from './machines.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { machine } from 'src/typeorm/entities/machine';

@Module({
  imports: [TypeOrmModule.forFeature([machine])],
  controllers: [MachinesController],
  providers: [MachinesService]
})
export class MachinesModule {}
