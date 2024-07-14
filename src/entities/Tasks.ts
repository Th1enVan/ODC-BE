import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ type: "date", nullable: true })
    startDate?: string;

    @Column({ type: "date", nullable: true })
    endDate?: string;
}