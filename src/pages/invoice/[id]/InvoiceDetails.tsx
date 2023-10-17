import { Card } from "~/components/Card";
import { HeadingS, Body } from "~/components/Typography";
import tw, { styled } from "twin.macro";
import { api } from "~/utils/api";
import dayjs from "dayjs";

const InvoiceTitleSection = styled.div(() => [
  tw`desktop:(flex flex-row justify-between mb-[21px])`,
  tw`tablet:(flex flex-row justify-between mb-[21px])`,
  tw`flex flex-col mb-[33px] gap-[30px]`,
]);

const InvoiceShipmentSection = styled.div(() => [
  tw`desktop:(flex flex-row gap-[117px] mb-11 flex-wrap justify-start)`,
  tw`tablet:(flex justify-start flex-row mb-11 flex-wrap gap-[117px])`,
  tw`flex flex-wrap justify-between mb-[38px] gap-[35px]`,
]);

const InvoiceDateRow = styled.div(() => [
  tw`flex flex-col gap-3 justify-between`,
]);

const ItemsTableSection = styled.div(() => [
  tw`rounded-t-lg bg-[#F9FAFE] p-[33px] pb-[0px] dark:bg-04 `,
]);

const ItemsTotalSection = styled.div(() => [
  tw`bg-[#373B53] rounded-b-lg p-[33px] dark:bg-08`,
]);

const TableHeader = styled.div(() => [
  tw`desktop:(flex justify-between items-center pb-[33px])`,
  tw`tablet:(flex justify-between items-center pb-[33px])`,
  tw`hidden`,
]);

const TableRow = styled.div(() => [
  tw`flex justify-between items-center pb-[33px]`,
]);

const MobileItemsCountContainer = styled.div(() => [
  tw`desktop:(hidden) tablet:(hidden) flex flex-nowrap gap-1 items-center mt-2`,
]);

type PropType = {
  id: string | undefined | string[];
};

const InvoiceDetails = ({ id }: PropType) => {
  const invoice = api.invoice.getOneInvoiceById.useQuery(
    { id: id as string },
    { enabled: Boolean(id) }
  );

  return (
    <Card>
      <InvoiceTitleSection>
        <HeadingS>
          <span tw="text-07">#</span> {id}
        </HeadingS>
        <Body webForm>
          {invoice.data?.streetAddress} <br />
          {invoice.data?.city} {invoice.data?.postCode}
          <br />
          {invoice.data?.country}
        </Body>
      </InvoiceTitleSection>
      <InvoiceShipmentSection>
        <InvoiceDateRow>
          <>
            <Body tw="text-07">Invoice Date</Body>
            <HeadingS>
              {dayjs(invoice.data?.date).format("DD MMM YYYY")}
            </HeadingS>
          </>
          <>
            <Body tw="text-07">Payment Due</Body>
            <HeadingS>
              {dayjs(invoice.data?.date)
                .add(Number(invoice.data?.paymentTerms), "day")
                .format("DD MMM YYYY")}
            </HeadingS>
          </>
        </InvoiceDateRow>

        <div>
          <Body webForm> Bill To</Body>
          <HeadingS tw="mb-[7px]">{invoice.data?.clientName}</HeadingS>
          <Body webForm>
            {invoice.data?.clientStreetAddress} <br />{" "}
            {invoice.data?.clientCity}
            {"  "}
            {invoice.data?.clientPostCode}
            {invoice.data?.clientCity}
            <br />
            {invoice.data?.country}
          </Body>
        </div>

        <div>
          <Body webForm>Ship to</Body>
          <HeadingS>{invoice.data?.clientEmail}</HeadingS>
        </div>
      </InvoiceShipmentSection>

      <ItemsTableSection>
        <TableHeader>
          <Body webForm>Item Name</Body>
          <Body webForm>QTY.</Body>
          <Body webForm>Price</Body>
          <Body webForm>Total</Body>
        </TableHeader>
        {invoice.data?.items.map((item) => (
          <TableRow key={item.id}>
            <HeadingS>
              {item.name}
              <MobileItemsCountContainer>
                <Body webForm tw="font-bold ">
                  {item.quantity} {"x"}
                </Body>
                <Body webForm tw="font-bold">
                  $ {item.price}
                </Body>
              </MobileItemsCountContainer>
            </HeadingS>

            <Body webForm tw="font-bold desktop:(block) tablet:(block) hidden">
              {item.quantity}
            </Body>
            <Body webForm tw="font-bold desktop:(block) tablet:(block) hidden">
              $ {item.price}
            </Body>

            <HeadingS>$ {item.quantity * item.price}</HeadingS>
          </TableRow>
        ))}
      </ItemsTableSection>
      <ItemsTotalSection>
        <div tw="flex justify-between items-center">
          <Body webForm tw="text-white">
            Amount Due
          </Body>
          <HeadingS tw="text-white">$ {invoice.data?.totalAmount}</HeadingS>
        </div>
      </ItemsTotalSection>
    </Card>
  );
};

export default InvoiceDetails;
