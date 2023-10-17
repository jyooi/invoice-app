"use client";
import { Checkbox } from "~/components/Checkbox";
import { HeadingL, Body } from "~/components/Typography";

import { PopOver } from "~/components/Popover";
import { Button } from "~/components/Button";
import { useResponsiveMatch } from "~/utils/lib";
import { type InvoiceStatusFilter } from "./index";
type PropType = {
  toggleDrawer: () => void;
  invoiceStatusFilter: InvoiceStatusFilter;
  setInvoiceStatusFilter: React.Dispatch<
    React.SetStateAction<InvoiceStatusFilter>
  >;
};

const Header = ({
  toggleDrawer,
  invoiceStatusFilter,
  setInvoiceStatusFilter,
}: PropType) => {
  const { isTablet, isDesktop } = useResponsiveMatch();

  return (
    <div tw="flex justify-between h-[55px]">
      <div tw="flex flex-col">
        <HeadingL>Invoice</HeadingL>
        {isTablet || isDesktop ? (
          <Body>There are 7 total invoice</Body>
        ) : (
          <Body>7 invoice</Body>
        )}
      </div>

      <div tw="flex items-center gap-[18px] tablet:gap-[40px] desktop:gap-[40px]">
        <PopOver label={isTablet || isDesktop ? "Filter by status" : "Filter"}>
          <div tw="w-48 h-32 p-[24px]">
            <div tw="flex flex-col gap-4">
              <Checkbox
                setIsChecked={() =>
                  setInvoiceStatusFilter((prev) => ({
                    ...prev,
                    DRAFT: !prev.DRAFT,
                  }))
                }
                isChecked={invoiceStatusFilter.DRAFT}
                label="Draft"
              />
              <Checkbox
                setIsChecked={() =>
                  setInvoiceStatusFilter((prev) => ({
                    ...prev,
                    PENDING: !prev.PENDING,
                  }))
                }
                isChecked={invoiceStatusFilter.PENDING}
                label="Pending"
              />
              <Checkbox
                setIsChecked={() =>
                  setInvoiceStatusFilter((prev) => ({
                    ...prev,
                    PAID: !prev.PAID,
                  }))
                }
                isChecked={invoiceStatusFilter.PAID}
                label="Paid"
              />
            </div>
          </div>
        </PopOver>
        <Button
          addIcon
          variant="primary"
          label={isTablet || isDesktop ? "New Invoice" : "New"}
          onClick={() => toggleDrawer()}
        />
      </div>
    </div>
  );
};

export default Header;
