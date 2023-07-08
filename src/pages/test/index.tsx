import { DatePicker } from "~/components/DatePicker";

import { api } from "~/utils/api";

export default function Test() {
  const users = api.user.getAll.useQuery();

  const getUniqueUser = api.user.getOne.useQuery({
    id: "clgpx8mrl0000p1jesiww",
  });

  console.log(getUniqueUser.error);
  console.log(users.data);

  return (
    <div>
      Test <DatePicker label="Trip dates" />
    </div>
  );
}
