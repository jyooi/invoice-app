// import { useRouter } from "next/router";
import tw, { styled } from "twin.macro";

import Image from "next/image";
import Link from "next/link";
import PurpleChevronLeft from "../../../image/Icons/purple_chevron_left_icon.svg";
import { HeadingS } from "~/components/Typography";
import ActionStatusBar from "./ActionStatusBar";
import InvoiceDetails from "./InvoiceDetails";
import MobileStickyActionBar from "./MobileStickyActionBar";
import { useRouter } from "next/router";

function Invoice() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Container>
      <Link tw="flex gap-6 mb-[31px]" href="/invoice">
        <Image
          src={PurpleChevronLeft as string}
          alt="purple chevron left"
        ></Image>
        <HeadingS>Go back</HeadingS>
      </Link>
      <div tw="mb-6">
        <ActionStatusBar />
      </div>
      <InvoiceDetails id={id} />
      <MobileStickyActionBar />
    </Container>
  );
}

const Container = styled.div(() => [tw`desktop:(h-screen) tablet:(h-screen)`]);

export default Invoice;
