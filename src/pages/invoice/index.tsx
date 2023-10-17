// import { api } from "~/utils/api";
"use client";
import dynamic from "next/dynamic";
import EmptyInvoiceSvg from "../../image/empty_invoice.svg";
import { Drawer } from "~/components/Drawer";
import { useState } from "react";
import Image from "next/image";
import Row from "./Row";
import { Body, HeadingM } from "~/components/Typography";
import { useResponsiveMatch } from "~/utils/lib";
import Form from "./Form";
import { useWindowSize } from "react-use";
import { api } from "~/utils/api";
import { Spinner } from "~/components/Spinner";

const Header = dynamic(() => import("./Header"), { ssr: false });

export type InvoiceStatusFilter = {
  DRAFT: boolean;
  PENDING: boolean;
  PAID: boolean;
};

export default function Invoice() {
  const [invoiceStatusFilter, setInvoiceStatusFilter] =
    useState<InvoiceStatusFilter>({ DRAFT: true, PENDING: true, PAID: true });

  // get all invoice api with status filter
  const invoices = api.invoice.getAllInvoice.useQuery({
    status: Object.entries(invoiceStatusFilter)
      .filter(([, value]) => Boolean(value))
      .map(([status]) => status as "DRAFT" | "PENDING" | "PAID"),
  });

  const [addInvoiceDrawerOpen, setAddInvoiceDrawerOpen] = useState(false);

  const { width } = useWindowSize();

  const { isTablet } = useResponsiveMatch();

  const toggleDrawer = () => {
    setAddInvoiceDrawerOpen((prevState) => !prevState);
  };

  return (
    <div tw="">
      <Header
        toggleDrawer={toggleDrawer}
        invoiceStatusFilter={invoiceStatusFilter}
        setInvoiceStatusFilter={setInvoiceStatusFilter}
        invoiceCount={invoices?.data?.length ?? 0}
      />

      {invoices.isLoading ? (
        <div tw="flex items-center justify-center h-[500px]">
          <Spinner />
        </div>
      ) : (
        <div tw="mt-16 flex justify-center items-center flex-col">
          {invoices?.data?.length ? (
            invoices?.data?.map((invoice) => (
              <Row
                key={invoice.id}
                invoiceDate={invoice.date}
                invoiceId={invoice.id}
                status={invoice.status}
                clientName={invoice.clientName}
                totalAmount={invoice.totalAmount}
              />
            ))
          ) : (
            <>
              <Image
                tw="mt-20"
                src={EmptyInvoiceSvg as string}
                alt="empty invoice svg"
              />
              <HeadingM tw="mt-[66px]"> There is nothing here</HeadingM>

              <Body tw="mt-[23px] text-center text-06">
                Create an invoice by clicking the <br /> New Invoice Button and
                get started
              </Body>
            </>
          )}
        </div>
      )}

      <Drawer
        open={addInvoiceDrawerOpen}
        onClose={toggleDrawer}
        direction="left"
        size={width > 696 ? 696 : width}
        styles={{ marginTop: isTablet ? 80 : 0 }}
      >
        <Form toggleDrawer={toggleDrawer} newInvoice />
      </Drawer>
    </div>
  );
}
