import {
  Table,
  Column,
  Model,
  DataType,
  IsEmail,
  HasMany,
} from 'sequelize-typescript';
import { Note } from 'src/modules/note/note.entity';

@Table
export class User extends Model<User> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id?: number;

  @Column({ unique: true })
  email: string;

  @Column
  password: string;

  @Column({ allowNull: true })
  deletedAt: Date;

  @HasMany(() => Note)
  notes: Note[];
}
