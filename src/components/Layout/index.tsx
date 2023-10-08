import { Navbar } from "~/components/Navbar";
import tw, { styled } from "twin.macro";

type PropType = {
  children: React.ReactNode;
};

const MainWrapper = styled.main(() => [
  tw`flex justify-center desktop:(h-screen) tablet:(h-screen) h-screen`,
]);

const ResponsiveContainer = styled.div(() => [
  tw`max-w-[730px] w-full tablet:(mt-[61px] mx-12) mt-8 mx-6`,
]);

export default function Layout({ children }: PropType) {
  return (
    <>
      <Navbar />
      <MainWrapper>
        <ResponsiveContainer>{children}</ResponsiveContainer>
      </MainWrapper>
    </>
  );
}
