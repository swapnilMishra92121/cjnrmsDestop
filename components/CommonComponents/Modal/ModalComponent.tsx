"use client";

import React from "react";
import { Modal } from "antd";
import { ModalComponentIProps } from "./ModalComponentI";
import { CloseOutlined } from "@ant-design/icons";
import { CSSProperties } from "react";

export const ModalComponent: React.FC<ModalComponentIProps> = ({
  open,
  innerContant,
  title,
  width,
  height,
  onClose,
  style,
}) => {
 
 
  return (
    <Modal
      title={title}
      centered={true}
      width={width || "auto"}
      open={open}
      footer={null}
      // onCancel={onClose}
      // closable={true}
      height={height}
      style={{ ...style }}
    >
      {innerContant}
    </Modal>
  );
};
