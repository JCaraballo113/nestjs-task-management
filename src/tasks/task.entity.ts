import { Entity, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
}
