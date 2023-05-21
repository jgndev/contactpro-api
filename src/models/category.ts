import {Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn, Unique} from "typeorm";
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
  userId: number;

  @Column()
  name: string;

  @ManyToMany(() => Contact, contact => contact.categories)
  contacts: Contact[];
}