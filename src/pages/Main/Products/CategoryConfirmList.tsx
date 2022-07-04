import styled from 'styled-components';
import { useState } from 'react';

import { dragging, includes, scroll } from '../../../styles';
import { DeleteConfirm, Overlay } from '../../../components';
import { useProductObjFetch } from '../../../hooks';

interface ICategoryConfirmList {
  onItemClick: (id: string, name: string) => void;
  onDelete: (id: string) => void;
  deletePopup: boolean;
  setDeletePopup: React.Dispatch<React.SetStateAction<boolean>>;
  children: JSX.Element;
};

function CategoryConfirmList({ onItemClick, onDelete, deletePopup, setDeletePopup, children }: ICategoryConfirmList) {
  const { productObjs } = useProductObjFetch();
  const [deleteId, setDeleteId] = useState('');

  const onClick = (id: string, name: string) => {
    onItemClick(id, name);
    setDeleteId(id);
  }
  
  return (
    <>
      <List>
        <Desc>{children}</Desc>
        {productObjs?.map((productObj) => (
          <Item
            key={productObj.id}
            onClick={() => onClick(productObj.id, productObj.categoryName)}>
            <Name>{productObj.categoryName}</Name>
          </Item>
        ))}
      </List>

      {deletePopup && 
        <Overlay>
          <DeleteConfirm deleteId={deleteId} onDelete={onDelete} setDeletePop={setDeletePopup} />
        </Overlay>}
    </>
  )
}

export default CategoryConfirmList;

const Desc = styled.div`
  position: sticky;
  top: 0;
  ${includes.flexBox()}
  background-color: ${(props) => props.theme.bgColor};
  border-radius: 4px;
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

const Name = styled.span`
  color: ${(props) => props.theme.textColor};
`;

