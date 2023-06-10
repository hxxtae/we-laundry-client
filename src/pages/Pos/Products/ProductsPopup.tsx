import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UseMutateFunction, useQueryClient } from 'react-query';
import { useRecoilState, useRecoilValue } from 'recoil';
import { FormProvider, useForm } from 'react-hook-form';
import { AxiosResponse } from 'axios';
import { useEffect } from 'react';
import styled from 'styled-components';
import '@fortawesome/fontawesome-svg-core';

import { productRequestState, productsPopupState } from '../../../global';
import { IProductCreateRequest, IProducts } from '../../../services/products';
import { buttonStyle, includes, toastStyle } from '../../../styles';
import ProductName from './PorductsInputs/ProductName';
import ProductPrice from './PorductsInputs/ProductPrice';
import { isIntegerCheck, queryKeys } from '../../../util';

interface IProductsPopup {
  categoryId: string;
  categoryName: string;
  copyProducts: IProducts[];
  insMutate: UseMutateFunction<AxiosResponse, unknown, IProductCreateRequest>;
  setCopyProducts: React.Dispatch<React.SetStateAction<IProducts[]>>;
}

function ProductsPopup({ categoryId, categoryName, copyProducts, insMutate, setCopyProducts }: IProductsPopup) {
  const [productsPopup, setProductsPopup] = useRecoilState(productsPopupState);
  const productState = useRecoilValue(productRequestState);
  const method = useForm<IProductCreateRequest>();
  const client = useQueryClient();

  const onSubmit = ({ id, productName, price }: IProductCreateRequest) => {
    const integerPrice = isIntegerCheck(price);
    if (integerPrice === false) {
      alert("정수만 입력해 주세요");
      return;
    }

    /* Products Update */
    if (productsPopup.updatePopup) {
      const { productId, index } = productState;
      
      // 새로운 product obj
      const updateProduct: IProducts = {
        productId,
        productName,
        price: integerPrice,
      };

      copyProducts.splice(index!, 1, updateProduct);
      setCopyProducts(copyProducts);
      setProductsPopup(prev => ({
        ...prev,
        mainPopup: false,
      }));
      return;
    }

    /* Products Create */
    const data = { id, productName, price: integerPrice };
    insMutate(data, {
      onSuccess: () => {
        setProductsPopup(prev => ({
          ...prev,
          mainPopup: false,
          createPopup: false,
        }))
        client.invalidateQueries(queryKeys.products.all);
        toastStyle.success('품목이 추가되었습니다.');
      },
      onError: (error: any) => {
        console.error('--Product Create Error--');
        toastStyle.error(error.message);
      }
    });
  };

  const onClose = () => {
    setProductsPopup(prev => ({
      ...prev,
      mainPopup: false,
      createPopup: false,
    }));
  }

  useEffect(() => {
    if (productsPopup.createPopup) {
      method.setValue('id', categoryId);
      return;
    }
    const { productName, price } = productState;
    method.setValue('productName', productName);
    method.setValue('price', price);
  }, []);

  return (
    <FormProvider {...method}>
      <InputGroup onSubmit={method.handleSubmit(onSubmit)}>
        <Close type='button' onClick={onClose}>
          <FontAwesomeIcon icon={faXmark} />
        </Close>
        <Title>{ categoryName }</Title>
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
  ${buttonStyle.base()}
  background-color: ${(props) => props.theme.borderColor};
  width: 30px;
  height: 30px;
  color: ${(props) => props.theme.textColor};
  &:hover {
    opacity: .6;
  }
`;

const Title = styled.h2`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.textColor};
  margin-top: 32px;
`;

const Submit = styled.button`
  ${buttonStyle.open()}
  margin-top: 50px;
  width: 100px;
`;
