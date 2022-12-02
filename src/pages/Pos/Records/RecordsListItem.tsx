import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { recordLaundryState } from '../../../global';
import { dragging, includes } from '../../../styles';
import { IProducts } from '../../../services/products';

interface IRecordsListItem {
  product: IProducts;
}

function RecordsListItem({ product: { productId, productName, price } }: IRecordsListItem) {
  const setLaundry = useSetRecoilState(recordLaundryState);
  const onClick = (productId: string, productName: string, price: number) => {
    const data = {
      productId,
      productName,
      price,
      count: 1,
    };
    setLaundry((laundry) => {
      let chk = false; // NOTE: 주문 목록 중, 해당 품목 중복 여부 Check
      const copyLaundry = laundry.map((obj) => {
        if (obj.productId === productId) {
          chk = true;
          return {
            ...obj,
            count: obj.count + 1,
            price: obj.price + price
          }
        }
        return obj;
      });

      if (!chk) {
        return [
          ...laundry,
          data,
        ]
      }
      return copyLaundry;
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
