import { CustomHeaderComponentIProps } from "./TableIProps";

export const CustomHeaderComponent: React.FC<CustomHeaderComponentIProps> = ({
  displayName,
  setOrderBy,
  setOrderByDescending,
  OrderByDescending,
  OrderBy,
}) => {
  const toggleSort = (displayname: string) => {
    if (displayname !== "Action") {
      if (setOrderByDescending && setOrderBy) {
        setOrderBy(displayname);
        setOrderByDescending(!OrderByDescending);
      }
    }
  };

  return (
    <div
      className="custom-header"
      onClick={() => {
        toggleSort(displayName);
      }}
      
    >
    {displayName}
      <div className="custom-sort-icons">
        {OrderBy == displayName && (
          <i
            className={`ag-icon ${
              OrderByDescending ? "ag-icon-desc" : "ag-icon-asc"
            }`}
          ></i>
        )}
      </div>
    </div>
  );
};
