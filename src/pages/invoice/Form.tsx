"use client";

import { useState } from "react";
import Image from "next/image";
import tw, { styled } from "twin.macro";
import { DatePicker } from "~/components/DatePicker";
import { Select, type Option } from "~/components/Select";
import { TextField } from "~/components/TextField";
import { HeadingS, HeadingM } from "~/components/Typography";
import {
  useForm,
  Controller,
  useFieldArray,
  type SubmitHandler,
} from "react-hook-form";
import ItemsList from "./ItemsList";
import { Button } from "~/components/Button";
import { useResponsiveMatch } from "~/utils/lib";
import { api } from "~/utils/api";
import PurpleChevronLeft from "../../image/Icons/purple_chevron_left_icon.svg";

type PropType = {
  toggleDrawer: () => void;
};

type Item = {
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

const Form = ({ toggleDrawer }: PropType) => {
  const { handleSubmit, control, watch } = useForm<InvoiceFormValue>({
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
      invoiceDate: "2020-01-01T00:00:00Z",
      itemArray: [],
    },
  });
  // tract state for Select and DatePicker

  const [paymentTerms, setPaymentTerms] = useState("");
  const [invoiceDate, setInvoiceDate] = useState(new Date());

  // tract state for Select and DatePicker

  const createInvoice = api.invoice.createInvoice.useMutation();

  const { fields, remove, append } = useFieldArray({
    control,
    name: "itemArray", // unique name for your Field Array
  });

  const { isMobile } = useResponsiveMatch();

  const onSubmit = async (data: InvoiceFormValue) => {
    createInvoice.mutate({
      ...data,
      paymentTerms: Number(paymentTerms),
      status: "PENDING",
    });
  };

  return (
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
        <HeadingM tw="mb-[46px]">Edit #XM9141</HeadingM>

        <HeadingS tw="text-01 mb-6 dark:text-01">Bill From</HeadingS>

        <Controller
          name="streetAddress"
          control={control}
          render={({ field }) => (
            <TextField
              tw="w-full mb-[25px]"
              label="Street Address"
              {...field}
              ref={null}
            />
          )}
        />

        <div tw="flex gap-6">
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <TextField
                tw="w-full mb-[25px]"
                label="City"
                {...field}
                ref={null}
              />
            )}
          />
          <Controller
            name="postCode"
            control={control}
            render={({ field }) => (
              <TextField
                tw="w-full mb-[25px]"
                label="Post Code"
                {...field}
                ref={null}
              />
            )}
          />
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <TextField
                tw="w-full mb-[25px]"
                label="Country"
                {...field}
                ref={null}
              />
            )}
          />
        </div>

        <HeadingS tw="text-01 mb-6 dark:text-01">Bill To</HeadingS>

        <Controller
          name="clientName"
          control={control}
          render={({ field }) => (
            <TextField
              tw="mb-[25px]"
              label="Client's Name"
              {...field}
              ref={null}
            />
          )}
        />
        <Controller
          name="clientEmail"
          control={control}
          render={({ field }) => (
            <TextField
              tw="mb-[25px]"
              label="Client's Email"
              {...field}
              ref={null}
            />
          )}
        />
        <Controller
          name="clientStreetAddress"
          control={control}
          render={({ field }) => (
            <TextField
              tw="mb-[25px]"
              label="Street Address"
              {...field}
              ref={null}
            />
          )}
        />

        <div tw="flex gap-6 mb-[25px]">
          <Controller
            name="clientCity"
            control={control}
            render={({ field }) => (
              <TextField label="City" {...field} ref={null} />
            )}
          />
          <Controller
            name="clientPostCode"
            control={control}
            render={({ field }) => (
              <TextField
                label="Post Code"
                {...field}
                onChange={(event) => field.onChange(+event.target.value)}
                ref={null}
              />
            )}
          />
          <Controller
            name="clientCountry"
            control={control}
            render={({ field }) => (
              <TextField label="Country" {...field} ref={null} />
            )}
          />
        </div>
        <div tw="flex gap-6 mb-[25px]">
          <DatePicker label="Invoice Date" />
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
            render={({ field }) => (
              <TextField label="Project Description" {...field} ref={null} />
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
        <div tw="mt-[39px] mb-8 flex justify-between">
          <Button variant="secondary" label="Discard" onClick={() => null} />

          <div tw="flex gap-2">
            <Button
              variant="tertiary"
              label="Save as draft"
              onClick={() => null}
            />

            <Button
              type="submit"
              variant="primary"
              label="Save & Send"
              onClick={() => null}
              isLoading={createInvoice.isLoading}
            />
          </div>
        </div>
      </form>
    </FormContainer>
  );
};

export default Form;
