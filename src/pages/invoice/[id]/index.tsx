// import { useRouter } from "next/router";
import tw, { styled } from "twin.macro";

import Image from "next/image";
import Link from "next/link";
import PurpleChevronLeft from "../../../image/Icons/purple_chevron_left_icon.svg";
import { HeadingS } from "~/components/Typography";
import ActionStatusBar from "./ActionStatusBar";
import InvoiceDetails from "./InvoiceDetails";
import MobileStickyActionBar from "./MobileStickyActionBar";
const Container = styled.div(() => [tw`desktop:(h-screen) tablet:(h-screen)`]);

export default function Invoice() {
  // const router = useRouter();

  return (
    <>
      <Container>
        <Link
          href="/invoice"
          tw="flex gap-6 mb-[31px] desktop:(pl-0) tablet:(pl-0) pl-6"
        >
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
        <MobileStickyActionBar />
      </Container>
    </>
  );
}
