"use client";

import { FC, useState } from "react";
import { CartModalProps } from "@/types/modal";

export const useModal = <T extends CartModalProps>(Modal: FC<T>) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  const onOpenModal = () => {
    setIsModalOpen(true);
  };

  const CartModal: FC<Omit<T, keyof CartModalProps>> = (props) => (
    <Modal
      {...(props as T)}
      onCloseModal={onCloseModal}
      isModalOpen={isModalOpen}
    />
  );

  return {
    onOpenModal,
    CartModal,
  };
};
