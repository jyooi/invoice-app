import tw, { styled } from "twin.macro";
import { DatePicker } from "~/components/DatePicker";
import { Select } from "~/components/Select";
import { TextField } from "~/components/TextField";
import { HeadingS, HeadingM } from "~/components/Typography";
import { useForm, Controller } from "react-hook-form";

const FormContainer = styled.div(() => [
  tw`px-[59px] py-[56px] h-full overflow-auto`,
]);

const Form = () => {
  const { handleSubmit, control } = useForm();

  return (
    <FormContainer>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <HeadingM tw="mb-[46px]">Edit #XM9141</HeadingM>

        <HeadingS tw="text-01 mb-6 dark:text-01">Bill From</HeadingS>

        <Controller
          name="streetAddress"
          control={control}
          render={({ field }) => (
            <TextField tw="w-full" label="Street Address" {...field} />
          )}
        />

        <div tw="flex gap-6">
          <TextField label="City" onChange={() => null} value="" />
          <TextField label="Post Code" onChange={() => null} value="" />
          <TextField label="Country" onChange={() => null} value="" />
        </div>

        <HeadingS tw="text-01 mb-6 dark:text-01">Bill To</HeadingS>
        <TextField label="Client's Name" onChange={() => null} value="" />
        <TextField label="Client's Email" onChange={() => null} value="" />
        <TextField label="Street Address" onChange={() => null} value="" />

        <div tw="flex gap-6">
          <TextField label="City" onChange={() => null} value="" />
          <TextField label="Post Code" onChange={() => null} value="" />
          <TextField label="Country" onChange={() => null} value="" />
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

        <TextField label="Project Description" onChange={() => null} value="" />

        <input type="submit" />
      </form>
    </FormContainer>
  );
};

export default Form;
