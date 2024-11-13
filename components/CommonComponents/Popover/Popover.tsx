import React, { useState } from "react";
import { Popover } from "antd";
import { PopoverComponentIProps } from "./PopoverComponentI";

export const PopoverComponent: React.FC<PopoverComponentIProps> = ({
  InnerContent,
  InnerButtonComponents,
  InnerContentProps,
  InnerButtonComponentsIProps,
}) => {
  const handleOpenChange = (open: boolean) => {
    InnerButtonComponentsIProps.setopenPopover(open);
  };

  return (
    <div style={{ marginRight: "20px" }}>
      <Popover
        content={<InnerContent {...InnerContentProps} />}
        title=""
        trigger="click"
        open={InnerButtonComponentsIProps.openPopover}
        onOpenChange={handleOpenChange}
      >
        <InnerButtonComponents {...InnerButtonComponentsIProps} />
      </Popover>
    </div>
  );
};
