import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique, ManyToOne, ManyToMany, JoinColumn
} from "typeorm";
import {User} from "./user";
import {Contact} from "./contact";

@Entity()
@Unique(['name', 'userId'])
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.categories)
    @JoinColumn({name: "userId"})
    user: User;

    @Column()
    name: string;

    @ManyToMany(() => Contact, contact => contact.categories)
    contacts: Contact[];
}