"use client";

import tw, { styled } from "twin.macro";
import { Card } from "~/components/Card";
import StatusCard from "~/components/StatusCard";
import { Body } from "~/components/Typography";
import { Button } from "~/components/Button";

const Container = styled.div(() => [
  tw`desktop:(flex justify-between) tablet:(flex justify-between)`,
]);

const ActionButtonGroup = styled.div(() => [
  tw`desktop:(flex gap-2) tablet:(flex gap-2) hidden`,
]);

const StatusGrroup = styled.div(() => [
  tw`desktop:(flex items-center gap-5) tablet:(flex items-center gap-5) flex justify-between items-center`,
]);

export const ActionStatusBar = () => {
  return (
    <Card>
      <Container>
        <StatusGrroup tw="">
          <Body variant>Status</Body>
          <StatusCard status="Pending" />
        </StatusGrroup>

        <ActionButtonGroup>
          <Button variant="secondary" label="Edit" onClick={() => null} />
          <Button variant="alert" label="Delete" onClick={() => null} />
          <Button variant="primary" label="Mark as Paid" onClick={() => null} />
        </ActionButtonGroup>
      </Container>
    </Card>
  );
};
