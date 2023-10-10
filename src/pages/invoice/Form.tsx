"use client";
import Image from "next/image";
import tw, { styled } from "twin.macro";
import { DatePicker } from "~/components/DatePicker";
import { Select } from "~/components/Select";
import { TextField } from "~/components/TextField";
import { HeadingS, HeadingM } from "~/components/Typography";
import { useForm, Controller } from "react-hook-form";
import ItemsList from "./ItemsList";
import { Button } from "~/components/Button";
import { useResponsiveMatch } from "~/utils/lib";
import PurpleChevronLeft from "../../image/Icons/purple_chevron_left_icon.svg";

const FormContainer = styled.div(() => [
  tw`desktop:(ml-[80px] py-[56px] pr-[59px]) h-full overflow-auto`,
  tw`tablet:(pl-[59px]  py-[56px]) h-full overflow-auto`,
  tw`px-[59px] py-[56px] h-full overflow-auto`,
]);

type PropType = {
  toggleDrawer: () => void;
};

const Form = ({ toggleDrawer }: PropType) => {
  const { handleSubmit, control } = useForm();

  const { isMobile } = useResponsiveMatch();

  const onSubmit = (data) => console.log(data);

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
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
      <form>
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
            />
          )}
        />

        <div tw="flex gap-6">
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <TextField tw="w-full mb-[25px]" label="City" {...field} />
            )}
          />
          <Controller
            name="postCode"
            control={control}
            render={({ field }) => (
              <TextField tw="w-full mb-[25px]" label="Post Code" {...field} />
            )}
          />
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <TextField tw="w-full mb-[25px]" label="Country" {...field} />
            )}
          />
        </div>

        <HeadingS tw="text-01 mb-6 dark:text-01">Bill To</HeadingS>

        <Controller
          name="clientName"
          control={control}
          render={({ field }) => (
            <TextField tw="mb-[25px]" label="Client's Name" {...field} />
          )}
        />
        <Controller
          name="clientEmail"
          control={control}
          render={({ field }) => (
            <TextField tw="mb-[25px]" label="Client's Email" {...field} />
          )}
        />
        <Controller
          name="clientStreetAddress"
          control={control}
          render={({ field }) => (
            <TextField tw="mb-[25px]" label="Street Address" {...field} />
          )}
        />

        <div tw="flex gap-6 mb-[25px]">
          <Controller
            name="clientCity"
            control={control}
            render={({ field }) => <TextField label="City" {...field} />}
          />
          <Controller
            name="clientPostCode"
            control={control}
            render={({ field }) => <TextField label="Post Code" {...field} />}
          />
          <Controller
            name="clientCountry"
            control={control}
            render={({ field }) => <TextField label="Country" {...field} />}
          />
        </div>
        <div tw="flex gap-6 mb-[25px]">
          <DatePicker label="Invoice Date" />
          <Select
            label="Paynment Terms"
            options={[{ id: "Net 1 day", name: "Net 1 day" }]}
            selected={"123"}
            setSelected={() => null}
          />
        </div>

        <div tw="mb-[35px]">
          <Controller
            name="clientProjectDescription"
            control={control}
            render={({ field }) => (
              <TextField label="Project Description" {...field} />
            )}
          />
        </div>
        <ItemsList />
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
            />
          </div>
        </div>
      </form>
    </FormContainer>
  );
};

export default Form;
