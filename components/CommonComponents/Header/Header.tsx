import Image from "next/image";
import { ButtonComponents } from "../Fields/Button/ButtonComponents";
import { HeaderIProps } from "./HeaderI";
import { useEffect, useState } from "react";
import Flex from "antd/lib/flex";
import images from "@/assets";
const { newLogo } = images;

export const Header: React.FC<HeaderIProps> = ({
  handleDownload,
  selectedPrinter,
  setSelectedPrinter,
}) => {
  const [activeBtn, setActiveBtn] = useState<number | null>(null);
  const [printers, setPrinters] = useState<{ name: "" }[]>([]);

  useEffect(() => {
    window.electronAPI
      .getPrinters()
      .then((printerList: any) => {
        setPrinters(printerList);
      })
      .catch((err) => {
        console.error("Failed to get printers:", err);
      });
  }, []);

  return (
    <>
      <Flex gap="small">
        <ButtonComponents
          name="Impound"
          showBackgroundColor={activeBtn === 1 ? true : false}
          color={activeBtn === 1 ? "#00FFFF" : "gray"}
          textColor={activeBtn === 1 ? "#fff" : "gray"}
          borderColor={activeBtn === 1 ? "gray" : "gray"}
          handleClick={() => {
            setActiveBtn(1);
          }}
        />

        <ButtonComponents
          name="New Ticket"
          showBackgroundColor={activeBtn === 2 ? true : false}
          color={activeBtn === 2 ? "#00FFFF" : "gray"}
          textColor={activeBtn === 2 ? "#fff" : "gray"}
          borderColor={activeBtn === 2 ? "gray" : "gray"}
          handleClick={() => {
            setActiveBtn(2);
          }}
        />

        <ButtonComponents
          name="Print Ticket"
          showBackgroundColor={activeBtn === 3 ? true : false}
          color={activeBtn === 3 ? "#00FFFF" : "gray"}
          textColor={activeBtn === 3 ? "#fff" : "gray"}
          borderColor={activeBtn === 3 ? "gray" : "gray"}
          handleClick={() => {
            setActiveBtn(3);
            handleDownload();
          }}
        />
      </Flex>
      <select
        onChange={(e) => setSelectedPrinter(e.target.value)}
        value={selectedPrinter}
      >
        <option value="">Select Printer</option>
        {printers.map((printer) => (
          <option key={printer.name} value={printer.name}>
            {printer.name}
          </option>
        ))}
      </select>
    </>
  );
};
