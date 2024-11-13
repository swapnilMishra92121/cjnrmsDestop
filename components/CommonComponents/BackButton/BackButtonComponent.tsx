'use client'
import React from "react";
import back from "@/assets/icons/back.svg";
import { BackButtonComponentIProps } from "./BackButtonComponentIProps";
import "./BackButton.css";
import Image from "next/image";

export const BackButtonComponent: React.FC<BackButtonComponentIProps> = ({
  name,
  onClick,
}) => {
  return (
    <>
      <div className="BackButton" style={{ display: "flex", alignItems: "center" }}>
        <div>
          <Image alt="img" src={back} height={20} width={20} onClick={onClick} />
        </div>
        <p
          onClick={onClick}
          className="BackButton-name"
        >
          {name}
        </p>
      </div>
    </>
  );
};
