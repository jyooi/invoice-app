import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

import { Button } from "../Button/index";
type PropType = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  alertTitle: string;
  alertMessage: string;
  onConfirm: () => Promise<void>;
};

export default function AlertModal({
  isOpen,
  setIsOpen,
  alertMessage,
  alertTitle,
  onConfirm,
}: PropType) {
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" tw="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div tw="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div tw="fixed inset-0 overflow-y-auto">
            <div tw="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel tw="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    tw="text-lg font-medium leading-6 text-gray-900"
                  >
                    {alertTitle}
                  </Dialog.Title>
                  <div tw="mt-2">
                    <p tw="text-sm text-gray-500">{alertMessage}</p>
                  </div>
                  <div tw="flex justify-end gap-2">
                    <div tw="mt-4">
                      <Button
                        variant="secondary"
                        type="button"
                        onClick={() => {
                          closeModal?.();
                        }}
                        label="Cancel"
                      />
                    </div>

                    <div tw="mt-4">
                      <Button
                        variant="alert"
                        type="button"
                        onClick={() => {
                          void onConfirm?.();
                          closeModal();
                        }}
                        label="Confirm"
                      />
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
