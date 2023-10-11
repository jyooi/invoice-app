// import { api } from "~/utils/api";
"use client";
import dynamic from "next/dynamic";
import EmptyInvoiceSvg from "../../image/empty_invoice.svg";
import { Drawer } from "~/components/Drawer";
import { useState } from "react";
import Image from "next/image";
// import Row from "./Row";
import { Body, HeadingM } from "~/components/Typography";
import { useResponsiveMatch } from "~/utils/lib";
import Form from "./Form";
import { useWindowSize } from "react-use";

// import { StatusCard } from "../components/StatusCard";

const Header = dynamic(() => import("./Header"), { ssr: false });

export type Item = {
  id: string;
  name: string;
  qty: number;
  price: number;
  total: number;
};

export default function Invoice() {
  const [items, setItems] = useState<Item[]>([]);

  const [addInvoiceDrawerOpen, setAddInvoiceDrawerOpen] = useState(false);

  const { width } = useWindowSize();

  const { isTablet } = useResponsiveMatch();

  // const users = api.user.getAll.useQuery();

  // const getUniqueUser = api.user.getOne.useQuery({
  //   id: "clgpx8mrl0000p1jesiww",
  // });

  const toggleDrawer = () => {
    setAddInvoiceDrawerOpen((prevState) => !prevState);
  };

  return (
    <div tw="">
      <Header toggleDrawer={toggleDrawer} />

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

      <Drawer
        open={addInvoiceDrawerOpen}
        onClose={toggleDrawer}
        direction="left"
        size={width > 696 ? 696 : width}
        styles={{ marginTop: isTablet ? 80 : 0 }}
      >
        <Form toggleDrawer={toggleDrawer} items={items} setItems={setItems} />
      </Drawer>
    </div>
  );
}
