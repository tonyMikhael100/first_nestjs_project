import { Exclude } from "class-transformer";
import { Review } from "src/reviews/reviews.entity";
import { User } from "src/users/user.entity";
import { TIME_STAMP } from "src/utils/constants";
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "products" }) // name of table its optional but the default will be productEntity
export class Product {

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    description: string;
    @Column({ type: "float" })
    price: number;

    @CreateDateColumn({ type: 'timestamp', default: () => TIME_STAMP })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => TIME_STAMP })
    updatedAt: Date;


    @OneToMany(() => Review, (review) => review.product)
    reviews: Review[];


    @ManyToOne(() => User, (user) => user.products)
    user: User;
}