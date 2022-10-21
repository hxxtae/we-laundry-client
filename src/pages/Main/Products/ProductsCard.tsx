import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { menuPopupState, productRequestState, productsPopupState } from '../../../global';
import { colors, dragging, includes } from '../../../styles';
import { IProducts } from '../../../services/products';

interface IProductsCard {
  products: IProducts[];
  product: IProducts;
  index: number;
  setCopyProducts: React.Dispatch<React.SetStateAction<IProducts[]>>;
}

function ProductsCard({ products, product: { productName, price }, index, setCopyProducts }: IProductsCard) {
  const setProductState = useSetRecoilState(productRequestState);
  const [productsPopup, setProductsPopup] = useRecoilState(productsPopupState);
  const setMenuPopup = useSetRecoilState(menuPopupState);

  const onClick = (index: number) => {
    /* update */
    if (productsPopup.updatePopup && !productsPopup.deletePopup) {
      const { productId, productName, price } = products[index];
      setProductState({
        productId,
        productName,
        price,
        index,
      });
      setProductsPopup(prev => ({
        ...prev,
        mainPopup: true,
      }));
    }
    /* delete */
    if (productsPopup.deletePopup && !productsPopup.updatePopup) {
      const copyProducts = [...products];
      copyProducts.splice(index, 1);
      setCopyProducts(copyProducts);
    }

    setMenuPopup(false);
  };

  return (
    <Card
      updActive={productsPopup.updatePopup}
      delActive={productsPopup.deletePopup}
      onClick={() => onClick(index)}>
      <Name>{productName}</Name>
      <Price>{price.toLocaleString()}</Price>
    </Card>
  )
}

export default ProductsCard;

const Card = styled.div<{ updActive: boolean, delActive: boolean }>`
  position: relative;
  ${includes.flexBox()}
  flex-direction: column;
  ${dragging.stop}
  width: 100px;
  height: 100px;
  background-color: ${(props) => props.theme.inputColor};
  border-radius: 4px;
  border: 1px solid ${(props) =>
    (props.updActive === true) ? colors.green :
      (props.delActive === true) ? colors.red :
        props.theme.borderColor };
  transition: border-color 200ms ease-in-out;
`;

const Name = styled.span`
  padding: 10px;
  text-align: center;
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
`;

const Price = styled.span`
  padding: 10px;
  color: ${(props) => props.theme.textColor};
  font-size: 14px;
  font-weight: 600;
`;
