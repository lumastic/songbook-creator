import { Dialog as HeadlessDialog } from "@headlessui/react";
import type { PropsWithChildren } from "react";
import React from "react";

type Props = {
  title: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
};

export const Dialog: React.FC<PropsWithChildren<Props>> = ({
  children,
  title,
  description,
  isOpen,
  onClose,
}) => {
  return (
    <HeadlessDialog open={isOpen} onClose={onClose} className="relative z-10">
      <div className="fixed inset-0 bg-stone-900 bg-opacity-25" />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <HeadlessDialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
            <HeadlessDialog.Title
              as="h3"
              className="text-lg font-medium leading-6 text-stone-900"
            >
              {title}
            </HeadlessDialog.Title>
            <div className="mt-2">
              <p className="text-sm text-stone-500">{description}</p>
            </div>

            <div className="mt-4">{children}</div>
          </HeadlessDialog.Panel>
        </div>
      </div>
    </HeadlessDialog>
  );
};
