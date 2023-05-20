import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique, OneToMany
} from "typeorm";
import {Contact} from "./contact";
import {Category} from "./category";

@Entity()
@Unique(['username', 'email'])
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    username: string;

    @Column( { nullable: true })
    email: string;

    @Column( { nullable: true})
    password: string;

    @Column( { nullable: true })
    firstName: string;

    @Column( { nullable: true })
    lastName: string;

    @Column( { nullable: true })
    picture: string;

    @Column( { nullable: true })
    provider: string;

    @Column( { nullable: true })
    providerId: string;

    @OneToMany(() => Contact, contacts => contacts.user)
    contacts: Contact[];

    @OneToMany(() => Category, categories => categories.user)
    categories: Category[];
}