import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { updateState } from '../../../global';
import { buttonStyle, colors, includes } from '../../../styles';
import { CustomerDTO } from './application/interface';

interface ICustomerItem {
  fetchDatas: CustomerDTO.ICustomerResponse[];
  sort: (num: number) => number;
  onUpdateActive: (fetchData: CustomerDTO.ICustomerRequest) => void;
  onDeleteActive: (id: string) => void;
}

function CustomerItem({ fetchDatas, sort, onUpdateActive, onDeleteActive }: ICustomerItem) {
  const updateActive = useRecoilValue(updateState);

  return (
    <>
      {fetchDatas.map((fetchData, idx) => (
      <Items key={fetchData.id}>
        <Item>{sort(idx)}</Item>
        <Item>{fetchData.name || '-'}</Item>
        <Item>{fetchData.addname || '-'}</Item>
        <Item>{fetchData.dong || '-'}</Item>
        <Item>{fetchData.ho || '-'}</Item>
        <Item>{fetchData.createdAt}</Item>
        <Item>
          <Update type='button' onClick={() => onUpdateActive({...fetchData})}>{'변경'}</Update>
          <Delete type='button' onClick={() => onDeleteActive(fetchData.id)} disabled={updateActive}>{'삭제'}</Delete>
        </Item>
      </Items>))}
    </>
  )
}

export default CustomerItem;

const Items = styled.li`
  ${includes.flexBox()}
  flex-shrink: 0;
  width: 100%;
  height: 40px;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};

  &:nth-of-type(1) {
    border-top: 1px solid ${(props) => props.theme.borderColor};
  }

  &:hover {
    background-color: ${(props) => props.theme.borderColor};
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

const Update = styled.button`
  border: 1px solid ${(props) => props.theme.borderColor};
  color: ${(props) => props.theme.textColor};
  margin-right: 5px;
`;

const Delete = styled.button`
  border: 1px solid ${(props) => props.theme.borderColor};
  color: ${colors.red};
  
`;
