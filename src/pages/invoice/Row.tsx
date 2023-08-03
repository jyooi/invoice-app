import tw, { styled, css } from "twin.macro";
import { StatusCard } from "../components/StatusCard";
import { Body, HeadingS } from "~/components/Typography";
import ChevronRightSvg from "../../image/Icons/purple_chevron_right_icon.svg";
import Image from "next/image";

const Container = styled.div(() => [
  tw`h-[72px] w-full rounded-md  items-center mb-4 flex justify-evenly`,
  tw`bg-white border-0 hover:border hover:border-01 cursor-pointer dark:bg-03`,
  css`
    box-shadow: 0px 10px 10px -10px rgba(72, 84, 159, 0.1);
  `,
]);

export const Row = () => {
  return (
    <Container>
      <HeadingS>
        <span tw="text-07">#</span>
        {"RT2080"}
      </HeadingS>
      <Body tw="text-07">
        <span tw="text-06">Due</span> 31 Oct 2021
      </Body>
      <Body tw="text-[#858BB2]">Mellisa Clarke</Body>
      <HeadingS>$ 1,000</HeadingS>
      <StatusCard status="Paid" />
      <Image src={ChevronRightSvg as string} alt="chevron-right" />
    </Container>
  );
};
