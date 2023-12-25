import * as trpcExpress from '@trpc/server/adapters/express';

import { TRPCError, inferAsyncReturnType, initTRPC } from '@trpc/server';

export const createContext = ({ req, res }: trpcExpress.CreateExpressContextOptions) => {
    return { token: req.headers?.authorization };
};

type Context = inferAsyncReturnType<typeof createContext>;

export const trpc = initTRPC.context<Context>().create();
export const middleware = trpc.middleware;
export const publicProcedure = trpc.procedure;
export const router = trpc.router;

const isAuthorized = middleware(async ({ ctx, next }) => {

    if (ctx.token != process.env.TOKEN) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    return next();
});

export const trpcProcedure = publicProcedure.use(isAuthorized);
