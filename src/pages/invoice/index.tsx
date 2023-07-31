// import { api } from "~/utils/api";
import { Checkbox } from "~/components/Checkbox";
import { HeadingL, Body } from "~/components/Typography";
import { useState } from "react";

export default function Invoice() {
  // const users = api.user.getAll.useQuery();

  // const getUniqueUser = api.user.getOne.useQuery({
  //   id: "clgpx8mrl0000p1jesiww",
  // });

  const [isCheck, setIsCheck] = useState(false);

  return (
    <div tw="h-screen">
      <HeadingL>Invoice</HeadingL>
      <Body>There are 7 total invoice</Body>
      <Checkbox setIsChecked={setIsCheck} isChecked={isCheck} />
    </div>
  );
}

