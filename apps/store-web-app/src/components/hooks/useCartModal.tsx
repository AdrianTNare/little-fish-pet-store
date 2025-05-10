"use client";

import { FC, useState } from "react";
import { CartModal as Modal } from "../Modals/CartModal";

//TODO; make this hook reusable for both modals
export const useCartModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  const onOpenModal = () => {
    setIsModalOpen(true);
  };

  const CartModal: FC = () => (
    <Modal onCloseModal={onCloseModal} isModalOpen={isModalOpen} />
  );

  return {
    onOpenModal,
    CartModal,
  };
};
