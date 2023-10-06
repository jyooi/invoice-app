import { Navbar } from "~/components/Navbar";
import tw, { styled } from "twin.macro";
import { useSession } from "next-auth/react";
type PropType = {
  children: React.ReactNode;
};

const MainWrapper = styled.main(() => [tw`flex justify-center h-full`]);

const ResponsiveContainer = styled.div(() => [
  tw`max-w-[730px] w-full tablet:(mt-[61px] mx-12) mt-8 mx-6`,
]);

export default function Layout({ children }: PropType) {
  const { data: sessionData } = useSession();
  return (
    <>
      {sessionData ? <Navbar /> : null}
      <MainWrapper>
        <ResponsiveContainer>{children}</ResponsiveContainer>
      </MainWrapper>
    </>
  );
}
