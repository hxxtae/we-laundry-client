import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useState } from 'react';
import styled from 'styled-components';
import '@fortawesome/fontawesome-svg-core';

import { customerRequestState, searchState, updateState } from '../../../global';
import { buttonStyle, includes, media, scroll } from '../../../styles';
import { DeleteConfirm, LoadingComponent, Overlay, Pagination } from '../../../components';
import { useCustomerFetch, useCustomerDel } from './application/hooks';
import { usePaging } from '../../../hooks';
import { CustomerDTO } from './application/interface';
import CustomerSearch from './CustomerSearch';
import CustomerItem from './CustomerItem';

function CustomerList() {
  const setUpdateData = useSetRecoilState(customerRequestState);
  const [updateActive, setUpdateActive] = useRecoilState(updateState);
  const [searchPopup, setSearchPopup] = useRecoilState(searchState);
  const [deletePopup, setDeletePopup] = useState(false);
  const [deleteId, setDeleteId] = useState('');  
  const { isLoading, isFetching, customerDatas } = useCustomerFetch();
  const { isMutating, mutate } = useCustomerDel();
  const cusLoading = isLoading || isFetching;

  const pageObj = usePaging<CustomerDTO.ICustomerResponse>(customerDatas, customerDatas?.length, 10, 5);

  const onUpdateActive = ({id, addid, addname, addfullname, name, dong, ho}: CustomerDTO.ICustomerRequest) => {
    setUpdateData({id, addid, addname, addfullname, name, dong, ho});
    setUpdateActive(true);
  };

  const onDeleteActive = (id: string) => {
    if (updateActive) return;
    setDeletePopup(true);
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
          onClick={() => setSearchPopup(true)}
          disabled={updateActive}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <span>검색</span>
        </SearchButton>
      </ControlGroup>
      <List>
        <CustomerItem
          fetchDatas={pageObj.fetchDatas}
          sort={pageObj.pageSort.DESC}
          onUpdateActive={onUpdateActive}
          onDeleteActive={onDeleteActive} />
      </List>
      <Pagination {...pageObj} />

      {searchPopup && <CustomerSearch />}
      {deletePopup &&
        <Overlay>
          <DeleteConfirm deleteId={deleteId} onDelete={onDelete} setDeletePop={setDeletePopup} loading={isMutating} />
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
  ${buttonStyle.primary()}
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
