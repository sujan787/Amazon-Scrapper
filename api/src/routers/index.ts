import { amazonScrappingRouter } from "./amazon-scraping-router"
import { trpc } from "../lib/trpc"

export const appRouter = trpc.router({
    scrapping: amazonScrappingRouter
})
    