import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import styled from 'styled-components';

import { dragging, includes, media } from '../../../styles';
import { useProductObjFetch } from '../../../hooks';
import { LoadingItem } from '../../../components';
import RecordsListHeader from './RecordsListHeader';
import RecordsList from './RecordsList';

function RecordsListContext() {
  const [categoryIdx, setCategoryIdx] = useState(1);
  const { loading, productObjs } = useProductObjFetch();

  return (
    <>
      {!!productObjs?.length ?
      <>
        <RecordsListHeader productObjs={productObjs} categoryIdx={categoryIdx} setCategoryIdx={setCategoryIdx} />
        <Wrapper>
          {!loading ?
            <RecordsList categoryIdx={categoryIdx} productObjs={productObjs} /> :
            <LoadingBox>
              <LoadingItem />
            </LoadingBox>}
        </Wrapper>
      </> :
      <NotFound>
        <FontAwesomeIcon icon={faBoxOpen} />
        <span>{'카테고리와 품목을 추가해 주세요.'}</span>
      </NotFound>
      }
    </>
  )
}

export default RecordsListContext;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 370px;
  padding: 15px;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 4px;
  background-color: ${(props) => props.theme.bgColor};
  transition: background-color border-color 200ms ease-in-out;

  @media ${media.pc_s} {
    padding: 20px;
    height: 460px;
  }
`;

const LoadingBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  ${includes.flexBox()}
  width: 100%;
  height: 100%;
`;

const NotFound = styled.div`
  ${dragging.stop}
  ${includes.flexBox()}
  flex-direction: column;
  width: 100%;
  height: 375px;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 4px;
  margin-top: 40px;
  color: ${({ theme }) => theme.textColor};

  svg {
    font-size: 30px;
    opacity: .3;
  }

  span {
    padding: 15px 0;
    font-size: 14px;
    opacity: .3;
  }

  @media ${media.pc_s} {
    height: 510px;

    span {
      font-size: 15px;
    }
  }
`;
