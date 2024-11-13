"use client";
import { LoaderIProps } from "./LoaderIProps";
import { Spin } from "antd";

export const Loader: React.FC<LoaderIProps> = ({ loading }) => {
  return (
    <>
      <Spin spinning={loading} tip="" fullscreen={true} size={'large'} />
    </>
  );
};
