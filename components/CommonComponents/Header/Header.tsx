import Image from "next/image";
import { ButtonComponents } from "../Fields/Button/ButtonComponents";
import logo from "../../../assets/icons/newlogo.png";
import { HeaderIProps } from "./HeaderI";
import { useEffect, useState } from "react";

export const Header: React.FC<HeaderIProps> = ({ handleDownload,selectedPrinter,setSelectedPrinter }) => {
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Image src={logo} alt="logo" width={100} className="logo" />
        <div style={{ display: "flex" }}>
          <ButtonComponents name="Impound" />
          <ButtonComponents name="New Ticket" />
          <ButtonComponents name="Print Ticket" handleClick={handleDownload} />
        </div>

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

       
      </div>
    </>
  );
};
