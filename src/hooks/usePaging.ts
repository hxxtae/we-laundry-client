import { useState } from 'react';

interface IPageing {
  fetchDatas: any[];
  pageList: number[];
  clickPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  nextPage: () => void;
  prevPage: () => void;
  pageSort: {
    ASC: (num: number) => number;
    DESC: (num: number) => number | undefined;
  };
}

export function usePaging(datas: any[] | undefined, dataLen: number | undefined, pagePost: number, pagelistPost: number): IPageing {
  const [currentPage, setCurrentPage] = useState(1); // 1, 2, 3, ... (선택)
  // pagePost : 10 (고정)

  const indexOfLast = pagePost * currentPage;  // 10, 20, 30
  const indexOfFirst = indexOfLast - pagePost; // 10 - 10 = 0, 20 - 10 = 10, 30 - 10 = 20

  const ASC = (num: number) => (((currentPage - 1) * pagePost) + num) + 1;
  const DESC = (num: number) => dataLen && dataLen - (((currentPage - 1) * pagePost) + num);

  const { pageList, pageLen } = pageListFnc(currentPage, dataLen, pagePost, pagelistPost);

  const next = (page: number) => {
    if (page >= pageLen) return page;
    return page + 1;
  };
  const prev = (page: number) => {
    if (page <= 1) return page;
    return page - 1;
  };

  const fetchDatas = datas ? datas.slice(indexOfFirst, indexOfLast) : [];
  const clickPage = ((pagelistPost + currentPage) % pagelistPost) || pagelistPost;
  const setPage = setCurrentPage;
  const nextPage = () => setCurrentPage(next);
  const prevPage = () => setCurrentPage(prev);
  const pageSort = { ASC, DESC };
  return { fetchDatas, pageList, clickPage, setPage, nextPage, prevPage, pageSort };
}

export function pageListFnc(nowPage: number, dataLen: number | undefined, pagePost: number, pagelistPost: number) {
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
