import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Category } from 'src/modules/category/category.entity';
import { Note } from 'src/modules/note/note.entity';

@Table
export class NotexCategory extends Model<NotexCategory> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id?: number;

  @ForeignKey(() => Category)
  @Column
  categoryId: number;

  @BelongsTo(() => Category)
  category: Category;

  @ForeignKey(() => Note)
  @Column
  noteId: number;

  @BelongsTo(() => Note)
  note: Note;
}
