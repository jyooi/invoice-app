import { Checkbox } from "~/components/Checkbox";
import { HeadingL, Body } from "~/components/Typography";

import { PopOver } from "~/components/Popover";
import { Button } from "~/components/Button";
import { useState } from "react";

export const Header = () => {
  const [isCheck, setIsCheck] = useState(false);

  return (
    <div tw="flex justify-between h-[55px]">
      <div tw="flex flex-col">
        <HeadingL>Invoice</HeadingL>
        <Body>There are 7 total invoice</Body>
      </div>

      <div tw="flex items-center gap-[40px]">
        <PopOver label="Filter by status">
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
          label={"New Invoice"}
          onClick={() => null}
        />
      </div>
    </div>
  );
};
