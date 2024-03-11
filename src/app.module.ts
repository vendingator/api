import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MachinesModule } from './machines/machines.module';
import { machine } from './typeorm/entities/machine';
import { ConfigModule } from '@nestjs/config';
import { product } from './typeorm/entities/product';
import { report } from './typeorm/entities/report';
import { sale } from './typeorm/entities/sale';
import { ProductsModule } from './products/products.module';
import { ReportsModule } from './reports/reports.module';
import { SalesModule } from './sales/sales.module';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: null,
    database: 'vendingmachine',
    entities: [machine, product, report, sale],
    synchronize: true,
  }), MachinesModule, ProductsModule, ReportsModule, SalesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
