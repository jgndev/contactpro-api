import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, Unique} from "typeorm";
import {Category} from "./category";
import {User} from "./user";

@Entity()
@Unique(['email'])
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.contacts)
  @JoinColumn({name: "userId"})
  user: User;

  @Column()
  userId: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({type: "text", nullable: true})
  description: string;

  @Column({nullable: true})
  email: string;

  @Column({nullable: true})
  photo: string;

  @Column({type: "date", nullable: true})
  birthday: Date;

  @Column({nullable: true})
  streetAddress: string;

  @Column({nullable: true})
  addressLineTwo: string;

  @Column({nullable: true})
  city: string;

  @Column({nullable: true})
  state: string;

  @Column({nullable: true})
  zipCode: string;

  @ManyToMany(() => Category, category => category.contacts)
  @JoinTable()
  categories: Category[];
}