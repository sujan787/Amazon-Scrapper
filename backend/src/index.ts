import * as trpcExpress from '@trpc/server/adapters/express';

import { appRouter } from './routers';
import cors from "cors"
import { createContext } from './lib/trpc';
import express from "express"

const port = process.env.PORT || 3001;
require("dotenv").config();

const app = express();
app.use(cors())

app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext
    }),
);

app.listen(port, () => {
    console.log(`server running on port: ${port}`);
});


export type AppRouter = typeof appRouter;