"use client";
import React from "react";
import tw, { styled, css } from "twin.macro";
import { HeadingS } from "~/components/Typography";

type PropType = {
  status: "Paid" | "Pending" | "Draft";
};

const Container = styled.div(({ status }: { status: PropType["status"] }) => {
  // statusObj
  const statusObj = {
    Paid: tw`bg-[#F3FDFA] dark:bg-[#202B3F]`,
    Pending: tw`bg-[#FFF9F0] dark:bg-[#2B2736]`,
    Draft: tw`bg-[#F4F4F5] dark:bg-[#292744]`,
  }[status];

  return [
    tw`rounded-md flex justify-center gap-2 items-center`, // genetal style
    css`
      width: 104px;
      height: 40px;
    `,
    statusObj,
  ];
});

const Dot = styled.span(({ status }: { status: PropType["status"] }) => {
  // statusObj
  const statusObj = {
    Paid: tw`bg-status-green`,
    Pending: tw`bg-status-orange`,
    Draft: tw`bg-status-gray dark:bg-05`,
  }[status];

  return [tw`w-2 h-2 rounded-full`, statusObj];
});

const Label = styled(HeadingS)(({ status }: { status: PropType["status"] }) => {
  // statusObj
  const statusObj = {
    Paid: tw`!text-status-green`,
    Pending: tw`!text-status-orange`,
    Draft: tw`!text-status-gray dark:!text-05`,
  }[status];

  return [statusObj];
});

const StatusCard = ({ status }: PropType) => {
  return (
    <Container status={status}>
      <Dot status={status} />
      <Label status={status}>{status}</Label>
    </Container>
  );
};

export default StatusCard;
