import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { VendorStatus } from '../vendor.enums';
import { User } from 'src/Users/user.entity';

@Entity()
export class Vendor {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user!: User;

  @Column()
  storeName!: string;

  @Column({ unique: true })
  phone!: string;

  @Column()
  address!: string;

  @Column({
    type: 'simple-enum',
    enum: VendorStatus,
    default: VendorStatus.PENDING,
  })
  status!: VendorStatus;

  @Column({ nullable: true })
  denialReason?: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}