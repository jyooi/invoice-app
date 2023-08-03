// import { api } from "~/utils/api";

import { Header } from "./Header";
import { Row } from "./Row";
// import { StatusCard } from "../components/StatusCard";
export default function Invoice() {
  // const users = api.user.getAll.useQuery();

  // const getUniqueUser = api.user.getOne.useQuery({
  //   id: "clgpx8mrl0000p1jesiww",
  // });

  return (
    <div tw="h-screen">
      <Header />

      <div tw="mt-16 ">
        <Row />
        <Row />
        <Row />
        <Row />
        <Row />
        <Row />
      </div>
    </div>
  );
}
