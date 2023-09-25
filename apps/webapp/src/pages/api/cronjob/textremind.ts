import { NextApiRequest, NextApiResponse } from "next";
import { cronJobRouter } from "@learnedlocal/api";
import { createTRPCContext } from "@learnedlocal/api";

interface RequestBody {
    authToken: string;
}

const textremind = async (request: NextApiRequest, response: NextApiResponse) => {
    try {
        const { authToken } = request.body as RequestBody;
        const ctx = await createTRPCContext({req: request, res:response});
        const caller = cronJobRouter.createCaller(ctx);
        await caller.sendTextReminders(authToken);
    }
    catch (e) {
        console.log(e);
    }

    response.status(200).json({ message: "OK"});
}

export default textremind;