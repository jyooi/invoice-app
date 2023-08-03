// import { api } from "~/utils/api";

import { useState } from "react";
import { Header } from "./Header";
// import { StatusCard } from "../components/StatusCard";
export default function Invoice() {
  // const users = api.user.getAll.useQuery();

  // const getUniqueUser = api.user.getOne.useQuery({
  //   id: "clgpx8mrl0000p1jesiww",
  // });

  const [isCheck, setIsCheck] = useState(false);

  return (
    <div tw="h-screen">
      <Header />
    </div>
  );
}
