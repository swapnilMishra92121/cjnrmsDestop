"use client";
import React, { useEffect, useRef } from "react";
import { Pagination } from "./Pagination";
import "./Table.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { CustomHeaderComponent } from "./CustomHeaderComponent";
import { CellRendererParams, TableIProps } from "./TableIProps";
import { Tooltip } from "antd/lib";

export const Table: React.FC<TableIProps> = ({
  columnsValue,
  columns,
  showPagination = true,
  setpageCount,
  setpageNumber,
  tableTotalRecord,
  onRowClicked,
  setOrderByDescending,
  setOrderBy,
  OrderByDescending,
  OrderBy,
  clientSideSorting = false,
  selectRowCheckBox,
  allowMultipleRowSelection = false,
  onCellValueChanged,
  cursorPointer = false,
  headerBackgroundColor = "#b3c9e2",
  pageNumber,
  pageCount,
  height
}) => {
  const defaultColDef = {
    filter: false,
    sortable: clientSideSorting ? true : false,
    flex: 1,
    
  };

  const gridRef = useRef<AgGridReact>(null);

  useEffect(() => {
    if (gridRef.current && gridRef.current.api) {
      gridRef.current.api.forEachNode((node) => {
        if (node.data.isSelected) {
          node.setSelected(node.data.isSelected);
        }
      });
    }
  }, [columnsValue]);

  const headerClassName = `custom-header-${headerBackgroundColor.replace(
    /#/g,
    ""
  )}`;

  const capitalizeFirstLetter = (string: string) => {
    if (typeof string === "string" && string.length > 0) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return string;
  };

  return (
    <>
      <div className={`ag-theme-quartz ${headerClassName}`}>
        <style>
          {`
          .${headerClassName} .ag-header {
            background-color: ${headerBackgroundColor};
          }
          `}
        </style>
        <div
        className="custom-scrollbar"
         
          style={{
            height: height ? height : "auto", 
            maxHeight: height ? height : "auto", 
            overflow: height ? "auto" : "visible",
          }}
        >
        <AgGridReact
          ref={gridRef}
          rowData={columnsValue}
          defaultColDef={defaultColDef}
          onCellValueChanged={(data) => {
            if (onCellValueChanged) {
              onCellValueChanged(data.data);
            }
          }}
          onSelectionChanged={(event) => {
            const selectedRows = event.api.getSelectedRows();
            if (selectRowCheckBox) {
              selectRowCheckBox(selectedRows);
            }
          }}
          columnDefs={
            clientSideSorting
              ? columns
              : columns.map((val) => {
                  return {
                    ...val,

                    cellRenderer:
                      val.field === "Import" && val.field === "Action"
                        ? (params: CellRendererParams) => (
                            <Tooltip title={params.value}>
                              <div className="cell-content">
                                {capitalizeFirstLetter(params.value)}
                              </div>
                            </Tooltip>
                          )
                        : val.cellRenderer,
                    headerComponent: (data: { displayName: string }) => (
                      <CustomHeaderComponent
                        setOrderByDescending={setOrderByDescending}
                        setOrderBy={setOrderBy}
                        displayName={data.displayName}
                        OrderByDescending={OrderByDescending}
                        OrderBy={OrderBy}
                      />
                    ),
                  };
                })
          }
          columnHoverHighlight={false}
          suppressRowClickSelection={true}
          rowSelection={allowMultipleRowSelection ? "multiple" : "single"}
          
          onRowClicked={(e) => {
            if (onRowClicked) {
              onRowClicked(e.data);
            }
          }}
          rowStyle={{ cursor: cursorPointer ? "pointer" : "default" }}
          onGridReady={(params) => {
            const api = params.api;
            api.forEachNode((node) => {
              if (node.data.isSelected) {
                node.setSelected(true);
              }
            });
            api.sizeColumnsToFit(); // Fit columns to grid
          }}
          domLayout={"autoHeight"}
        /></div>
      </div>

      {showPagination ? (
        <Pagination
          tableTotalRecord={tableTotalRecord}
          setpageCount={setpageCount}
          setpageNumber={setpageNumber}
          pageNumber={pageNumber}
          pageCount={pageCount}
        />
      ) : (
        ""
      )}
    </>
  );
};
