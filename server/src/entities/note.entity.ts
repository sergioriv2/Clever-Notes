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
