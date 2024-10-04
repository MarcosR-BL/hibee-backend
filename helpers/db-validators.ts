import Apartment from "../models/apartment";
import Condo from "../models/condo";
import Plan from "../models/plans"
import Tower from "../models/towers";
import User from "../models/user";
import UserSessions from "../models/user_session";

export const validatePlanId = async (id: number) => {
    const plan = await Plan.findByPk(id);

    if (!plan) {
        throw new Error(`the plan doesn't exist`);
    }
}

export const validateSessionId = async (id: number) => {
    const session = await UserSessions.findByPk(id);
    if (!session) {
        throw new Error(`the session doesn't exist`);
    }
}

export const validateCondoId = async (id: number) => {
    const condo = await Condo.findByPk(id);
    if (!condo) {
        throw new Error(`the condo doesn't exist`);
    }
}

export const validateTowerId = async (id: number) => {
    const tower = await Tower.findByPk(id);
    if (!tower) {
        throw new Error(`the tower doesn't exist`);
    }
}

export const validateApartmentId = async (id: number) => {
    const apartment = await Apartment.findByPk(id);
    if (!apartment) {
        throw new Error(`the apartment doesn't exist`);
    }
}

export const validateCodeCondo = async (code_register: string) => {
    const condo = await Condo.findOne({ where: { code_register } });
    if (!condo) {
        throw new Error(`the apartment doesn't exist`);
    }
}

export const validateEmailDuplicate = async (email: string) => {
    const user = await User.findOne({ where: { email } });
    if (user) {
        throw new Error(`Duplicated email, insert another email`);
    }
}