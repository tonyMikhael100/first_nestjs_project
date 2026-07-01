import { Product } from "src/products/product.entity";
import { TIME_STAMP } from "src/utils/constants";
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserType } from "./user-role.enum";
import { Review } from "src/reviews/reviews.entity";

@Entity({ name: 'users' })
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 150, nullable: true })
    userName: string;

    @Column({ type: 'varchar', length: 250, unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ default: false })
    isEmailVerified: boolean;

    @Column({ type: 'enum', enum: UserType, default: UserType.NormalUser })
    userType: UserType;

    @CreateDateColumn({ type: 'timestamp', default: () => TIME_STAMP })
    createdAt: Date;
    @UpdateDateColumn({ type: 'timestamp', default: () => TIME_STAMP })
    updatedAt: Date;


    @OneToMany(() => Product, (product) => product.user)
    products: Product[];



    @OneToMany(() => Review, (reivew) => reivew.user)
    reviews: Review[]

}