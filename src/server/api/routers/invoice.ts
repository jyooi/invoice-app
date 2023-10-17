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
        status: z.array(z.enum(["DRAFT", "PENDING", "PAID"])),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.invoice.findMany({
        select: {
          id: true,
          status: true,
          date: true,
          clientName: true,
          totalAmount: true,
        },
        where: {
          user: {
            id: ctx.session.user.id,
          },
          status: {
            in: input.status,
          },
        },
      });
    }),

  getOneInvoiceById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.invoice.findUnique({
        select: {
          status: true,
          streetAddress: true,
          city: true,
          postCode: true,
          country: true,
          clientProjectDescription: true,
          clientName: true,
          clientEmail: true,
          clientCountry: true,
          clientCity: true,
          clientStreetAddress: true,
          clientPostCode: true,
          date: true,
          paymentTerms: true,
          totalAmount: true,
          items: true,
        },
        where: { id: input.id, user: { id: ctx.session.user.id } },
      });
    }),

  removeInvoice: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      const result = ctx.prisma.invoice.delete({
        where: { id: input.id, user: { id: ctx.session.user.id } },
      });

      return result;
    }),

  updateInvoiceStatus: protectedProcedure
    .input(
      z.object({ status: z.enum(["DRAFT", "PENDING", "PAID"]), id: z.string() })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.invoice.update({
        where: { id: input.id, user: { id: ctx.session.user.id } },
        data: {
          status: input.status,
        },
      });
    }),
});
