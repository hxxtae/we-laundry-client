import styled from 'styled-components';

import { includes, media, scroll } from '../../../styles';
import { CustomerDTO } from './application/interface';
import CustomerItems from './CustomerItems';

interface ICustomerList {
  fetchDatas: CustomerDTO.ICustomerResponse[];
  sort: (num: number) => number;
  onUpdateActive: (fetchData: CustomerDTO.ICustomerRequest) => void;
  onDeleteActive: (id: string) => void;
}

function CustomerList({ fetchDatas, sort, onUpdateActive, onDeleteActive }: ICustomerList) {

  return (
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
      <CustomerItems
        fetchDatas={fetchDatas}
        sort={sort}
        onUpdateActive={onUpdateActive}
        onDeleteActive={onDeleteActive} />
    </List>
  )
}

export default CustomerList;

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
