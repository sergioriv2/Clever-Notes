import {
  Table,
  Column,
  Model,
  DataType,
  IsEmail,
  HasMany,
} from 'sequelize-typescript';
import { Note } from '../entities/';

@Table({
  paranoid: true,
  timestamps: true,
})
export class User extends Model<User> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id?: number;

  @Column({ unique: true, allowNull: false })
  email: string;

  @Column({ allowNull: false })
  password: string;

  @Column({ allowNull: true })
  deletedAt: Date;

  @HasMany(() => Note)
  notes: Note[];
}
