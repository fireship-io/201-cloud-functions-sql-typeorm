import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm';
import { Hippo } from './Hippo'

@Entity()
export class Hat extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    color: string;

    @ManyToOne(type => Hippo, hippo => hippo.hats)
    owner: Hippo;
}