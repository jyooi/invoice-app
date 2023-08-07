// import { api } from "~/utils/api";
"use client";
import dynamic from "next/dynamic";
import EmptyInvoiceSvg from "../../image/empty_invoice.svg";
import Image from "next/image";
import Row from "./Row";
import { Body, HeadingM, HeadingS } from "~/components/Typography";
// import { StatusCard } from "../components/StatusCard";

const Header = dynamic(() => import("./Header"), { ssr: false });

export default function Invoice() {
  // const users = api.user.getAll.useQuery();

  // const getUniqueUser = api.user.getOne.useQuery({
  //   id: "clgpx8mrl0000p1jesiww",
  // });

  return (
    <div tw="h-screen">
      <Header />

      <div tw="mt-16 flex justify-center items-center flex-col">
        <Image
          tw="mt-20"
          src={EmptyInvoiceSvg as string}
          alt="empty invoice svg"
        />
        <HeadingM tw="mt-[66px]"> There is nothing here</HeadingM>

        <Body tw="mt-[23px] text-center text-06">
          Create an invoice by clicking the <br /> New Invoice Button and get
          started
        </Body>

        {/* <Row /> */}
      </div>
    </div>
  );
}
