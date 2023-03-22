import { Transition, Dialog } from '@headlessui/react';
import {
  ArrowTopRightOnSquareIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import React, { Fragment } from 'react';
import { hashURL } from '../../../utils/helpers';

type ModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  hash: string;
  variant: 'submit' | 'success';
};
const TxModal = ({ isOpen, closeModal, hash, variant }: ModalProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {variant === 'submit'
                    ? 'Transaction Submitted'
                    : 'Transaction Successfully'}
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    {variant === 'submit' ? (
                      <>
                        <span>
                          Your transaction has been submitted successfully. You
                          can check the transaction in the polygon scan:
                        </span>{' '}
                        <a
                          className="text-brand-primary contents"
                          href={hashURL(hash)}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <span className="inline-flex gap-1">
                            <span>Here</span>
                            <ArrowTopRightOnSquareIcon className="h-4" />
                          </span>
                        </a>
                      </>
                    ) : (
                      <span className="text-center">
                        <CheckCircleIcon className="h-32 stroke-brand-primary m-auto" />
                        <span className="w-full">
                          Your transaction is successful:{' '}
                          <a
                            href={hashURL(hash)}
                            target="_blank"
                            className="text-brand-primary inline-flex gap-1"
                            rel="noreferrer"
                          >
                            Link
                            <ArrowTopRightOnSquareIcon className="h-4" />
                          </a>{' '}
                        </span>
                      </span>
                    )}
                  </p>
                </div>

                {variant === 'submit' && (
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-brand-shade opacity-95 px-4 py-2 text-sm font-medium text-brand-primary hover:opacity-100 focus:outline-none"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default TxModal;
