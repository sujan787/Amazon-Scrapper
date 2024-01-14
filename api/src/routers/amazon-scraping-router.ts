import { trpc, trpcProcedure } from "../lib/trpc";

import { TRPCError } from "@trpc/server";
import { collectItems } from "../services/amazon-map-scraping-service";
import { z } from "zod";

export const amazonScrappingRouter = trpc.router({
    amazonItems: trpcProcedure.input(z.object({
        searchInput: z.string().min(2),
    })).query(async (opts) => {

        const { searchInput } = opts.input;

        try {
            const collectedData = await collectItems(searchInput);
            return collectedData;
        } catch (error: any) {
            return { error: error.message }

            // throw new TRPCError({ code: 'BAD_REQUEST', message: error.message ?? "Something  went wrong" });


        }
    }),
});

