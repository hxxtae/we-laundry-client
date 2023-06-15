import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';

import { colors, dragging, includes, scroll } from '../../../styles';
import { DeleteConfirm, Overlay } from '../../../components';
import { useProductObjFetch } from '../../../hooks';
import { categoryPopupState } from '../../../global';

interface ICategoryConfirmList {
  onDelete: (id: string) => void;
};

function CategoryConfirmList({ onDelete }: ICategoryConfirmList) {
  const { productObjs } = useProductObjFetch();
  const [choiceId, setChoiceId] = useState('');
  const [choiceName, setChoiceName] = useState('');
  const [deleteConfirmPopup, setDeleteConfirmPopup] = useState(false);
  const categoryPopup = useRecoilValue(categoryPopupState);
  const { setValue } = useFormContext();

  const onItemClick = (id: string, name: string) => {
    if (categoryPopup.updatePopup) {
      setValue('id', id);
      setValue('categoryName', name);
      setChoiceId(id);
      setChoiceName(name)
    }
    if (categoryPopup.deletePopup) {
      setDeleteConfirmPopup(true);
      setChoiceId(id);
      setChoiceName(name);
    }
  }
  
  return (
    <>
      <List>
        <Title>
          {categoryPopup.updatePopup ? '변경 할 ' : categoryPopup.deletePopup ? '삭제 할 ' : ''} {'카테고리를 선택해 주세요.'}
        </Title>
        {productObjs?.map((productObj) => (
          <Item
            key={productObj.id}
            choice={productObj.id === choiceId}
            divide={categoryPopup.updatePopup ? 1 : 2}
            onClick={() => onItemClick(productObj.id, productObj.categoryName)}>
            <Name>{productObj.categoryName}</Name>
          </Item>
        ))}
      </List>

      {deleteConfirmPopup && 
        <Overlay>
          <DeleteConfirm deleteId={choiceId} onDelete={onDelete} setDeletePop={setDeleteConfirmPopup} content={choiceName} />
        </Overlay>}
    </>
  )
}

export default CategoryConfirmList;

const Title = styled.p`
  position: sticky;
  top: 0;
  padding: 10px;
  font-size: 14px;
  text-align: center;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  z-index: 1;
`;

const List = styled.ul`
  ${dragging.stop}
  ${includes.flexBox("center", "flex-start")}
  flex-direction: column;
  height: 300px;
  padding: 0 20px;
  margin-right: 20px;
  overflow-y: auto;
  overflow-x: hidden;
  ${(props) => scroll.custom(8, props.theme.borderColorSub, props.theme.textColor)}
`;

const Item = styled.li<{choice: boolean, divide: number}>`
  ${includes.flexBox()}
  flex-shrink: 0;
  width: 100%;
  height: 35px;
  margin: 5px 0;
  border: 1px solid ${({theme, choice, divide}) => !choice ? theme.borderColor : divide === 1 ? colors.lightGreen : colors.red};
  border-radius: 4px;
  background-color: ${(props) => props.theme.bgColorSub};
  transition: background-color 200ms ease-in-out;
  cursor: pointer;
  
  &:hover {
    background-color: ${(props) => props.theme.inputColor};
  }
`;

const Name = styled.span`
  color: ${(props) => props.theme.textColor};
`;

