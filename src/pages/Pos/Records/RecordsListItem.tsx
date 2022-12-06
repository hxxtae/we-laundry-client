import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { recordLaundryState } from '../../../global';
import { dragging, includes } from '../../../styles';
import { IProducts } from '../../../services/products';
import { IRecordsOflaundry } from '../../../services/records';

interface IRecordsListItem {
  product: IProducts;
  categoryId: string;
  categoryName: string;
}

function RecordsListItem({ product: { productId, productName, price }, categoryId, categoryName }: IRecordsListItem) {
  const setLaundry = useSetRecoilState(recordLaundryState);

  const laundrySetPriceAndCount = (recordLaundrys: IRecordsOflaundry[]) => {
    let chk = false; // NOTE: 주문 목록 중, 해당 품목 중복 여부 Check
    const copyRecordLaundrys = recordLaundrys.map((laundryObj) => {
      if (laundryObj.productId === productId) {
        chk = true;
        return {
          ...laundryObj,
          count: laundryObj.count + 1,
          price: laundryObj.price + price
        }
      }
      return laundryObj;
    });
    return { chk, copyRecordLaundrys };
  }

  const onClick = (productId: string, productName: string, price: number) => {
    const data = {
      categoryId,
      categoryName,
      productId,
      productName,
      price,
      count: 1,
    };
    setLaundry((recordLaundrys) => {
      const { chk, copyRecordLaundrys } = laundrySetPriceAndCount(recordLaundrys);

      // NOTE: 새로운 품목을 선택한 경우
      if (!chk) {
        return [
          ...recordLaundrys,
          data,
        ]
      }
      // NOTE: 중복된 품목을 선택한 경우
      return copyRecordLaundrys;
    });
  }

  return (
    <Item onClick={() => onClick(productId, productName, price)}>
      <Name>{productName}</Name>
      <Price>{price.toLocaleString()}</Price>
    </Item>
  )
}

export default RecordsListItem;

const Item = styled.li`
  ${includes.flexBox()}
  flex-direction: column;
  ${dragging.stop}
  width: 100%;
  padding: 14px;
  background-color: ${(props) => props.theme.inputColor};
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.borderColor };
  transition: border-color 200ms ease-in-out;
  cursor: pointer;
`;

const Name = styled.span`
  ${includes.flexBox()}
  padding: 10px 0;
  text-align: center;
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
`;

const Price = styled.span`
  padding: 10px 0;
  color: ${(props) => props.theme.textColor};
  font-size: 14px;
  font-weight: 600;
`;
