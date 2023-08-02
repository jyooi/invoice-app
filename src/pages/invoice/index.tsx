// import { api } from "~/utils/api";
import { Checkbox } from "~/components/Checkbox";
import { HeadingL, Body } from "~/components/Typography";
import { useState } from "react";
import { PopOver } from "~/components/Popover";
import { Button } from "~/components/Button";
export default function Invoice() {
  // const users = api.user.getAll.useQuery();

  // const getUniqueUser = api.user.getOne.useQuery({
  //   id: "clgpx8mrl0000p1jesiww",
  // });

  const [isCheck, setIsCheck] = useState(false);

  return (
    <div tw="h-screen">
      <div tw="flex justify-between h-[55px]">
        <div tw="flex flex-col">
          <HeadingL>Invoice</HeadingL>
          <Body>There are 7 total invoice</Body>
        </div>

        <div tw="flex items-center gap-[40px]">
          <PopOver label="Filter by status">
            <div tw="w-48 h-36">
              <Checkbox setIsChecked={setIsCheck} isChecked={isCheck} />
              <Checkbox setIsChecked={setIsCheck} isChecked={isCheck} />
              <Checkbox setIsChecked={setIsCheck} isChecked={isCheck} />
            </div>
          </PopOver>
          <Button
            addIcon
            variant="primary"
            label={"New Invoice"}
            onClick={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </div>
      </div>
    </div>
  );
}
