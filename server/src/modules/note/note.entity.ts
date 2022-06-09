import {
  Table,
  Column,
  Model,
  HasMany,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { NotexCategory } from 'src/modules/note-category/note-category.entity';
import { User } from 'src/modules/user/user.entity';

@Table
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
  archived: Date;

  @HasMany(() => NotexCategory)
  categories: NotexCategory[];
}
