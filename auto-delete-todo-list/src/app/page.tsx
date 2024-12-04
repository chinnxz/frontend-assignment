"use client";

import { useEffect, useState } from "react";
import { itemListMockUpData } from "./mock-up-data";
import { Item, TableItem } from "./types/item";

export default function Home() {
  const [itemList, setItemList] = useState<Item[]>(itemListMockUpData);
  const [itemListIdx, setItemListCount] = useState<number>(0);
  const itemTableHeaders = Array.from(new Set(itemListMockUpData.map((data) => data.type)));

  const [isTableClicked, setIsTableClicked] = useState<boolean>(false);
  const [isTableButtonClicked, setIsTableButtonClicked] = useState<boolean>(false);
  const [clickedItem, setClickedItem] = useState<TableItem>();

  const [tableItemList, setTableItemList] = useState<TableItem[]>([]);

  const onItemButtonClick = (item: Item) => {
    setItemList((prvValues) => prvValues.filter((prvItem) => prvItem.name !== item.name));
    setTableItemList((prvValues) => [
      ...prvValues,
      {
        name: item.name,
        type: item.type,
        idx: itemListIdx,
      },
    ]);
    setItemListCount((prvValue) => prvValue + 1);
  };

  useEffect(() => {
    if (isTableClicked) {
      onTableClick();
      setIsTableClicked(false);
    } else if (isTableButtonClicked) {
      if (clickedItem) {
        onTableButtonClick(clickedItem);
        setIsTableButtonClicked(false);
      }
    }
  }, [isTableClicked, isTableButtonClicked]);

  const onClickTable = (event: React.MouseEvent<HTMLTableElement>) => {
    const targetElement = event.target as HTMLElement;

    if (targetElement.tagName === "TD") {
      setIsTableClicked(true);
      setIsTableButtonClicked(false);
    }
  };

  const onClickButtonTable = (event: React.MouseEvent<HTMLButtonElement>, item: TableItem) => {
    const targetElement = event.target as HTMLElement;

    if (targetElement.tagName === "BUTTON") {
      setIsTableButtonClicked(true);
      setIsTableClicked(false);
      setClickedItem(item);
    }
  };

  const onTableClick = () => {
    const combinedIdxList = tableItemList.map((item) => item.idx).sort((a, b) => a - b);
    const firstSelectedIdx = combinedIdxList.shift();
    const itemBySelectedIdx = tableItemList.find((item) => item.idx === firstSelectedIdx);

    if (itemBySelectedIdx) {
      setItemList((prvValues) => [...prvValues, itemBySelectedIdx]);
      setTableItemList((prvValues) => prvValues.filter((prvItem) => prvItem.idx !== itemBySelectedIdx!.idx));
    }
  };

  const onTableButtonClick = (item: TableItem) => {
    setTableItemList((prvValues) => prvValues.filter((prvItem) => prvItem.idx !== item.idx));
    setItemList((prvValues) => [...prvValues, item]);
    setClickedItem(undefined);
  };

  return (
    <div className="p-2 flex flex-row">
      <div className="flex flex-col w-64 h-full">
        {itemList.map((obj: Item, key) => {
          return (
            <button
              onClick={() => onItemButtonClick(obj)}
              key={key}
              className="m-2 px-4 py-2 border-2 border-gray-300 bg-white hover:bg-blue-200 duration-150 text-black"
            >
              {obj.name}
            </button>
          );
        })}
      </div>
      {itemTableHeaders.map((header) => {
        return (
          <div className="mx-2 py-2 w-64" key={header}>
            <table
              className="table-auto border-2 border-gray-300 h-full w-full"
              onClick={(event) => onClickTable(event)}
            >
              <thead>
                <tr>
                  <th className="p-2 border-b-2 border-gray-300 bg-gray-200">
                    <p className="text-gray-700">{header}</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableItemList.filter((item) => item.type === header).length ? (
                  <tr>
                    <td className="align-top">
                      {tableItemList
                        .filter((item) => item.type === header)
                        .map((item) => {
                          return (
                            <div className="p-2 w-full" key={`${item.name}-${item.idx}`}>
                              <button
                                className="w-full px-4 py-2 border-2 border-gray-300 bg-white hover:bg-blue-200 duration-150 text-black"
                                onClick={(e) => onClickButtonTable(e, item)}
                              >
                                {item.name}
                              </button>
                            </div>
                          );
                        })}
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td>
                      <div className="p-2"></div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}
