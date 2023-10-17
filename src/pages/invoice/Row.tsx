import tw, { styled, css } from "twin.macro";
import StatusCard, { type InoviceStatus } from "../../components/StatusCard";
import { Body, HeadingS } from "~/components/Typography";
import ChevronRightSvg from "../../image/Icons/purple_chevron_right_icon.svg";
import Image from "next/image";
import dayjs from "dayjs";
const Container = styled.div(() => [
  tw`min-h-[72px] w-full rounded-md  items-center mb-[15px]`,
  tw`bg-white border border-transparent hover:border hover:border-01 cursor-pointer dark:bg-03`,
  tw`desktop:(grid grid-cols-[1fr,1fr,1fr,1fr,1fr,0.1fr] px-6 grid-rows-[1fr])`,
  tw`tablet:(grid grid-cols-[1fr,1fr,1fr,1fr,1fr,0.1fr] px-6 grid-rows-[1fr])`,
  tw`grid grid-cols-[1fr 1fr] grid-rows-[1fr 1fr] p-6`,
  css`
    box-shadow: 0px 10px 10px -10px rgba(72, 84, 159, 0.1);
  `,
]);

type PropType = {
  invoiceId: string;
  invoiceDate: Date;
  clientName: string;
  totalAmount: number;
  status: string;
  onRowClick?: () => void;
};

const Row = ({
  invoiceId,
  invoiceDate,
  clientName,
  totalAmount,
  status,
  onRowClick,
}: PropType) => {
  return (
    <Container onClick={() => onRowClick?.()}>
      <div tw="order-first">
        <HeadingS tw="text-07">
          <span># {invoiceId.slice(0, 6).toUpperCase()}...</span>
        </HeadingS>
      </div>
      <div tw="order-3">
        <Body tw="text-07 ">
          <span tw="text-06">Due</span>{" "}
          {dayjs(invoiceDate).format("DD MMM YYYY")}
        </Body>
      </div>
      <div tw="order-1 justify-self-end tablet:justify-self-center desktop:justify-self-center">
        <Body tw="text-[#858BB2]">{clientName}</Body>
      </div>
      <div tw="order-5 tablet:justify-self-center desktop:justify-self-center">
        <HeadingS>$ {totalAmount}</HeadingS>
      </div>
      <div tw="order-6 justify-self-end tablet:justify-self-start desktop:justify-self-start ">
        <StatusCard status={status as InoviceStatus} />
      </div>
      <div tw="order-4 tablet:order-last desktop:order-last">
        <Image
          tw="justify-self-end hidden desktop:block tablet:block "
          src={ChevronRightSvg as string}
          alt="chevron-right"
        />
      </div>
    </Container>
  );
};

export default Row;
