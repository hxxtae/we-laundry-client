import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

import { IPageing } from '../hooks';
import { includes } from '../styles';

type IPagination<Type> = IPageing<Type> & { noShowPage?: boolean };

function Pagination<Type>(
  {
    clickPageIdx,
    pageBtnList,
    prevPage,
    nextPage,
    setPage,
    noShowPage = false
  }: IPagination<Type>) {
  
  return (
    <PageNation>
      <PageMove onClick={prevPage}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </PageMove>
      {noShowPage ||
        pageBtnList.map((page) => (
          <Page
            key={page}
            chk={clickPageIdx}
            onClick={() => setPage(page)}>
            {page}
          </Page>
        ))}
      <PageMove onClick={nextPage}>
        <FontAwesomeIcon icon={faChevronRight} />
      </PageMove>
    </PageNation>
  )
}

export default Pagination;

const PageNation = styled.div`
  ${includes.flexBox()}
  width: 100%;
  padding: 10px;
`;

const Page = styled.button<{chk: number}>`
  ${includes.flexBox()}
  color: ${(props) => props.theme.textColor};
  width: 30px;
  height: 30px;
  margin-right: 10px;
  border-radius: 4px;
  transition: background-color 200ms ease-in-out;
  cursor: pointer;

  &:nth-of-type(${(props) => props.chk + 1}) {
    background-color: ${(props) => props.theme.borderColor};
    font-weight: 600;
  }

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    opacity: .6;
    background-color: ${(props) => props.theme.borderColor};
  }
`;

const PageMove = styled.button`
  ${includes.flexBox()}
  color: ${(props) => props.theme.textColor};
  width: 30px;
  height: 30px;
  margin-right: 10px;
  border-radius: 4px;
  transition: background-color 200ms ease-in-out;
  cursor: pointer;

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    opacity: .6;
    background-color: ${(props) => props.theme.borderColor};
  }
`;
