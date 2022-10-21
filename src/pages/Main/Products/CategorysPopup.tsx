import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UseMutateFunction, useQueryClient } from 'react-query';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FormProvider, useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { AxiosResponse } from 'axios';

import { buttonStyle, includes, toastStyle } from '../../../styles';
import { ICategoryRequest } from '../../../services/products';
import { categoryPopupState } from '../../../global';
import { queryKeys } from '../../../util';
import CategoryName from './CategorysInputs/CategoryName';
import CategoryConfirmList from './CategoryConfirmList';

interface ICategoryPopup {
  mutate: UseMutateFunction<AxiosResponse, unknown, ICategoryRequest>;
  delMutate: UseMutateFunction<AxiosResponse, unknown, string>;
}

function CategoryPopup({ mutate, delMutate }: ICategoryPopup) {
  const client = useQueryClient();
  const method = useForm<ICategoryRequest>();
  const [categoryPopup, setCategoryPopup] = useRecoilState(categoryPopupState);

  const onSubmit = ({ id, categoryName }: ICategoryRequest) => {    
    if(categoryPopup.updatePopup && !id) {
      alert('카테고리를 선택해주세요.');
      return;
    }

    const data = { id, categoryName };
    mutate(data, {
      onSuccess: () => {
        client.invalidateQueries(queryKeys.products.all);

        if (categoryPopup.updatePopup) {
          toastStyle.info('카테고리가 변경되었습니다.');
        }

        if (categoryPopup.createPopup) {
          setCategoryPopup(prev => ({
            ...prev,
            mainPopup: false,
            createPopup: false,
          }));
          toastStyle.success('카테고리가 추가되었습니다.');
        }
      },
      onError: (error: any) => {
        console.log('Mutate Error : Category Create & Update');
        toastStyle.error(error.message);
      }
    });
  }

  const onDelete = (id: string) => {
    if (categoryPopup.deletePopup) {
      delMutate(id, {
        onSuccess: () => {
          client.invalidateQueries(queryKeys.products.all);
          toastStyle.info('카테고리가 삭제되었습니다.');
        },
        onError: (error: any) => {
          console.log('--Category Delete Error--');
          toastStyle.error(error.message);
        }
      });
    }
  }

  const onClose = () => {
    setCategoryPopup(prev => ({
      ...prev,
      mainPopup: false,
      createPopup: false,
      updatePopup: false,
      deletePopup: false
    }));
  }

  return (
    <Wrapper>
      <FormProvider {...method}>
        {!categoryPopup.createPopup &&
          <CategoryConfirmList onDelete={onDelete} />}
        {!categoryPopup.deletePopup &&
          <InputGroup onSubmit={method.handleSubmit(onSubmit)}>
            <input style={{ display: 'none' }} {...method.register("id")} />
            <CategoryName />
            <Submit>{'등록'}</Submit>
          </InputGroup>}
      </FormProvider>

      <Close type='button' onClick={onClose}>
        <FontAwesomeIcon icon={faXmark} />
      </Close>
    </Wrapper>
  )
}

export default CategoryPopup;

const Wrapper = styled.div`
  ${includes.flexBox("flex-start", "center")}
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 40px 20px;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 4px;
  background-color: ${(props) => props.theme.bgColor};
  transition: background-color border-color 200ms ease-in-out;
  z-index: 1;
`;

const InputGroup = styled.form`
  ${includes.flexBox("center", "flex-start")}
  flex-direction: column;
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

  &:active,
  &:hover {
    opacity: .6;
  }
`;

const Submit = styled.button`
  ${buttonStyle.primary()}
  margin-top: 50px;
  width: 100px;
`;
