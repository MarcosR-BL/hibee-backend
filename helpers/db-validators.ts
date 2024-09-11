import Plan from "../models/plans"
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