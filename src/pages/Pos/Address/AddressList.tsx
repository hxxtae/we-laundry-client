import { useMutation, useQueryClient } from 'react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useState } from 'react';
import '@fortawesome/fontawesome-svg-core';
import styled from 'styled-components';

import { buttonStyle, colors, includes, media, scroll, toastStyle } from '../../../styles';
import { DeleteConfirm, LoadingComponent, Overlay } from '../../../components';
import { usePaging, useAddressFetch } from '../../../hooks';
import { addressRequestState } from '../../../global';
import { addressApi } from '../../../global/atoms';
import { queryKeys } from '../../../util';
import { IAddressResponse } from '../../../services/address';

interface IAddressList {
  setUpdateActive: React.Dispatch<React.SetStateAction<boolean>>;
}

function AddressList({ setUpdateActive }: IAddressList) {
  const setData = useSetRecoilState(addressRequestState);
  const [deletePop, setDeletePop] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const addressService = useRecoilValue(addressApi);
  const client = useQueryClient();

  const { mutate, isLoading: deleteLoading } = useMutation((id: string) => addressService.deleteAdd(id));
  const { loading, reLoading, addDatas } = useAddressFetch();
  const addLoading = loading || reLoading;
  const {
    fetchDatas,
    pageBtnList,
    clickPageIdx,
    setPage,
    nextPage,
    prevPage,
    pageSort: { DESC }
  } = usePaging<IAddressResponse>(addDatas, addDatas?.length, 10, 5);

  const onUpdateActive = (id: string, addname: string, addfullname: string) => {
    setData({
      id,
      addname,
      addfullname,
    });
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
        client.invalidateQueries(queryKeys.address.all);
        client.invalidateQueries(queryKeys.customer.all);
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
      <Count>총 {addDatas?.length || 0} 개</Count>
      <List>
        <Items>
          <Title>No.</Title>
          <Title>주소이름</Title>
          <Title>주소</Title>
          <Title>생성날짜</Title>
          <Title>설정</Title>
        </Items>
        {fetchDatas.map((item, idx) => (
        <Items key={item.id}>
          <Item>{DESC(idx)}</Item>
          <Item>{item.addname}</Item>
          <Item>{item.addfullname}</Item>
          <Item>{item.createdAt}</Item>
          <Item>
            <Update type='button' onClick={() => onUpdateActive(item.id, item.addname, item.addfullname)} disabled={reLoading}>{'변경'}</Update>
            <Delete type='button' onClick={() => onDeleteActive(item.id)}
              disabled={deleteLoading || loading || reLoading}>{'삭제'}</Delete>
          </Item>
        </Items>))}
      </List>
      <PageNation>
        <PageMove onClick={prevPage}>
          <FontAwesomeIcon icon={faChevronLeft} size="1x" />
        </PageMove>
        {pageBtnList.map((page) => (
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

      {deletePop &&
        <Overlay>
          <DeleteConfirm deleteId={deleteId} onDelete={onDelete} setDeletePop={setDeletePop} loading={deleteLoading} />
        </Overlay>}
      {(addLoading || deleteLoading) ?
        <Overlay>
          <LoadingComponent loadingMessage='잠시만 기다려주세요' />
        </Overlay> : null}
    </Wrapper>
  )
}

export default AddressList;

const Wrapper = styled.div`
  width: 100%;
  padding: 20px;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 4px;
  background-color: ${(props) => props.theme.bgColor};
  transition: background-color border-color 200ms ease-in-out;
`;

const Count = styled.strong`
  ${includes.flexBox('center', 'flex-start')}
  color: ${(props) => props.theme.textColor};
  height: 40px;
  font-weight: 600;
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
    width: 150px;
  }

  &:nth-of-type(3) {
    width: 250px;
  }

  @media ${media.tablet_s} {
    &:nth-of-type(3) {
      width: 390px;
    }
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
    width: 150px;
  }

  &:nth-of-type(3) {
    width: 250px;
    text-align: center;
  }

  &:last-child {
    button {
      ${buttonStyle.base()}
      ${includes.flexBox()}
      height: 30px;
      font-size: 12px;

      &:active {
        opacity: .6;
      }
    }
  }

  @media ${media.tablet_s} {
    &:nth-of-type(3) {
      width: 390px;
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