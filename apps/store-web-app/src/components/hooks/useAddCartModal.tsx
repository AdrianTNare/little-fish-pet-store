"use client";

import { FC, useState } from "react";
import { CartModalProps } from "@/types/modal";

//TODO; make this hook reusable for both modals
export const useModal = <T extends CartModalProps>(Modal: FC<T>) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  const onOpenModal = () => {
    setIsModalOpen(true);
  };

  //TODO: we could pass the other props as {...props}
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
