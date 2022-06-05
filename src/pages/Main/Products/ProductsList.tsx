import { useRecoilState, useRecoilValue } from 'recoil';
import { GridContextProvider, swap } from "react-grid-dnd";
import { useMutation, useQueryClient } from 'react-query';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { IProductObjCreateRequest, IProductObjUpdateRequest, IProducts } from '../../../services/products';
import { productDelState, productPopupState, productsApi, productUpdState } from '../../../global';
import { buttonStyle, includes, media, scroll, toastStyle } from '../../../styles';
import { LoadingComponent, Overlay } from '../../../components';
import ProductsBoard from './ProductsBoard';
import ProductsPopup from './ProductsPopup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRotateRight } from '@fortawesome/free-solid-svg-icons';

interface IProductsList {
  reLoading: boolean;
  productObj: IProductObjUpdateRequest;
}

function ProductsList({ reLoading, productObj }: IProductsList) {
  console.log('ProductList');

  const productsService = useRecoilValue(productsApi);
  const [copyProducts, setCopyProducts] = useState<IProducts[]>(productObj.products!);
  const [popupActive, setPopupActive] = useRecoilState(productPopupState);
  const [updActive, setUpdActive] = useRecoilState(productUpdState);
  const [delActive, setDelActive] = useRecoilState(productDelState);
  const client = useQueryClient();

  const { isLoading: updLoading, mutate: updMutate } = useMutation(({ id, products }: IProductObjUpdateRequest) => productsService.updateProduct({ id, products }));
  const { isLoading: insLoading, mutate: insMutate } = useMutation(({ id, productName, price }: IProductObjCreateRequest) => productsService.createProduct({ id, productName, price }));
  const mutateLoading = updLoading || insLoading;

  useEffect(() => {
    setCopyProducts(productObj.products!);
  }, [reLoading]);
  
  const onSave = () => {
    const data = { id: productObj.id, products: copyProducts };
    updMutate(data, {
      onSuccess: () => {
        setUpdActive(false);
        setDelActive(false);
        client.invalidateQueries(["/productObj", "fetch"]);
        toastStyle.info('저장되었습니다.');
      }
    });
  };

  const onRollup = () => {
    client.invalidateQueries(["/productObj", "fetch"]);
  }

  const onChange = (sourceId: string, sourceIndex: number, targetIndex: number, targetId?: string) => {
    if (updActive || delActive) {
      return;
    }
    const nextState = swap(copyProducts!, sourceIndex, targetIndex);
    setCopyProducts(nextState);
  }

  return (
    <>
      <GridContextProvider onChange={onChange}>
        <Wrapper>
          <List>
            <ProductsBoard products={copyProducts} setCopyProducts={setCopyProducts} />
          </List>
          <ButtonGroup>
            <Save type="button" onClick={onSave}>{'저장하기'}</Save>
            <Rollup type="button" onClick={onRollup}>
              <FontAwesomeIcon icon={faArrowRotateRight} />
            </Rollup>
            <AddProduct type="button" onClick={() => setPopupActive(true)} disabled={updActive || delActive}>{'추가'}</AddProduct>
            <UpdProduct type="button" onClick={() => setUpdActive((prev) => !prev)} disabled={delActive}>{'변경'}</UpdProduct>
            <DelProduct type="button" onClick={() => setDelActive((prev) => !prev)} disabled={updActive}>{'삭제'}</DelProduct>
          </ButtonGroup>
        </Wrapper>
      </GridContextProvider>

      {(popupActive) &&
        <ProductsPopup categoryId={productObj.id} copyProducts={copyProducts} mutate={insMutate} setCopyProducts={setCopyProducts} />}
      {(reLoading || mutateLoading) &&
        <Overlay>
          <LoadingComponent loadingMessage='잠시만 기다려주세요.' />
        </Overlay>}
    </>
  )
}

export default ProductsList;

const Wrapper = styled.div`
  width: 100%;
  padding: 20px;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 4px;
  background-color: ${(props) => props.theme.bgColor};
  transition: background-color border-color 200ms ease-in-out;
`;

const List = styled.div`
  width: 100%;
  ${(props) => scroll.custom(8, props.theme.borderColorSub, props.theme.textColor)}
  overflow-y: scroll;
  overflow-x: hidden;

  & {
    .list {
      min-height: 386px;
    }
  }

  @media ${media.pc_s} {
    width: 800px;

    & {
      .list {
        min-height: 470px;
      }
    }
  }
`;

const ButtonGroup = styled.div`
  ${includes.flexBox()}
`;

const Save = styled.button`
  ${buttonStyle.primary}
  height: 40px;
`;

const Rollup = styled.button`
  ${buttonStyle.base}
  background-color: ${(props) => props.theme.inputColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 4px;
  min-width: 40px;
  min-height: 40px;
  color: ${(props) => props.theme.textColor};
  &:active {
    opacity: .6;
  }
`;

const AddProduct = styled.button`
  ${buttonStyle.open}
`;

const UpdProduct = styled.button`
  ${buttonStyle.secondary}
`;

const DelProduct = styled.button`
  ${buttonStyle.close}
`;



