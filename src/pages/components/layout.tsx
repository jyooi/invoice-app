import { Navbar } from "~/components/Navbar";
import tw, { styled } from "twin.macro";

type PropType = {
  children: React.ReactNode;
};

const MainWrapper = styled.main(() => [tw`flex justify-center`]);

const ResponsiveContainer = styled.div(() => [
  tw`max-w-[730px] w-full bg-blue-50 tablet:(mt-[61px]) mobile:(mt-8 mx-6)`,
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
