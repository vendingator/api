import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { product } from 'src/typeorm/entities/product';

@Module({
  imports: [TypeOrmModule.forFeature([product])],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
