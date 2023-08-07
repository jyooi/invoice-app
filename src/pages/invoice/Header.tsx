"use client";
import { Checkbox } from "~/components/Checkbox";
import { HeadingL, Body } from "~/components/Typography";

import { PopOver } from "~/components/Popover";
import { Button } from "~/components/Button";
import { useState } from "react";
import { useResponsiveMatch } from "~/utils/lib";


const Header = () => {
  const [isCheck, setIsCheck] = useState(false);

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
                setIsChecked={setIsCheck}
                isChecked={isCheck}
                label="Draft"
              />
              <Checkbox
                setIsChecked={setIsCheck}
                isChecked={isCheck}
                label="Pending"
              />
              <Checkbox
                setIsChecked={setIsCheck}
                isChecked={isCheck}
                label="Paid"
              />
            </div>
          </div>
        </PopOver>
        <Button
          addIcon
          variant="primary"
          label={isTablet || isDesktop ? "New Invoice" : "New"}
          onClick={() => null}
        />
      </div>
    </div>
  );
};

export default Header;
