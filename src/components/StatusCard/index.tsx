"use client";
import React from "react";
import tw, { styled, css } from "twin.macro";
import { HeadingS } from "~/components/Typography";

type PropType = {
  status: "PAID" | "PENDING" | "DRAFT";
};

const Container = styled.div(({ status }: { status: PropType["status"] }) => {
  // statusObj
  const statusObj = {
    PAID: tw`bg-[#F3FDFA] dark:bg-[#202B3F]`,
    PENDING: tw`bg-[#FFF9F0] dark:bg-[#2B2736]`,
    DRAFT: tw`bg-[#F4F4F5] dark:bg-[#292744]`,
  }[status];

  return [
    tw`rounded-md flex justify-center gap-2 items-center`, // general style
    css`
      width: 104px;
      height: 40px;
    `,
    statusObj,
  ];
});

const Dot = styled.span(({ status }: PropType) => {
  // statusObj
  const statusObj = {
    PAID: tw`bg-status-green`,
    PENDING: tw`bg-status-orange`,
    DRAFT: tw`bg-status-gray dark:bg-05`,
  }[status];

  return [tw`w-2 h-2 rounded-full`, statusObj];
});

const Label = styled(HeadingS)(({ status }: PropType) => {
  // statusObj
  const statusObj = {
    PAID: tw`!text-status-green`,
    PENDING: tw`!text-status-orange`,
    DRAFT: tw`!text-status-gray dark:!text-05`,
  }[status];

  return [statusObj];
});

const StatusWord = (status: PropType["status"]) => {
  switch (status) {
    case "PAID":
      return "Paid";
    case "PENDING":
      return "Pending";
    case "DRAFT":
      return "Draft";
    default:
      return "Draft";
  }
};

const StatusCard = ({ status }: PropType) => {
  return (
    <Container status={status}>
      <Dot status={status} />
      <Label status={status}>{StatusWord(status)}</Label>
    </Container>
  );
};

export default StatusCard;
