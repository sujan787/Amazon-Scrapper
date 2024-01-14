import { createTRPCClient, httpBatchLink } from '@trpc/client';

import type { AppRouter } from '../../api/src/index';

export const trpc = createTRPCClient<AppRouter>({
    links: [
        httpBatchLink({
            url: 'http://13.201.90.42:3001/trpc',
        }),
    ],
});