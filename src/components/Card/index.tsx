import tw, { styled, css } from "twin.macro";

type PropType = {
  children: React.ReactNode;
  tw?: string;
};

const Container = styled.div(() => [
  tw`rounded-lg bg-white dark:bg-03 p-6`,
  css`
    box-shadow: 0px 10px 10px -10px rgba(72, 84, 159, 0.1);
  `,
]);

export const Card = ({ children }: PropType) => {
  return <Container>{children}</Container>;
};
