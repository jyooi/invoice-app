import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const invoiceRouter = createTRPCRouter({
  createInvoice: protectedProcedure
    .input(
      z.object({
        status: z.enum(["DRAFT", "PENDING", "PAID"]),
        streetAddress: z.string(),
        city: z.string(),
        postCode: z.string(),
        country: z.string(),
        clientProjectDescription: z.string(),
        clientName: z.string(),
        clientEmail: z.string().email(),
        clientCountry: z.string(),
        clientCity: z.string(),
        clientStreetAddress: z.string(),
        clientPostCode: z.string(),
        invoiceDate: z.string().datetime(),
        paymentTerms: z.number(),
        itemArray: z.array(
          z.object({
            itemName: z.string(),
            itemQuantity: z.number(),
            itemPrice: z.number(),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.invoice.create({
        data: {
          status: input.status,
          streetAddress: input.streetAddress,
          city: input.city,
          postCode: input.postCode,
          country: input.country,
          clientProjectDescription: input.clientProjectDescription,
          clientName: input.clientName,
          clientEmail: input.clientEmail,
          clientCountry: input.clientCountry,
          clientCity: input.clientCity,
          clientStreetAddress: input.clientStreetAddress,
          clientPostCode: input.clientPostCode,
          date: input.invoiceDate,
          paymentTerms: input.paymentTerms,
          totalAmount: input.itemArray.reduce(
            (acc, curr) => acc + curr.itemPrice * curr.itemQuantity,
            0
          ),
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
          items: {
            createMany: {
              data: input.itemArray.map((item) => ({
                name: item.itemName,
                quantity: item.itemQuantity,
                price: item.itemPrice,
              })),
            },
          },
        },
      });
    }),

  getAllInvoice: protectedProcedure
    .input(
      z.object({
        status: z.enum(["DRAFT", "PENDING", "PAID"]),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.invoice.findMany({
        where: {
          user: {
            id: ctx.session.user.id,
          },
          status: input.status,
        },
        include: {
          items: true,
        },
      });
    }),

  getOneInvoice: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.invoice.findUnique({
        where: { id: input.id, user: { id: ctx.session.user.id } },
        include: {
          items: true,
        },
      });
    }),
});
