"use client";

import { ComponentType, useState } from "react";
import { CartModalProps } from "@/types/modal";

export const useModal = <T extends CartModalProps>(Modal: ComponentType<T>) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  const onOpenModal = () => {
    setIsModalOpen(true);
  };

  const CartModal = (props: Omit<T, keyof CartModalProps>) => (
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
