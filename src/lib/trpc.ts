import { createTRPCReact, httpBatchLink } from '@trpc/react-query';

import type { AppRouter } from '../../backend/src/index';

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
    links: [
        httpBatchLink({
            url: 'http://localhost:3001/trpc',
        }),
    ],
});