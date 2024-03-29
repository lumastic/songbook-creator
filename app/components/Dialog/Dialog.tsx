import { Dialog as HeadlessDialog } from "@headlessui/react";
import type { PropsWithChildren } from "react";
import React from "react";
import { Button } from "../Button";

type Props = {
  title: string;
  description?: string;
  isOpen?: boolean;
  onClose?: () => void;
};

export const Dialog: React.FC<PropsWithChildren<Props>> = ({
  children,
  title,
  description,
  isOpen,
  onClose = () => {},
}) => {
  return (
    <HeadlessDialog
      open
      onClose={onClose}
      className="relative z-10"
      data-testid="dialog"
    >
      <div className="fixed inset-0 bg-neutral-900 bg-opacity-25" />
      <div className="fixed inset-0 min-h-screen overflow-y-auto md:min-h-min">
        <div className="flex h-full justify-center pt-4 text-center md:px-4 md:pb-4 ">
          <HeadlessDialog.Panel className="relative h-full w-full transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all md:h-auto md:max-w-md">
            <Button
              className="absolute top-2 right-2 h-8 w-8 rounded-full px-0 py-0"
              variant="secondary"
              size="lg"
              aria-label="Close dialog"
              onClick={onClose}
            >
              <div className="relative h-8 w-8">
                <span className="absolute top-0 right-0 left-0 bottom-0 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    width="1em"
                    height="1em"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </span>
              </div>
            </Button>
            <HeadlessDialog.Title
              as="h2"
              className="text-3xl font-medium leading-6 text-neutral-900"
            >
              {title}
            </HeadlessDialog.Title>
            {description && (
              <div className="mt-2">
                <p className="text-sm text-neutral-500">{description}</p>
              </div>
            )}

            <div className="mt-4">{children}</div>
          </HeadlessDialog.Panel>
        </div>
      </div>
    </HeadlessDialog>
  );
};
