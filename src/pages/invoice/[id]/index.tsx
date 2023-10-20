// import { useRouter } from "next/router";
import tw, { styled } from "twin.macro";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PurpleChevronLeft from "../../../image/Icons/purple_chevron_left_icon.svg";
import { HeadingS } from "~/components/Typography";
import ActionStatusBar from "./ActionStatusBar";
import InvoiceDetails from "./InvoiceDetails";
import MobileStickyActionBar from "./MobileStickyActionBar";
import { useRouter } from "next/router";
import AlertModel from "~/components/AlertModal";
import { api } from "~/utils/api";

function Invoice() {
  const utils = api.useContext();
  const router = useRouter();
  const { id } = router.query;

  const deleteInvoice = api.invoice.removeInvoice.useMutation();
  const updateInvoice = api.invoice.updateInvoiceStatus.useMutation();

  const [dialog, setDialog] = useState<{
    title: string;
    message: string;
    isOpen: boolean;
    onConfirm?: () => Promise<void>;
  }>({
    title: "",
    message: "",
    isOpen: false,
  });

  function resetDialog() {
    setDialog({
      title: "",
      message: "",
      isOpen: false,
    });
  }

  async function handleInvoiceStateChange() {
    await utils.invoice.getAllInvoice.invalidate();
    void router.push("/invoice");
  }

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
        <ActionStatusBar
          onDeleteInvoice={() =>
            setDialog({
              isOpen: true,
              title: "Confirm Deletion",
              message: "Are you sure you want to delete this invoice?",
              onConfirm: async () => {
                await deleteInvoice.mutateAsync({ id: id as string });
                await handleInvoiceStateChange();
              },
            })
          }
          onEditInvoice={() => null}
          onMarkPaidInvoice={() =>
            setDialog({
              isOpen: true,
              title: "Mark as Paid",
              message: "Are you sure you want to mark this invoice as paid?",
              onConfirm: async () => {
                updateInvoice.mutate({ id: id as string, status: "PAID" });
                await utils.invoice.getAllInvoice.invalidate();
                void router.push("/invoice");
              },
            })
          }
        />
      </div>
      <InvoiceDetails id={id} />
      <MobileStickyActionBar />
      <AlertModel
        isOpen={dialog.isOpen}
        setIsOpen={() => resetDialog()}
        alertTitle={dialog.title}
        alertMessage={dialog.message}
        onConfirm={async () => dialog.onConfirm?.()}
      />
    </Container>
  );
}

const Container = styled.div(() => [tw`desktop:(h-screen) tablet:(h-screen)`]);

export default Invoice;
