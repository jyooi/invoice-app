import tw, { styled } from "twin.macro";

import { TextField } from "~/components/TextField";
import { Button } from "~/components/Button";
import { Body, HeadingM } from "~/components/Typography";

const Container = styled.div(() => [tw``]);

const ItemsList = () => {
  return (
    <Container>
      <div tw="mb-[14px]">
        <HeadingM> Item List</HeadingM>
      </div>
      <div tw="grid grid-cols-8 place-items-center gap-4 justify-items-start">
        <div tw="col-span-3 ">
          <Body>Item Name</Body>
        </div>
        <div tw="col-span-1">Qty</div>
        <div tw="col-span-2">Price</div>
        <div tw="col-span-1">Total</div>
        <div tw="col-span-1"></div>

        <div tw="col-span-3">
          <TextField tw="w-full max-w-[214px]" />
        </div>
        <div tw="col-span-1">
          <TextField tw="w-full max-w-[46px]" />
        </div>
        <div tw="col-span-2">
          <TextField tw="w-full max-w-[100px]" />
        </div>
        <div tw="col-span-1">156.01</div>
        <div tw="col-span-1">
          <svg
            tw="w-full max-w-[56px]"
            width="13"
            height="16"
            viewBox="0 0 13 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8.47225 0L9.36117 0.888875H12.4722V2.66667H0.027832V0.888875H3.13892L4.02783 0H8.47225ZM2.6945 16C1.71225 16 0.916707 15.2045 0.916707 14.2222V3.55554H11.5834V14.2222C11.5834 15.2045 10.7878 16 9.80562 16H2.6945Z"
              fill="#888EB0"
            />
          </svg>
        </div>
      </div>
      <div tw="w-full mt-[18px]">
        <Button
          variant="secondary"
          label="+ Add New Item"
          fullWidth
          onClick={() => null}
        />
      </div>
    </Container>
  );
};

export default ItemsList;
