import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const invoiceRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  createInvoice: protectedProcedure
    .input(
      z.object({
        status: z.enum(["DRAFT", "PENDING", "PAID"]),
        streetAddress: z.string(),
        city: z.string(),
        postCode: z.number(),
        country: z.string(),
        clientProjectDescription: z.string(),
        clientName: z.string(),
        clientEmail: z.string().email(),
        clientCountry: z.string(),
        clientCity: z.string(),
        clientStreetAddress: z.string(),
        clientPostCode: z.number(),
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

  getAllInvoice: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.invoice.findMany();
  }),

  getOneInvoice: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.invoice.findUnique({ where: { id: input.id } });
    }),
});
