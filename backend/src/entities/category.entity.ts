import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from './user.entity';

@Table({
  paranoid: true,
  timestamps: true,
})
export class Category extends Model<Category> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id?: number;

  @Column({ allowNull: false })
  description: string;

  @ForeignKey(() => User)
  @Column
  userId?: number;

  @BelongsTo(() => User)
  user?: User;

  @Column({ allowNull: true })
  deletedAt: Date;
}
