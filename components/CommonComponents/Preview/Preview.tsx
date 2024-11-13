import Image from "next/image";
import { PreviewIProps } from "./PreviewI";
import cross from "@/assets/icons/cros.svg";

export const Preview: React.FC<PreviewIProps> = ({
  DeletePreview,
  ViewPreview,
  list,
  showlist,
  displaylist,
}) => {
  const validation = (previewval: {
    [key: string]: string | number | null | boolean;
  }) => {
    if (showlist) {
      let temp = false;
      showlist.flat().map((val) => {
        if (previewval[val]) {
          temp = true;
        }
      });
      return temp;
    }
  };

  return (
    <>
      <div style={{ display: "flex", gap: "10px", overflowX: "auto" }}>
        {list?.map((previewval) => {
          if (validation(previewval) && previewval.push) {
            return (
              <>
                <div className="preview">
                  <div
                    onClick={() => {
                      ViewPreview(Number(previewval.id));
                    }}
                  >
                    {showlist?.map((showlistval) => {
                      return (
                        <>
                          <p>
                            {showlistval.map((val, val1) => {
                              const valuee =
                                previewval?.[showlistval?.[val1 + 1]];
                              if (val == "comma" && valuee) {
                                return `,`;
                              } else {
                                const value = previewval[val];
                                return ` ${value ? value : ""}`;
                              }
                            })}
                          </p>
                        </>
                      );
                    })}
                  </div>
                  <Image alt="img"
                    onClick={() => {
                      DeletePreview(Number(previewval.id));
                    }}
                    src={cross}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </>
            );
          }
        })}

        {displaylist?.map((displaylistval) => {
          if (displaylistval.list.join("").trim() && displaylistval.push) {
            return (
              <>
                <div className="preview">
                  <div
                    onClick={() => {
                      ViewPreview(Number(displaylistval.id));
                    }}
                  >
                    {displaylistval.list?.map((showlistval) => {
                      if (showlistval.trim()) {
                        return (
                          <>
                            <p style={{ lineHeight: "10px" }}>{showlistval}</p>
                          </>
                        );
                      }
                    })}
                  </div>
                  <Image alt="img"
                    onClick={() => {
                      DeletePreview(Number(displaylistval.id));
                    }}
                    src={cross}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </>
            );
          }
        })}
      </div>
    </>
  );
};
