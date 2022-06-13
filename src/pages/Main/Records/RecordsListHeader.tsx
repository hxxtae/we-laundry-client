import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { usePaging } from '../../../hooks';
import { IProductObjResponse } from '../../../services/products';
import { buttonStyle, colors, includes, media } from '../../../styles';

interface IRecordsListHeader {
  productObjs: IProductObjResponse[];
  categoryIdx: number;
  setCategoryIdx: React.Dispatch<React.SetStateAction<number>>;
}

function RecordsListHeader({ productObjs, categoryIdx, setCategoryIdx }: IRecordsListHeader) {
  
  const { fetchDatas, prevPage, nextPage, pageSort: { ASC } } = usePaging(productObjs, productObjs?.length, 5, 1);

  return (
    <TabsGroup>
      <TabList>
      {fetchDatas?.map((productObj, index) => (
        <Wrapper key={productObj.id}>
          <Tab
            type='button'
            onClick={() => setCategoryIdx(ASC(index))}>
            {productObj.categoryName}
          </Tab>
          {ASC(index) === categoryIdx &&
            <TabLine layoutId='headLine' />}
        </Wrapper>
      ))}
      </TabList>

      <TabControl>
        <TabMove onClick={prevPage}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </TabMove>
        <TabMove onClick={nextPage}>
          <FontAwesomeIcon icon={faChevronRight} />
        </TabMove>
      </TabControl>
    </TabsGroup>
  )
}

export default RecordsListHeader;

const TabsGroup = styled.div`
  ${includes.flexBox('center', 'space-between')}
  width: 100%;
`;

const TabList = styled.div`
  ${includes.flexBox('center', 'flex-start')}
`;

const Wrapper = styled.div`
  position: relative;
  ${includes.flexBox()}
`;

const Tab = styled.button`
  ${buttonStyle.base}
  padding: 15px;
  color: ${(props) => props.theme.textColor};
  font-size: 12px;

  @media ${media.pc_s} {
    font-size: 14px;
  }
`;

const TabLine = styled(motion.div)`
  position: absolute;
  bottom: 0;
  width: 100%;
  border-top: 3px solid ${colors.blue};
  border-radius: 5px;
`;

const TabControl = styled.div`
  ${includes.flexBox()}
`;

const TabMove = styled.button`
  ${includes.flexBox()}
  color: ${(props) => props.theme.textColor};
  width: 30px;
  height: 30px;
  margin-right: 10px;
  border-radius: 4px;
  transition: background-color 200ms ease-in-out;
  cursor: pointer;

  &:hover,
  &:active {
    opacity: .6;
    background-color: ${(props) => props.theme.borderColor};
  }
`;

