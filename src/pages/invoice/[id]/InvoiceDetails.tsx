import { Card } from "~/components/Card";
import { HeadingS, Body } from "~/components/Typography";
import tw, { styled } from "twin.macro";

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

const InvoiceDetails = () => {
  return (
    <Card>
      <InvoiceTitleSection>
        <HeadingS>
          <span tw="text-07">#</span> XM9141
        </HeadingS>
        <Body webForm>
          19 Union Terrace <br />
          London E1 3EZ <br />
          United Kingdom
        </Body>
      </InvoiceTitleSection>
      <InvoiceShipmentSection>
        <InvoiceDateRow>
          <>
            <Body tw="text-07">Invoice Date</Body>
            <HeadingS>21 Aug 2021</HeadingS>
          </>
          <>
            <Body tw="text-07">Payment Due</Body>
            <HeadingS>21 Aug 2021</HeadingS>
          </>
        </InvoiceDateRow>

        <div>
          <Body webForm> Bill To</Body>
          <HeadingS tw="mb-[7px]">Alex Grim</HeadingS>
          <Body webForm>
            19 Union Terrace <br /> London E1 3EZ <br />
            United Kingdom
          </Body>
        </div>

        <div>
          <Body webForm>Ship to</Body>
          <HeadingS>alexgrim@mail.com</HeadingS>
        </div>
      </InvoiceShipmentSection>

      <ItemsTableSection>
        <TableHeader>
          <Body webForm>Item Name</Body>
          <Body webForm>QTY.</Body>
          <Body webForm>Price</Body>
          <Body webForm>Total</Body>
        </TableHeader>
        <TableRow>
          <HeadingS>
            Brand Guidelines
            <MobileItemsCountContainer>
              <Body webForm tw="font-bold ">
                1 {"x"}
              </Body>
              <Body webForm tw="font-bold">
                $ 2,500.00
              </Body>
            </MobileItemsCountContainer>
          </HeadingS>

          <Body webForm tw="font-bold desktop:(block) tablet:(block) hidden">
            1
          </Body>
          <Body webForm tw="font-bold desktop:(block) tablet:(block) hidden">
            $ 2,500.00
          </Body>

          <HeadingS>$2,500.00</HeadingS>
        </TableRow>
      </ItemsTableSection>
      <ItemsTotalSection>
        <div tw="flex justify-between items-center">
          <Body webForm tw="text-white">
            Amount Due
          </Body>
          <HeadingS tw="text-white">$ 2,500.00</HeadingS>
        </div>
      </ItemsTotalSection>
    </Card>
  );
};

export default InvoiceDetails;
