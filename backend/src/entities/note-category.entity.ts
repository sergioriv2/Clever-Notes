import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Category } from 'src/entities/category.entity';
import { Note } from 'src/entities/note.entity';

@Table
export class NotexCategory extends Model<NotexCategory> {
  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER, primaryKey: true })
  categoryId: number;

  @BelongsTo(() => Category)
  category: Category;

  @ForeignKey(() => Note)
  @Column({ type: DataType.INTEGER, primaryKey: true })
  noteId: number;

  @BelongsTo(() => Note)
  note: Note;

  @Column({ defaultValue: true })
  active: boolean;
}
