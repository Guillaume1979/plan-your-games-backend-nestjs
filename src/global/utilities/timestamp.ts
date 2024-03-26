import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import { Type } from 'class-transformer';
import { IsDate, IsOptional } from 'class-validator';

export class Timestamp {
  @CreateDateColumn()
  @Type(() => Date)
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn()
  @Type(() => Date)
  @IsDate()
  updatedAt: Date;

  @DeleteDateColumn()
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  deletedAt: Date;
}
