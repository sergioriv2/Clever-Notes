import { Transform, Type } from 'class-transformer';
import moment from 'moment';
import {
  Table,
  Column,
  Model,
  HasMany,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { NotexCategory, User } from '../entities/';

@Table({
  paranoid: true,
  timestamps: true,
})
export class Note extends Model<Note> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id?: number;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Type(() => Date)
  @Transform((date: any) => moment(date).format('DD/MM/YY'))
  createdAt: Date;

  @Type(() => Date)
  @Transform((date: any) => moment(date).format('DD/MM/YY'))
  updatedAt: Date;

  @Column
  title: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  content?: string;

  @Column({ allowNull: true })
  deletedAt: Date;

  @Column({ defaultValue: false })
  archived: boolean;

  @HasMany(() => NotexCategory)
  categories: NotexCategory[];
}
