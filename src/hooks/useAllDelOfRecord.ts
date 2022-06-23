import { IRecordsOflaundry, IRecordsOfRepair } from "../services/records";

type ISetState = IRecordsOflaundry | IRecordsOfRepair;

export const useAllDelOfRecord = <T extends ISetState>(
  setState: React.Dispatch<React.SetStateAction<T[]>>,
  clickItems: string[],
  setClickItems: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
  
  const onAllRemove = () => {
    setState((prevObjs) => {
      const copyLaundrys = prevObjs
        .map((obj) => {
          if (clickItems.includes((<IRecordsOflaundry>obj).productId || (<IRecordsOfRepair>obj).repairId)) {
            setClickItems((prevItems) => {
              const copyClickItems = [...prevItems];
              const index = copyClickItems.indexOf((<IRecordsOflaundry>obj).productId || (<IRecordsOfRepair>obj).repairId);
              if (index === -1) {
                return prevItems;
              }
              copyClickItems.splice(index, 1);
              return copyClickItems;
            });

            return {
              ...obj,
              productId: '',
              repairId: '',
            };
          }
          return obj;
        })
        .filter((obj) => (<IRecordsOflaundry>obj).productId || (<IRecordsOfRepair>obj).repairId);
      
      if (!clickItems.length) {
        return [];
      }
      
      return copyLaundrys;
    });    
  };

  return onAllRemove;
}
