import { faChevronLeft, faChevronRight, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useState } from 'react';
import styled from 'styled-components';
import '@fortawesome/fontawesome-svg-core';

import { ICustomerRequest } from '../../../services/customer';
import { buttonStyle, colors, includes, media, scroll, toastStyle } from '../../../styles';
import { DeleteConfirm, LoadingComponent, Overlay } from '../../../components';
import { customerSearchState, customerApi, customerRequestState, deleteState, searchState, updateState } from '../../../global';
import { useCustomerFetch, usePaging } from '../../../hooks';
import { useMutation, useQueryClient } from 'react-query';
import CustomerSearch from './CustomerSearch';
import { queryKeys } from '../../../util';

function CustomerList() {
  console.log("CustomerList");

  const customerService = useRecoilValue(customerApi);
  const data = useRecoilValue(customerSearchState);
  const setUpdateData = useSetRecoilState(customerRequestState);
  const [updateActive, setUpdateActive] = useRecoilState(updateState);
  const [searchPop, setSearchPop] = useRecoilState(searchState);
  const [deletePop, setDeletePop] = useRecoilState(deleteState);
  const [deleteId, setDeleteId] = useState('');
  const client = useQueryClient();
  const { loading, reLoading, cusDatas } = useCustomerFetch(data);
  const { mutate, isLoading: deleteLoading } = useMutation((id: string) => customerService.deleteCus(id));
  const cusLoading = loading || reLoading;

  const {
    fetchDatas,
    pageList,
    clickPage,
    setPage,
    nextPage,
    prevPage,
    pageSort: { DESC }
  } = usePaging(cusDatas, cusDatas?.length, 10, 5);

  const onUpdateActive = ({id, addid, addname, addfullname, name, dong, ho}: ICustomerRequest) => {
    setUpdateData({id, addid, addname, addfullname, name, dong, ho});
    setUpdateActive(true);
  };

  const onDeleteActive = (id: string) => {
    setDeletePop(true);
    setDeleteId(id);
    setUpdateActive(false);
  }

  const onDelete = (id: string) => {
    mutate(id, {
      onSuccess: () => {
        client.invalidateQueries(queryKeys.customer.list());
        client.invalidateQueries(queryKeys.records.list());
        toastStyle.info('삭제되었습니다.');
      },
      onError: (error: any) => {
        toastStyle.error(error.message);
      }
    });
  };

  return (
    <Wrapper>
      <ControlGroup>
        <Count>총 {cusDatas?.length || 0} 개</Count>
        <SearchButton
          typeof='button'
          onClick={() => setSearchPop(true)}
          disabled={updateActive}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          {'검색'}
        </SearchButton>
      </ControlGroup>
      <List>
        <Items>
          <Title>No.</Title>
          <Title>고객이름</Title>
          <Title>주소이름</Title>
          <Title>동</Title>
          <Title>호</Title>
          <Title>생성날짜</Title>
          <Title>설정</Title>
        </Items>
        {fetchDatas.map((item, idx) => (
        <Items key={item.id}>
          <Item>{DESC(idx)}</Item>
          <Item>{item.name || '-'}</Item>
          <Item>{item.addname || '-'}</Item>
          <Item>{item.dong || '-'}</Item>
          <Item>{item.ho || '-'}</Item>
          <Item>{item.createdAt}</Item>
          <Item>
              <Update type='button' onClick={() => onUpdateActive({
                id: item.id,
                addid: item.addid,
                addname: item.addname,
                addfullname: item.addfullname,
                name: item.name,
                dong: item.dong,
                ho: item.ho,
              })}>{'변경'}</Update>
            <Delete type='button' onClick={() => onDeleteActive(item.id)}>{'삭제'}</Delete>
          </Item>
        </Items>))}
      </List>
      
      <PageNation>
        <PageMove onClick={prevPage}>
          <FontAwesomeIcon icon={faChevronLeft} size="1x" />
        </PageMove>
        {pageList.map((page) => (
          <Page
            key={page}
            chk={clickPage}
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
          <DeleteConfirm deleteId={deleteId} onDelete={onDelete} setDeletePop={setDeletePop} loading={deleteLoading} />
        </Overlay>}
      {(cusLoading || deleteLoading) && 
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

const Items = styled.li`
  ${includes.flexBox()}
  flex-shrink: 0;
  width: 100%;
  height: 40px;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};

  &:not(:first-child):hover {
    background-color: ${(props) => props.theme.borderColor};
  }

  &:first-child {
    position: sticky;
    top: 0;
    border-bottom: none;
    background-color: ${(props) => props.theme.bgColor};
    z-index: 1;
  }

  &:nth-of-type(2) {
    border-top: 1px solid ${(props) => props.theme.borderColor};
  }
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

const Item = styled.span`
  ${includes.flexBox()}
  flex-shrink: 0;
  color: ${(props) => props.theme.textColor};
  width: 100px;

  &:first-child {
    font-weight: 600;
    opacity: .6;
  }

  &:nth-of-type(1) {
    width: 50px;
  }

  &:nth-of-type(2) {
    width: 160px;
  }

  &:nth-of-type(3) {
    width: 160px;
  }

  &:last-child {
    button {
      ${buttonStyle.base}
      ${includes.flexBox()}
      height: 30px;
      font-size: 12px;

      &:active {
        opacity: .6;
      }
    }
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

const Update = styled.button`
  border: 1px solid ${(props) => props.theme.borderColor};
  color: ${(props) => props.theme.textColor};
  margin-right: 5px;
`;

const Delete = styled.button`
  border: 1px solid ${(props) => props.theme.borderColor};
  color: ${colors.red};
  
`;