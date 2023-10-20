"use client";

import tw, { styled } from "twin.macro";
import { Card } from "~/components/Card";
import StatusCard, { type InoviceStatus } from "~/components/StatusCard";
import { Body } from "~/components/Typography";
import { Button } from "~/components/Button";
import { api } from "~/utils/api";
const Container = styled.div(() => [
  tw`desktop:(flex justify-between) tablet:(flex justify-between)`,
]);

const ActionButtonGroup = styled.div(() => [
  tw`desktop:(flex gap-2) tablet:(flex gap-2) hidden`,
]);

const StatusGrroup = styled.div(() => [
  tw`desktop:(flex items-center gap-5) tablet:(flex items-center gap-5) flex justify-between items-center`,
]);

type PropType = {
  onEditInvoice?: () => void;
  onDeleteInvoice?: () => void;
  onMarkPaidInvoice?: () => void;
  id: string;
};

const ActionStatusBar = ({
  onEditInvoice,
  onDeleteInvoice,
  onMarkPaidInvoice,
  id,
}: PropType) => {
  const invoice = api.invoice.getOneInvoiceById.useQuery({ id });

  return (
    <Card>
      <Container>
        <StatusGrroup>
          <Body tw="text-[#858BB2] font-medium">Status</Body>
          <StatusCard status={invoice.data?.status as InoviceStatus} />
        </StatusGrroup>

        <ActionButtonGroup>
          <Button
            variant="secondary"
            label="Edit"
            onClick={() => onEditInvoice?.()}
          />
          <Button
            variant="alert"
            label="Delete"
            onClick={() => onDeleteInvoice?.()}
          />
          <Button
            variant="primary"
            label="Mark as Paid"
            onClick={() => onMarkPaidInvoice?.()}
          />
        </ActionButtonGroup>
      </Container>
    </Card>
  );
};

export default ActionStatusBar;
