import { useState } from 'react';

interface IPageing<T> {
  fetchDatas: T[];      // - 현재 페이지 번호에서 데이터들
  pageBtnList: number[];   // - 페이지 번호들
  clickPageIdx: number; // - 클릭한 페이지 번호
  setPage: React.Dispatch<React.SetStateAction<number>>; // - 클릭한 페이지 번호 변경 함수
  nextPage: () => void; // - 다음 페이지 번호로 변경 함수
  prevPage: () => void; // - 이전 페이지 번호로 변경 함수
  pageSort: {
    ASC: (num: number) => number;  // - 오름차순 번호 부여
    DESC: (num: number) => number; // - 내림차순 번호 부여
  };
}
/**
 * ---------------------------
 * 페이징 처리 Hook (usePaging)
 * ---------------------------
 * @param datas - 배열 데이터
 * @param dataLen - 배열 데이터 길이
 * @param pagePost - 페이지에 보여질 리스트 개수
 * @param pageBtnPost - 보여질 페이지 번호 버튼 개수
 */
export function usePaging<T>(datas: T[], dataLen: number, pagePost: number, pageBtnPost: number): IPageing<T> {
  const [currentPage, setCurrentPage] = useState(1); // 다음 페이지 번호 ex) 1, 2, 3, ... (선택)

  const indexOfLast = pagePost * currentPage;  // 10, 20, 30
  const indexOfFirst = indexOfLast - pagePost; // 10 - 10 = 0, 20 - 10 = 10, 30 - 10 = 20

  const ASC = (num: number) => (((currentPage - 1) * pagePost) + num) + 1;
  const DESC = (num: number) => dataLen ? dataLen - (((currentPage - 1) * pagePost) + num) : 0;

  const { pageBtnList, pageLen } = pageBtnListFnc(currentPage, dataLen!, pagePost, pageBtnPost);

  const next = (prevPage: number) => {
    if (prevPage >= pageLen) return prevPage;
    return prevPage + 1;
  };
  const prev = (prevPage: number) => {
    if (prevPage <= 1) return prevPage;
    return prevPage - 1;
  };

  return {
    fetchDatas: datas ? datas.slice(indexOfFirst, indexOfLast) : [],
    pageBtnList,
    clickPageIdx: (currentPage % pageBtnPost) || pageBtnPost,
    setPage: setCurrentPage,
    nextPage: () => setCurrentPage(next),
    prevPage: () => setCurrentPage(prev),
    pageSort: { ASC, DESC }
  };
}

/**
 * -----------------------------
 * 보여질 페이지 버튼 리스트 객체 함수
 * -----------------------------
 * @param nowPage - 현재 페이지
 * @param dataLen - 배열 데이터 길이
 * @param pagePost - 페이지에 보여질 리스트 개수
 * @param pageBtnPost - 보여질 페이지 번호 버튼 개수
 */
function pageBtnListFnc(nowPage: number, dataLen: number, pagePost: number, pageBtnPost: number) {
  let pageBtnList = [];
  const pageLen = dataLen ? Math.ceil(dataLen / pagePost) : 1;
  const pageShowEnd = pageBtnPost * Math.ceil(nowPage / pageBtnPost);
  const pageShowStart = pageShowEnd - pageBtnPost;
  
  for (let i = 1; i <= pageLen; i++) {
    pageBtnList.push(i);
  }

  pageBtnList = pageBtnList.slice(pageShowStart, pageShowEnd);
  return { pageBtnList, pageLen };
}
