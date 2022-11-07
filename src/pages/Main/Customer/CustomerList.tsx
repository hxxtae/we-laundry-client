import { useRecoilState, useSetRecoilState } from 'recoil';
import { useState } from 'react';
import styled from 'styled-components';
import '@fortawesome/fontawesome-svg-core';

import { DeleteConfirm, LoadingComponent, Overlay, Pagination } from '../../../components';
import { customerRequestState, searchState, updateState } from '../../../global';
import { useCustomerFetch, useCustomerDel } from './application/hooks';
import { includes, media, scroll } from '../../../styles';
import { usePaging } from '../../../hooks';
import { CustomerDTO } from './application/interface';
import CustomerListTop from './CustomerListTop';
import CustomerItem from './CustomerItem';
import CustomerSearch from './CustomerSearch';

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

  const onSearchActive = () => {
    setSearchPopup(true);
  }

  const onDelete = (id: string) => {
    isMutating || mutate(id);
  };

  return (
    <Wrapper>
      <CustomerListTop customerDataLen={customerDatas?.length} onSearchActive={onSearchActive} />
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
          <DeleteConfirm
            deleteId={deleteId}
            onDelete={onDelete}
            setDeletePop={setDeletePopup}
            loading={isMutating} />
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
