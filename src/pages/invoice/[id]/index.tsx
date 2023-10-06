// import { useRouter } from "next/router";
import tw, { styled } from "twin.macro";

import Image from "next/image";
import Link from "next/link";
import PurpleChevronLeft from "../../../image/Icons/purple_chevron_left_icon.svg";
import { HeadingS } from "~/components/Typography";
import ActionStatusBar from "./ActionStatusBar";
import InvoiceDetails from "./InvoiceDetails";
const Container = styled.div(() => [tw`h-screen`]);

export default function Invoice() {
  // const router = useRouter();

  return (
    <Container>
      <Link href="/invoice" tw="flex gap-6 mb-[31px]">
        <Image
          src={PurpleChevronLeft as string}
          alt="purple chevron left"
        ></Image>
        <HeadingS>Go back</HeadingS>
      </Link>
      <div tw="mb-6">
        <ActionStatusBar />
      </div>
      <InvoiceDetails />
    </Container>
  );
}
