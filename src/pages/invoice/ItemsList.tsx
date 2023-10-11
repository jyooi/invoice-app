import tw, { styled } from "twin.macro";
import Image from "next/image";
import { TextField } from "~/components/TextField";
import { Button } from "~/components/Button";
import { Body, HeadingM } from "~/components/Typography";
import TrashIcon from "../../image/Icons/grey_trash_icon.svg";

import {
  type Control,
  Controller,
  type FieldValues,
  type UseFieldArrayRemove,
  type UseFieldArrayAppend,
  type UseFormWatch,
} from "react-hook-form";
import { type Item } from "./index";

const Container = styled.div(() => [tw``]);

type PropType = {
  fields: Record<"id", string>[];
  append: UseFieldArrayAppend<FieldValues, "itemArray">;
  remove: UseFieldArrayRemove;
  control: Control<FieldValues, Item>;
  watch: UseFormWatch<FieldValues>;
};

const ItemsList = ({ fields, remove, control, append, watch }: PropType) => {
  console.log(watch().itemArray);
  return (
    <Container>
      <div tw="mb-[14px]">
        <HeadingM> Item List</HeadingM>
      </div>
      <div tw="flex flex-col gap-4">
        <div tw="grid grid-cols-8 place-items-center gap-4 justify-items-start">
          <div tw="col-span-3 ">
            <Body>Item Name</Body>
          </div>
          <div tw="col-span-1">Qty</div>
          <div tw="col-span-2">Price</div>
          <div tw="col-span-1">Total</div>
          <div tw="col-span-1"></div>
        </div>
        {fields?.map((item, index) => (
          <div
            key={item.id}
            tw="col-span-8 grid grid-cols-8 place-items-center gap-4 justify-items-start"
          >
            <div tw="col-span-3">
              <Controller
                name={`itemArray[${index}].itemName`}
                control={control}
                render={({ field }) => (
                  <TextField tw="w-full max-w-[214px]" {...field} />
                )}
              />
            </div>
            <div tw="col-span-1">
              <Controller
                name={`itemArray[${index}].itemQuantity`}
                control={control}
                render={({ field }) => (
                  <TextField tw="w-full max-w-[46px]" {...field} />
                )}
              />
            </div>
            <div tw="col-span-2">
              <Controller
                name={`itemArray[${index}].itemPrice`}
                control={control}
                render={({ field }) => (
                  <TextField tw="w-full max-w-[100px]" {...field} />
                )}
              />
            </div>
            <div tw="col-span-1 h-12 flex items-center">
              {watch().itemArray?.[index]?.itemQuantity *
                watch().itemArray?.[index]?.itemPrice}
            </div>
            <div
              tw="col-span-1 place-self-end h-12 flex items-center"
              onClick={() => remove(index)}
            >
              <Image src={TrashIcon as string} alt="trash icon" />
            </div>
          </div>
        ))}
      </div>
      <div tw="w-full mt-[18px]">
        <Button
          variant="secondary"
          label="+ Add New Item"
          fullWidth
          onClick={() =>
            append({ name: "", itemName: "", itemQuantity: "", itemPrice: "" })
          }
        />
      </div>
    </Container>
  );
};

export default ItemsList;
