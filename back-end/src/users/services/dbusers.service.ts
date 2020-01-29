import { User } from "../models/user.interface";
import { CreateUserDto } from "../models/create-user.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import { Model } from 'mongoose';

@Injectable()
export class DbUserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }
    // fetch all users
    async getAllUser(): Promise<User[]> {
        const users = await this.userModel.find().exec();
        return users;
    }
    // Get a single user
    async getUser(userID): Promise<User> {
        const user = await this.userModel.findById(userID).exec();
        return user;
    }

    // Check if user exists
    async UserExists(userID): Promise<boolean> {
        const user = await this.userModel.findById(userID).exec();
        return user==null?false:true;
    }

    // post a single user
    async addUser(createUserDTO: CreateUserDto): Promise<User> {
        const newUser = await this.userModel(createUserDTO);
        return newUser.save();
    }
    // Edit user details
    async updateUser(userID, createUserDTO: CreateUserDto): Promise<User> {
        const updatedUser = await this.userModel
            .findByIdAndUpdate(userID, createUserDTO, { new: true });
        return updatedUser;
    }
    // Delete a user
    async deleteUser(userID): Promise<any> {
        const deletedUser = await this.userModel.findByIdAndRemove(userID);
        return deletedUser;
    }

}