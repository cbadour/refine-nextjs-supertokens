import { superTokensNextWrapper } from 'supertokens-node/nextjs'
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { SessionRequest } from "supertokens-node/framework/express";
import { backendConfig } from "src/config/backendConfig";
import supertokens from 'supertokens-node';
import ThirdPartyEmailPassword from "supertokens-node/recipe/thirdpartyemailpassword";

supertokens.init(backendConfig())

async function getUserInfo(req: SessionRequest, res: any) {
    await superTokensNextWrapper(
        async (next) => {
            await verifySession()(req, res, next);
        },
        req,
        res
    )
    const userId = req.session!.getUserId();
    console.log('user ID ', userId);
    let userInfo;
    // You can learn more about the `User` object over here https://github.com/supertokens/core-driver-interface/wiki
    try {
        userInfo = await ThirdPartyEmailPassword.getUserById(userId);
        console.log('User Info', userInfo);
    }
    catch (error) {
        console.log('Error user info', error);
    }

    return userInfo;
}

export default async function handler(req: SessionRequest, res: any) {
    try {
        const result = await getUserInfo(req, res);
        res.status(200).json({ result });
    } catch (err) {
        res.status(500).json({ error: 'failed to load data' });
    }
}