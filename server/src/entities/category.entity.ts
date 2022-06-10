import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Category extends Model<Category> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id?: number;

  @Column({ allowNull: false })
  description: string;

  @Column({ allowNull: true })
  deletedAt: Date;
}
