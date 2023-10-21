import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const itemRounter = createTRPCRouter({
  deleteItem: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.item.delete({ where: { id: input.id } });
    }),

  updateOrCreateItem: protectedProcedure
    .input(
      z.object({
        itemId: z.optional(z.string()) || undefined,
        itemName: z.string(),
        itemQuantity: z.number(),
        itemPrice: z.number(),
        invoiceId: z.optional(z.string()) || undefined,
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { itemId, itemName, itemQuantity, itemPrice, invoiceId } = input;
      if (itemId && invoiceId) {
        await ctx.prisma.item.update({
          where: { id: itemId, invoiceId: invoiceId },
          data: {
            name: itemName,
            quantity: itemQuantity,
            price: itemPrice,
          },
        });
      }

      if (!itemId) {
        await ctx.prisma.item.create({
          data: {
            name: itemName,
            quantity: itemQuantity,
            price: itemPrice,
            invoice: {
              connect: {
                id: invoiceId,
              },
            },
          },
        });
      }
    }),
});
