import { createTRPCClient, httpBatchLink } from '@trpc/client';

import type { AppRouter } from '../../api/src/index';

export const trpc = createTRPCClient<AppRouter>({
    links: [
        httpBatchLink({
            url: 'http://localhost:3001/trpc',

        }),
    ],
});