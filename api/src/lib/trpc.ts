import * as trpcExpress from '@trpc/server/adapters/express';

import { initTRPC } from '@trpc/server';

export const createContext = ({ req, res }: trpcExpress.CreateExpressContextOptions) => {
    return {};
};

export const trpc = initTRPC.create();
export const middleware = trpc.middleware;
export const router = trpc.router;

export const trpcProcedure = trpc.procedure;
