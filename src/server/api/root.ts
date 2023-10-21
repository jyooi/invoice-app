import { createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "~/server/api/routers/user";
import { invoiceRouter } from "./routers/invoice";
import { itemRounter } from "./routers/items";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  invoice: invoiceRouter,
  item: itemRounter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
