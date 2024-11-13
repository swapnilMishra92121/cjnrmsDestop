import "./TabsComponents.css";
import { TabsComponentsIProps } from "./TabsComponentsIProps";

export const TabsComponents: React.FC<TabsComponentsIProps> = ({
  activeTab,
  handleTabChange,
  tabList,
}) => {


  return (
    <>
    
      <div>
        <div className="tab-line">
          <div className="tab-buttons">
            {tabList.map((val, i) =>
              val.name ? (
                <button
                  disabled={val.disable}
                  key={i}
                  style={{
                    color: "black",
                    cursor: val.disable ? "auto" : "pointer",
                  }}
                  className={activeTab === i ? "active" : ""}
                  onClick={() => {
                    handleTabChange(i);
                  }}
                >
                  {val.name}
                </button>
              ) : (
                ""
              )
            )}
          </div>
        </div>

        <div className="head"></div>
      </div>
    </>
  );
};
