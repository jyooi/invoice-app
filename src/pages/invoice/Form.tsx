"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import tw, { styled } from "twin.macro";
import { DatePicker } from "~/components/DatePicker";
import { Select } from "~/components/Select";
import { TextField } from "~/components/TextField";
import { HeadingS, HeadingM } from "~/components/Typography";
import { useForm, Controller, useFieldArray } from "react-hook-form";

import { Button } from "~/components/Button";
import { useResponsiveMatch } from "~/utils/lib";
import { api } from "~/utils/api";
import PurpleChevronLeft from "../../image/Icons/purple_chevron_left_icon.svg";
import { parseDate } from "@internationalized/date";
import { type DateValue } from "react-aria";
import dayjs from "dayjs";
import dynamic from "next/dynamic";
import { type InoviceStatus } from "~/components/StatusCard";

const ItemsList = dynamic(() => import("../../components/ItemsList"), {
  ssr: false,
});

type PropType = {
  toggleDrawer: () => void;
  newInvoice?: boolean;
  saveEventHandler?: () => void;
  draftEventHandler?: () => void;
  discardEventHandler?: () => void;
  updateEventHandler?: () => void;
  invoiceId?: string;
};

type Item = {
  itemId: string;
  itemName: string;
  itemQuantity: number;
  itemPrice: number;
};

export type InvoiceFormValue = {
  streetAddress: string;
  city: string;
  postCode: string;
  country: string;
  clientName: string;
  clientEmail: string;
  clientStreetAddress: string;
  clientCity: string;
  clientPostCode: string;
  clientCountry: string;
  clientProjectDescription: string;
  invoiceDate: string;
  paymentTerms: number;
  itemArray: Item[];
};

const FormContainer = styled.div(() => [
  tw`desktop:(ml-[80px] py-[56px] pr-[59px]) h-full overflow-auto`,
  tw`tablet:(pl-[59px]  py-[56px]) h-full overflow-auto`,
  tw`px-[59px] py-[56px] h-full overflow-auto`,
]);

const Form = ({
  toggleDrawer,
  newInvoice,
  discardEventHandler,
  updateEventHandler,
  invoiceId,
}: PropType) => {
  const utils = api.useContext();

  // if invoiceId is provided, fetch invoice data

  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<InvoiceFormValue>({
    defaultValues: {
      streetAddress: "",
      city: "",
      postCode: "",
      country: "",
      clientName: "",
      clientEmail: "",
      clientStreetAddress: "",
      clientCity: "",
      clientPostCode: "",
      clientCountry: "",
      clientProjectDescription: "",
      itemArray: [],
    },
  });

  const [paymentTerms, setPaymentTerms] = useState("1");

  const [invoiceDate, setInvoiceDate] = useState<DateValue>(
    parseDate(dayjs().format("YYYY-MM-DD"))
  );

  const [invoiceState, setInvoiceState] = useState<"DRAFT" | "PENDING">(
    "PENDING"
  );

  const createInvoice = api.invoice.createInvoice.useMutation();

  const updateInvoice = api.invoice.updateInvoice.useMutation();

  const invoice = api.invoice.getOneInvoiceById.useQuery(
    {
      id: invoiceId as string,
    },
    { enabled: Boolean(invoiceId && !newInvoice) }
  );

  const deleteItem = api.item.deleteItem.useMutation();

  const createOrUpdateItem = api.item.updateOrCreateItem.useMutation();

  const { fields, remove, append } = useFieldArray({
    control,
    name: "itemArray", // unique name for your Field Array
  });

  const { isMobile } = useResponsiveMatch();

  const onSubmit = async (data: InvoiceFormValue) => {
    // update invoiceDate
    if (!newInvoice) {
      const filterDeletedItem = invoice.data?.items.filter(
        (item) =>
          !data.itemArray.find((itemArray) => itemArray.itemId === item.id)
      );

      // remove deleted item from invoice
      if (filterDeletedItem && filterDeletedItem.length > 0) {
        await Promise.all(
          filterDeletedItem.map((item) =>
            deleteItem.mutateAsync({ id: item.id })
          )
        );
      }

      // create or update item
      await Promise.all(
        data.itemArray.map((item) =>
          createOrUpdateItem.mutateAsync({
            itemId: item.itemId,
            itemName: item.itemName,
            itemQuantity: item.itemQuantity,
            itemPrice: item.itemPrice,
            invoiceId: invoiceId as string,
          })
        )
      );

      // update invoice
      await updateInvoice.mutateAsync({
        ...data,
        paymentTerms: Number(paymentTerms),
        invoiceDate: new Date(invoiceDate.toString()),
        status: invoice.data?.status as InoviceStatus,
        id: invoiceId as string,
      });
      await utils.invoice.getOneInvoiceById.invalidate();
    }

    // create invoice
    if (newInvoice) {
      await createInvoice.mutateAsync({
        ...data,
        paymentTerms: Number(paymentTerms),
        invoiceDate: new Date(invoiceDate.toString()),
        status: invoiceState,
      });
      await utils.invoice.getAllInvoice.invalidate();
    }

    toggleDrawer();
  };

  useEffect(() => {
    if (!newInvoice && invoiceId) {
      const invoiceData = {
        ...invoice?.data,
        itemArray: invoice?.data?.items.map((item) => ({
          itemId: item.id,
          itemName: item.name,
          itemQuantity: item.quantity,
          itemPrice: item.price,
        })),
      };
      reset(
        invoiceData || {
          streetAddress: "",
          city: "",
          postCode: "",
          country: "",
          clientName: "",
          clientEmail: "",
          clientStreetAddress: "",
          clientCity: "",
          clientPostCode: "",
          clientCountry: "",
          clientProjectDescription: "",
          itemArray: [],
        }
      );
    }
  }, [newInvoice, invoiceId, reset, invoice?.data]);

  console.log(errors);

  return (
    <>
      <FormContainer>
        {isMobile && (
          <div
            onClick={() => toggleDrawer()}
            tw="flex gap-6 mb-[31px] items-center"
          >
            <Image
              src={PurpleChevronLeft as string}
              alt="purple chevron left"
            ></Image>
            <HeadingS>Go back</HeadingS>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <HeadingM tw="mb-[46px]">
            {newInvoice ? "New Invoice" : `# ${invoiceId ?? ""}`}
          </HeadingM>
          <HeadingS tw="text-01 mb-6 dark:text-01">Bill From</HeadingS>
          <Controller
            name="streetAddress"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                label="Street Address"
                {...field}
                ref={null}
                error={errors.streetAddress}
              />
            )}
          />
          <div tw="flex gap-6">
            <Controller
              name="city"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  label="City"
                  {...field}
                  ref={null}
                  error={errors.city}
                />
              )}
            />
            <Controller
              name="postCode"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  label="Post Code"
                  {...field}
                  ref={null}
                  error={errors.postCode}
                />
              )}
            />
            <Controller
              name="country"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  label="Country"
                  {...field}
                  ref={null}
                  error={errors.country}
                />
              )}
            />
          </div>
          <HeadingS tw="text-01 mb-6 dark:text-01">Bill To</HeadingS>
          <Controller
            name="clientName"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                label="Client's Name"
                {...field}
                ref={null}
                error={errors.clientName}
              />
            )}
          />
          <Controller
            name="clientEmail"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                label="Client's Email"
                {...field}
                ref={null}
                error={errors.clientEmail}
              />
            )}
          />
          <Controller
            name="clientStreetAddress"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                label="Street Address"
                {...field}
                ref={null}
                error={errors.clientStreetAddress}
              />
            )}
          />
          <div tw="flex gap-6">
            <Controller
              name="clientCity"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  label="City"
                  {...field}
                  ref={null}
                  error={errors.clientCity}
                />
              )}
            />
            <Controller
              name="clientPostCode"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  label="Post Code"
                  {...field}
                  onChange={(event) => field.onChange(event.target.value)}
                  ref={null}
                  error={errors.clientPostCode}
                />
              )}
            />
            <Controller
              name="clientCountry"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  label="Country"
                  {...field}
                  ref={null}
                  error={errors.clientCountry}
                />
              )}
            />
          </div>
          <div tw="flex gap-6 mb-[25px] desktop:(flex-nowrap) tablet:(flex-nowrap) flex-wrap">
            <DatePicker
              label="Invoice Date"
              value={invoiceDate}
              onChange={(value) => setInvoiceDate(value)}
            />
            <Select
              label="Paynment Terms"
              options={[
                { key: "Net 1 day", value: 1 },
                { key: "Net 10 days", value: 10 },
                { key: "Net 30 days", value: 30 },
              ]}
              selected={paymentTerms}
              setSelected={setPaymentTerms}
            />
          </div>
          <div tw="mb-[35px]">
            <Controller
              name="clientProjectDescription"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  label="Project Description"
                  {...field}
                  ref={null}
                  error={errors.clientProjectDescription}
                />
              )}
            />
          </div>
          <ItemsList
            fields={fields}
            append={append}
            remove={remove}
            control={control}
            watch={watch}
          />

          {newInvoice ? (
            <div tw="mt-[39px] mb-8 flex justify-between">
              <Button
                variant="secondary"
                label="Discard"
                onClick={() => discardEventHandler?.()}
              />

              <div tw="flex gap-2">
                <Button
                  type="submit"
                  variant="tertiary"
                  label="Save as draft"
                  onClick={() => setInvoiceState("DRAFT")}
                />

                <Button
                  type="submit"
                  variant="primary"
                  label="Save & Send"
                  onClick={() => setInvoiceState("PENDING")}
                  isLoading={createInvoice.isLoading}
                />
              </div>
            </div>
          ) : (
            <div tw="flex justify-end mt-[39px] mb-8 gap-2">
              <Button
                variant="tertiary"
                label="Cancel"
                onClick={() => toggleDrawer()}
              />

              <Button
                type="submit"
                variant="primary"
                label="Update"
                onClick={() => updateEventHandler?.()}
                isLoading={createInvoice.isLoading}
              />
            </div>
          )}
        </form>
      </FormContainer>
    </>
  );
};

export default Form;
