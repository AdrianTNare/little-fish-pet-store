"use client";

import { FC, useState } from "react";
import { AddToCartModal as Modal } from "../Modals/AddToCartModal";

//TODO; make this hook reusable for both modals
export const useAddCartModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  const onOpenModal = () => {
    setIsModalOpen(true);
  };

  //TODO: we could pass the other props as {...props}
  const CartModal: FC = () => (
    <Modal onCloseModal={onCloseModal} isModalOpen={isModalOpen} />
  );

  return {
    onOpenModal,
    CartModal,
  };
};
