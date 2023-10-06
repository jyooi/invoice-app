import { Card } from "~/components/Card";
import { HeadingS, Body } from "~/components/Typography";

const InvoiceDetails = () => {
  return (
    <Card>
      <div tw="flex justify-between mb-[21px]">
        <HeadingS>
          <span tw="text-07">#</span> XM9141
        </HeadingS>
        <Body webForm>19 Union Terrace London E1 3EZ United Kingdom</Body>
      </div>

      <div tw="flex flex-col gap-3 justify-between">
        <div>
          <Body tw="text-07">Invoice Date</Body>
          <HeadingS>21 Aug 2021</HeadingS>
        </div>
        <div>
          <Body tw="text-07">Payment Due</Body>
          <HeadingS>21 Aug 2021</HeadingS>
        </div>
      </div>
    </Card>
  );
};

export default InvoiceDetails;
