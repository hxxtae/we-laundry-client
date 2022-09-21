import { useState } from 'react';

interface IPageing<T> {
  fetchDatas: T[];
  pageList: number[];
  clickPageIdx: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  nextPage: () => void;
  prevPage: () => void;
  pageSort: {
    ASC: (num: number) => number;
    DESC: (num: number) => number;
  };
}

export function usePaging<T>(datas: T[] | undefined, dataLen: number | undefined, pagePost: number, pagelistPost: number): IPageing<T> {
  const [currentPage, setCurrentPage] = useState(1); // 1, 2, 3, ... (선택)
  // pagePost : 10 (고정)

  const indexOfLast = pagePost * currentPage;  // 10, 20, 30
  const indexOfFirst = indexOfLast - pagePost; // 10 - 10 = 0, 20 - 10 = 10, 30 - 10 = 20

  const ASC = (num: number) => (((currentPage - 1) * pagePost) + num) + 1;
  const DESC = (num: number) => dataLen ? dataLen - (((currentPage - 1) * pagePost) + num) : 0;

  const { pageList, pageLen } = pageListFnc(currentPage, dataLen!, pagePost, pagelistPost);

  const next = (page: number) => {
    if (page >= pageLen) return page;
    return page + 1;
  };
  const prev = (page: number) => {
    if (page <= 1) return page;
    return page - 1;
  };

  return {
    fetchDatas: datas ? datas.slice(indexOfFirst, indexOfLast) : [],
    pageList,
    clickPageIdx: ((pagelistPost + currentPage) % pagelistPost) || pagelistPost,
    setPage: setCurrentPage,
    nextPage: () => setCurrentPage(next),
    prevPage: () => setCurrentPage(prev),
    pageSort: { ASC, DESC }
  };
}

export function pageListFnc(nowPage: number, dataLen: number, pagePost: number, pagelistPost: number) {
  let pageList = [];
  const pageLen = dataLen ? Math.ceil(dataLen / pagePost) : 1;

  const pageShowEnd = pagelistPost * Math.ceil(nowPage / pagelistPost);
  const pageShowStart = pageShowEnd - pagelistPost;
  
  for (let i = 1; i <= pageLen; i++) {
    pageList.push(i);
  }

  pageList = pageList.slice(pageShowStart, pageShowEnd);
  return { pageList, pageLen };
}
