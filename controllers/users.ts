import { Request, Response } from "express";
import User from "../models/user";


export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await User.findByPk(id);

    return res.json({ user });
}

export const getUsers = async (req: Request, res: Response) => {

    const users = await User.findAll();

    return res.json({ users });

}

export const updateUser = (req: Request, res: Response) => {

}

export const deleteUser = (req: Request, res: Response) => {

}

export const createUser = async (req: Request, res: Response) => {
    const { body } = req;
    try {
        const user = await User.create(body);
        res.json({ msg: "User created", user});
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Couldn't create the user", error });
    }
}


