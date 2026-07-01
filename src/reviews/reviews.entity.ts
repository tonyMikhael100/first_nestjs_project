import { Product } from "src/products/product.entity";
import { User } from "src/users/user.entity";
import { TIME_STAMP } from "src/utils/constants";
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";



@Entity({ name: 'reviews' })
export class Review {

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    rating: number;
    @Column()
    comment: string;

    @CreateDateColumn({ type: 'timestamp', default: () => TIME_STAMP })
    createdAt: Date;
    @UpdateDateColumn({ type: 'timestamp', default: () => TIME_STAMP })
    updatedAt: Date;
    @ManyToOne(() => Product, (product) => product.reviews)
    product: Product;
    @ManyToOne(() => User, (user) => user.reviews)
    user: User;
}