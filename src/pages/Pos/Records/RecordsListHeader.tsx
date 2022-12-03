import { motion } from 'framer-motion';
import styled from 'styled-components';

import { buttonStyle, colors, includes, media } from '../../../styles';
import { IProductObjResponse } from '../../../services/products';
import { usePaging } from '../../../hooks';
import { Pagination } from '../../../components';

interface IRecordsListHeader {
  productObjs: IProductObjResponse[];
  categoryIdx: number;
  setCategoryIdx: React.Dispatch<React.SetStateAction<number>>;
}

function RecordsListHeader({ productObjs, categoryIdx, setCategoryIdx }: IRecordsListHeader) {
  const pageObj = usePaging(productObjs, productObjs?.length, 5, 1);

  return (
    <TabsGroup>
      <TabList>
      {pageObj.fetchDatas?.map((productObj, index) => (
        <Wrapper key={productObj.id}>
          <Tab
            type='button'
            onClick={() => setCategoryIdx(pageObj.pageSort.ASC(index))}>
            {productObj.categoryName}
          </Tab>
          {pageObj.pageSort.ASC(index) === categoryIdx &&
            <TabLine layoutId='headLine' />}
        </Wrapper>
      ))}
      </TabList>

      <PageWrapper>
        <Pagination {...pageObj} noShowPage={true} />
      </PageWrapper>
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
  ${buttonStyle.base()}
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

const PageWrapper = styled.div`
  
`;
