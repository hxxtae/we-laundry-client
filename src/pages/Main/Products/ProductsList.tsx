import { faArrowRotateRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRecoilState, useRecoilValue } from 'recoil';
import { GridContextProvider, swap } from "react-grid-dnd";
import { useMutation, useQueryClient } from 'react-query';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { IProductCreateRequest, IProductObjResponse, IProducts, IProductsUpdateRequest } from '../../../services/products';
import { deleteState, popupState, updateState, productsApi } from '../../../global';
import { buttonStyle, includes, media, scroll, toastStyle } from '../../../styles';
import { LoadingComponent, Overlay } from '../../../components';
import { queryKeys } from '../../../util';
import ProductsBoard from './ProductsBoard';
import ProductsPopup from './ProductsPopup';

interface IProductsList {
  reLoading: boolean;
  productObj: IProductObjResponse;
}

function ProductsList({ reLoading, productObj }: IProductsList) {
  const productsService = useRecoilValue(productsApi);
  const [copyProducts, setCopyProducts] = useState<IProducts[]>(productObj.products!);
  const [updActive, setUpdActive] = useRecoilState(updateState);
  const [delActive, setDelActive] = useRecoilState(deleteState);
  const [popupActive, setPopupActive] = useRecoilState(popupState);
  const client = useQueryClient();

  const { isLoading: updLoading, mutate: updMutate } = useMutation(({ id, products }: IProductsUpdateRequest) => productsService.updateProduct({ id, products }));
  const { isLoading: insLoading, mutate: insMutate } = useMutation(({ id, productName, price }: IProductCreateRequest) => productsService.createProduct({ id, productName, price }));
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
        client.invalidateQueries(queryKeys.products.all);
        toastStyle.info('?????????????????????.');
      },
      onError: (error: any) => {
        console.log('--Products Update Error--');
        toastStyle.error(error.message);
      }
    });
  };

  const onRollup = () => {
    client.invalidateQueries(queryKeys.products.all);
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
            <Save type="button" onClick={onSave}>{'????????????'}</Save>
            <Rollup type="button" onClick={onRollup}>
              <FontAwesomeIcon icon={faArrowRotateRight} />
            </Rollup>
          </ButtonGroup>
        </Wrapper>
      </GridContextProvider>

      {(popupActive) &&
        <ProductsPopup categoryId={productObj.id} copyProducts={copyProducts} mutate={insMutate} setCopyProducts={setCopyProducts} />}
      {(reLoading || mutateLoading) &&
        <Overlay>
          <LoadingComponent loadingMessage='????????? ??????????????????.' />
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
  ${includes.flexBox('center', 'flex-start')}
`;

const Save = styled.button`
  ${buttonStyle.primary}
  height: 40px;
  margin-right: 5px;
`;

const Rollup = styled.button`
  ${buttonStyle.base}
  background-color: ${(props) => props.theme.inputColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 4px;
  min-width: 40px;
  min-height: 40px;
  color: ${(props) => props.theme.textColor};
  transition: opacity 200ms ease-in-out;
  &:hover,
  &:active {
    opacity: .6;
  }
`;
