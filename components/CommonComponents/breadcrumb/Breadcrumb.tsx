"use client";
import { FC } from "react";
import { useParams, useRouter } from "next/navigation";
import { Breadcrumb, BreadcrumbProps } from "antd";

export type TBreadCrumbProps = BreadcrumbProps & {
  fixedCrumbItems: {
    title: string;
    path: string;
    onClick?: () => void;
  }[];
};

const BreadcrumbComponent: FC<TBreadCrumbProps> = ({
  fixedCrumbItems = [],
}) => {
  const navigate = useRouter();

  const breadcrumbItems = fixedCrumbItems;

  return (
    <div style={{ marginTop: "1%" }}>
      <Breadcrumb
        separator=">"
        items={breadcrumbItems.map((item, index) => {
          const isLastItem = index === breadcrumbItems.length - 1;

          return {
            title: (
              <span
                style={{
                  cursor: isLastItem ? "default" : "pointer",
                  color: isLastItem ? "rgb(59, 114, 177)" : "rgb(59, 114, 177)",
                  fontSize: "15px",
                  fontWeight: isLastItem ? "normal" : "bold ",
                }}
                onClick={() => {
                  item?.onClick?.();
                  if (!isLastItem) {
                    if (item.onClick) {
                      item.onClick();
                    } else {
                      navigate.push(item.path);
                    }
                  }
                }}
              >
                {item.title}
              </span>
            ),
            key: index,
          };
        })}
      />
    </div>
  );
};

export default BreadcrumbComponent;
