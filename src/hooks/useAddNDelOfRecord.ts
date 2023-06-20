import React from "react";
import { IRecordsOflaundry, IRecordsOfRepair } from "../services/records";

type IDevide = 'add' | 'del'; 
type ISetState = IRecordsOflaundry | IRecordsOfRepair;

// NOTE: 주문목록 상단 - + (주문 삭제, 추가) 버튼 이벤트 Hook
export const useAddNDelOfRecord = <T extends ISetState>( 
  setState: React.Dispatch<React.SetStateAction<T[]>>,
  clickItems: string[],
  setClickItems: React.Dispatch<React.SetStateAction<string[]>>
  ) => {

  const onAddNDel = (divide: IDevide,) => {
    setState((prevLaundrys) => {
      let copyLaundrys = prevLaundrys.map((obj) => {
        if (clickItems.includes((<IRecordsOflaundry>obj).productId || (<IRecordsOfRepair>obj).repairId)) {
          let count = 0;
          let price = 0;
          if (divide === 'add') count = obj.count + 1;
          else if (divide === 'del') count = obj.count - 1;
          price = (obj.price / obj.count) * count;
          

          if (count === 0) {
            setClickItems((prevItems) => {
              const copyClickItems = [...prevItems];
              const index = copyClickItems.indexOf((<IRecordsOflaundry>obj).productId || (<IRecordsOfRepair>obj).repairId);
              if (index === -1) {
                return prevItems;
              }
              copyClickItems.splice(index, 1);
              return copyClickItems;
            });
          }

          return {
            ...obj,
            count,
            price,
          }
        }
        return obj;
      });

      copyLaundrys = copyLaundrys.filter((obj) => obj.count !== 0);
      return copyLaundrys;
    });
  }

  return onAddNDel;
}
