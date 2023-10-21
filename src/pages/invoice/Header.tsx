"use client";
import { Checkbox } from "~/components/Checkbox";
import { HeadingL, Body } from "~/components/Typography";

import { PopOver } from "~/components/Popover";
import { Button } from "~/components/Button";
import { useResponsiveMatch } from "~/utils/lib";
import { type InvoiceStatusFilter } from "./index";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
type PropType = {
  toggleDrawer: () => void;
  invoiceStatusFilter: InvoiceStatusFilter;
  setInvoiceStatusFilter: React.Dispatch<
    React.SetStateAction<InvoiceStatusFilter>
  >;
  invoiceCount: number;
};

const Header = ({
  toggleDrawer,
  invoiceStatusFilter,
  setInvoiceStatusFilter,
  invoiceCount,
}: PropType) => {
  const router = useRouter();
  const { data: sessionData, status } = useSession();
  const { isTablet, isDesktop } = useResponsiveMatch();

  return (
    <div tw="flex justify-between h-[55px]">
      <div tw="flex flex-col">
        <HeadingL>Invoice</HeadingL>
        <div tw="mt-[6px]">
          {invoiceCount > 0 ? (
            isTablet || isDesktop ? (
              <Body webForm>There are {invoiceCount} total invoice</Body>
            ) : (
              <Body webForm>{invoiceCount} invoice</Body>
            )
          ) : (
            <Body webForm>{"No invoice"}</Body>
          )}
        </div>
      </div>

      <div tw="flex items-center gap-[18px] tablet:gap-[40px] desktop:gap-[40px]">
        <PopOver label={isTablet || isDesktop ? "Filter by status" : "Filter"}>
          <div tw="w-48 h-32 p-[24px]">
            <div tw="flex flex-col gap-4">
              <Checkbox
                setIsChecked={() =>
                  setInvoiceStatusFilter((prev) => ({
                    ...prev,
                    DRAFT: !prev?.DRAFT,
                  }))
                }
                isChecked={invoiceStatusFilter?.DRAFT}
                label="Draft"
              />
              <Checkbox
                setIsChecked={() =>
                  setInvoiceStatusFilter((prev) => ({
                    ...prev,
                    PENDING: !prev?.PENDING,
                  }))
                }
                isChecked={invoiceStatusFilter?.PENDING}
                label="Pending"
              />
              <Checkbox
                setIsChecked={() =>
                  setInvoiceStatusFilter((prev) => ({
                    ...prev,
                    PAID: !prev?.PAID,
                  }))
                }
                isChecked={invoiceStatusFilter?.PAID}
                label="Paid"
              />
            </div>
          </div>
        </PopOver>
        <div tw="flex gap-2">
          <Button
            addIcon
            variant="primary"
            label={isTablet || isDesktop ? "New Invoice" : "New"}
            onClick={() => toggleDrawer()}
          />
          {sessionData && (
            <Button
              isLoading={status !== "authenticated"}
              variant="primary"
              label={"Sign out"}
              onClick={() => {
                void signOut();
                void router.push("/");
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
