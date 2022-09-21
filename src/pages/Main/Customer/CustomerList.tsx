import { faChevronLeft, faChevronRight, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useState } from 'react';
import styled from 'styled-components';
import '@fortawesome/fontawesome-svg-core';

import { customerRequestState, deleteState, searchState, updateState } from '../../../global';
import { buttonStyle, includes, media, scroll } from '../../../styles';
import { DeleteConfirm, LoadingComponent, Overlay } from '../../../components';
import { usePaging } from '../../../hooks';
import { useCustomerFetch, useCustomerDel } from './application/hooks';
import { CustomerDTO } from './application/interface';
import CustomerSearch from './CustomerSearch';
import CustomerItem from './CustomerItem';

function CustomerList() {
  const setUpdateData = useSetRecoilState(customerRequestState);
  const [updateActive, setUpdateActive] = useRecoilState(updateState);
  const [searchPop, setSearchPop] = useRecoilState(searchState);
  const [deletePop, setDeletePop] = useRecoilState(deleteState);
  const [deleteId, setDeleteId] = useState('');  
  const { isLoading, isFetching, customerDatas } = useCustomerFetch();
  const { isMutating, mutate } = useCustomerDel();
  const cusLoading = isLoading || isFetching;

  const {
    fetchDatas,
    pageList,
    clickPageIdx,
    setPage,
    nextPage,
    prevPage,
    pageSort: { DESC }
  } = usePaging<CustomerDTO.ICustomerResponse>(customerDatas, customerDatas?.length, 10, 5);

  const onUpdateActive = ({id, addid, addname, addfullname, name, dong, ho}: CustomerDTO.ICustomerRequest) => {
    setUpdateData({id, addid, addname, addfullname, name, dong, ho});
    setUpdateActive(true);
  };

  const onDeleteActive = (id: string) => {
    if (updateActive) return;
    setDeletePop(true);
    setDeleteId(id);
    setUpdateActive(false);
  };

  const onDelete = (id: string) => {
    isMutating || mutate(id);
  };

  return (
    <Wrapper>
      <ControlGroup>
        <Count>총 {customerDatas?.length || 0} 개</Count>
        <SearchButton
          typeof='button'
          onClick={() => setSearchPop(true)}
          disabled={updateActive}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <span>검색</span>
        </SearchButton>
      </ControlGroup>
      <List>
        <Head>
          <Title>No.</Title>
          <Title>고객이름</Title>
          <Title>주소이름</Title>
          <Title>동</Title>
          <Title>호</Title>
          <Title>생성날짜</Title>
          <Title>설정</Title>
        </Head>
        <CustomerItem fetchDatas={fetchDatas} sort={DESC} onUpdateActive={onUpdateActive} onDeleteActive={onDeleteActive} />
      </List>
      
      <PageNation>
        <PageMove onClick={prevPage}>
          <FontAwesomeIcon icon={faChevronLeft} size="1x" />
        </PageMove>
        {pageList.map((page) => (
          <Page
            key={page}
            chk={clickPageIdx}
            onClick={() => setPage(page)}>
            {page}
          </Page>
        ))}
        <PageMove onClick={nextPage}>
          <FontAwesomeIcon icon={faChevronRight} size="1x" />
        </PageMove>
      </PageNation>

      {searchPop && <CustomerSearch />}
      {deletePop &&
        <Overlay>
          <DeleteConfirm deleteId={deleteId} onDelete={onDelete} setDeletePop={setDeletePop} loading={isMutating} />
        </Overlay>}
      {(cusLoading || isMutating) && 
      <Overlay>
        <LoadingComponent loadingMessage='잠시만 기다려주세요.' />
      </Overlay>}
    </Wrapper>
  )
}

export default CustomerList;

const Wrapper = styled.div`
  width: 100%;
  padding: 20px;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 4px;
  background-color: ${(props) => props.theme.bgColor};
  transition: background-color border-color 200ms ease-in-out;
`;

const ControlGroup = styled.div`
  ${includes.flexBox('center', 'space-between')}
  width: 100%;
  height: 40px;
`;

const Count = styled.strong`
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
`;

const SearchButton = styled.button`
  ${buttonStyle.primary}
  ${includes.flexBox()}
  width: 100px;
  height: 30px;
  
  span {
    margin-left: 5px;
  }
`;

const List = styled.ul`
  ${includes.flexBox('center', 'flex-start')}
  flex-direction: column;
  width: 100%;
  max-height: 200px;
  overflow-y: scroll;
  ${(props) => scroll.custom(8, props.theme.borderColorSub, props.theme.textColor)}

  @media ${media.pc_s} {
    overflow-y: hidden;
    max-height: 450px;
  }
`;

const Head = styled.span`
  ${includes.flexBox()}
  flex-shrink: 0;
  width: 100%;
  height: 40px;
  border-bottom: none;
  position: sticky;
  top: 0;
  background-color: ${(props) => props.theme.bgColor};
  z-index: 1;
`;

const Title = styled.h2`
  ${includes.flexBox()}
  flex-shrink: 0;
  color: ${(props) => props.theme.textColor};
  width: 100px;
  font-weight: 600;
  opacity: .6;

  &:nth-of-type(1) {
    width: 50px;
  }

  &:nth-of-type(2) {
    width: 160px;
  }

  &:nth-of-type(3) {
    width: 160px;
  }

`;

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

  &:hover {
    opacity: .6;
    background-color: ${(props) => props.theme.borderColor};
  }
`;
