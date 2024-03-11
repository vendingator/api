import { Module } from '@nestjs/common';
import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { sale } from 'src/typeorm/entities/sale';

@Module({
  imports: [TypeOrmModule.forFeature([sale])],
  controllers: [SalesController],
  providers: [SalesService]
})
export class SalesModule {}
