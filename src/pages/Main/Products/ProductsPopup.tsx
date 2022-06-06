import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UseMutateFunction, useQueryClient } from 'react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { FormProvider, useForm } from 'react-hook-form';
import { AxiosResponse } from 'axios';
import { useEffect } from 'react';
import styled from 'styled-components';
import '@fortawesome/fontawesome-svg-core';

import { productPopupState, productRequestState, productUpdState } from '../../../global';
import { IProductCreateRequest, IProducts } from '../../../services/products';
import { buttonStyle, includes, toastStyle } from '../../../styles';
import ProductName from './PorductsInputs/ProductName';
import ProductPrice from './PorductsInputs/ProductPrice';

interface IProductsPopup {
  categoryId: string;
  copyProducts: IProducts[];
  mutate: UseMutateFunction<AxiosResponse, unknown, IProductCreateRequest>;
  setCopyProducts: React.Dispatch<React.SetStateAction<IProducts[]>>;
}

function ProductsPopup({ categoryId, copyProducts, mutate, setCopyProducts }: IProductsPopup) {
  console.log('ProductPopup');

  const setPopupActive = useSetRecoilState(productPopupState);
  const updActive = useRecoilValue(productUpdState);
  const productState = useRecoilValue(productRequestState);
  const method = useForm<IProductCreateRequest>();
  const client = useQueryClient();
  method.setValue('id', categoryId);

  useEffect(() => {
    if (!updActive) {
      return;
    }
    const { productName, price} = productState;
    method.setValue('productName', productName);
    method.setValue('price', price);
  }, []);

  const onSubmit = ({ id, productName, price }: IProductCreateRequest) => {
    
    /* update */
    if (updActive) {
      const { productId, index } = productState;
      const {
        productName: prev_productName,
        price: prev_price
      } = copyProducts[index];
      
      const updateProduct: IProducts = {
        ...copyProducts[index],
        productId,
        productName: productName || prev_productName,
        price: price || prev_price,
      };

      copyProducts.splice(index!, 1, updateProduct);
      setCopyProducts(copyProducts);
      setPopupActive(false);
      return;
    }

    /* create */
    const data = { id, productName, price };
    mutate(data, {
      onSuccess: () => {
        setPopupActive(false);
        client.invalidateQueries(["/productObj", "fetch"]);
        toastStyle.success('품목이 추가되었습니다.');
      },
      onError: (error: any) => {
        console.log('--Product Create Error--');
        toastStyle.error(error.message);
      }
    });
  };

  return (
    <FormProvider {...method}>
      <InputGroup onSubmit={method.handleSubmit(onSubmit)}>
      <Close type='button' onClick={() => setPopupActive(false)}>
        <FontAwesomeIcon icon={faXmark} />
      </Close>
        <input style={{ display: 'none' }} {...method.register("id")} />
        <ProductName />
        <ProductPrice />
        <Submit>{'등록'}</Submit>
      </InputGroup>
    </FormProvider>
  )
}

export default ProductsPopup;

const InputGroup = styled.form`
  position: absolute;
  ${includes.flexBox("center", "flex-start")}
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 20px;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 4px;
  background-color: ${(props) => props.theme.bgColor};
  transition: background-color border-color 200ms ease-in-out;
`;

const Close = styled.button`
  position: absolute;
  top: 40px;
  right: 40px;
  ${includes.flexBox()}
  ${buttonStyle.base}
  background-color: ${(props) => props.theme.borderColor};
  width: 30px;
  height: 30px;
  color: ${(props) => props.theme.textColor};
  &:hover {
    opacity: .6;
  }
`;

const Submit = styled.button`
  ${buttonStyle.primary}
  margin-top: 50px;
  width: 100px;
`;
