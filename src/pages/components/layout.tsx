import { Navbar } from "~/components/Navbar";

type PropType = {
  children: React.ReactNode;
};

export default function Layout({ children }: PropType) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
