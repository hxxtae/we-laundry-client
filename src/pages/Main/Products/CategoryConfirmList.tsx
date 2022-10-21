import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
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
  const [deleteId, setDeleteId] = useState('');
  const [deleteConfirmPopup, setDeleteConfirmPopup] = useState(false);
  const categoryPopup = useRecoilValue(categoryPopupState);
  const { setValue } = useFormContext();

  const onItemClick = (id: string, name: string) => {
    if (categoryPopup.updatePopup) {
      setValue('id', id);
      setValue('categoryName', name);
      setDeleteId(id);
    }
    if (categoryPopup.deletePopup) {
      setDeleteConfirmPopup(true);
      setDeleteId(id);
    }
  }
  
  return (
    <>
      <List>
        <Title>
          {categoryPopup.updatePopup ? '변경할 ' : categoryPopup.deletePopup ? '삭제할 ' : ''} {'카테고리를 선택해 주세요.'}
        </Title>
        {productObjs?.map((productObj) => (
          <Item
            key={productObj.id}
            onClick={() => onItemClick(productObj.id, productObj.categoryName)}>
            {productObj.id === deleteId &&
              <Check>
                <FontAwesomeIcon icon={faCheckCircle} />
              </Check>}
            <Name>{productObj.categoryName}</Name>
          </Item>
        ))}
      </List>

      {deleteConfirmPopup && 
        <Overlay>
          <DeleteConfirm deleteId={deleteId} onDelete={onDelete} setDeletePop={setDeleteConfirmPopup} />
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

const Item = styled.li`
  ${includes.flexBox()}
  position: relative;
  flex-shrink: 0;
  width: 100%;
  height: 35px;
  margin: 5px 0;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 4px;
  background-color: ${(props) => props.theme.bgColorSub};
  transition: background-color 200ms ease-in-out;
  cursor: pointer;
  
  &:hover {
    background-color: ${(props) => props.theme.inputColor};
  }
`;

const Check = styled.span`
  position: absolute;
  right: 30px;
  color: ${colors.green};
  transition: color 200ms ease-in-out;
`

const Name = styled.span`
  color: ${(props) => props.theme.textColor};
`;

