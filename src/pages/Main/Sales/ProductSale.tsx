import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

import { buttonStyle, colors, dragging, includes, media, scroll } from '../../../styles';
import { sortKinds, useProductSaleFetch } from '../../../hooks';
import { LoadingComponent, Overlay } from '../../../components';
import ProductSaleChart from './ProductSaleChart';

function ProductSale() {

  const { loading, dataSort, sortKind, setSortKind } = useProductSaleFetch();
  const chartDataInit = dataSort(sortKind).productStats.slice(0, 6);

  return (
    <Wrapper>
      <StatsGroup>
        <ListGroup>
          <ListControl>
            <Title>{'품목 통계'}</Title>
            <Tab type='button' onClick={() => setSortKind('count')}>{'누적 개수'}</Tab>
            <Tab type='button' onClick={() => setSortKind('price')}>{'누적 금액'}</Tab>
          </ListControl>
          <List>
            {dataSort(sortKind)?.productStats.map((stats, index) => (
              <Items key={stats.productId} chk={index} kind={sortKind}>
                <span>{index + 1}</span>
                <span>
                  {stats.productName}
                  {index === 0 && <FontAwesomeIcon icon={faStar} />}
                </span>
                <span>{`${stats.count}`}</span>
                <span>{`${stats.price.toLocaleString()}`}</span>
              </Items>            
            ))}
          </List>
        </ListGroup>
        <ProductSaleChart chartData={chartDataInit} sortKind={sortKind} />
      </StatsGroup>

      {loading &&
        <Overlay>
          <LoadingComponent loadingMessage='잠시만 기다려주세요.' />
        </Overlay>}
    </Wrapper>
  )
}

export default ProductSale;

const Wrapper = styled.div`
  ${dragging.stop}
  ${includes.flexBox('flex-start', 'flex-start')}
  flex-direction: column;
  flex-grow: 1;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.bgColor};
`;

const Title = styled.h1`
  margin-right: auto;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.textColor};
`;

const ListControl = styled.div`
  ${includes.flexBox('flex-start', 'center')}
`;

const Tab = styled.button`
  ${buttonStyle.primary}

  &:last-child {
    margin-left: 5px;
  }
`;

const StatsGroup = styled.div`
  ${includes.flexBox('flex-end', 'space-between')}
  width: 100%;
`;

const ListGroup = styled.div`
  flex-grow: 1;
  margin-right: 20px;

  @media ${media.pc_s} {
    margin-right: 60px;
  }

  @media ${media.pc_l} {
    width: 450px;
  }
`;

const List = styled.ul`
  ${includes.flexBox('flex-start', 'flex-start')}
  ${({ theme }) => scroll.custom(5, theme.borderColorSub, theme.textColor)}
  flex-direction: column;
  border-top: 1px solid ${({ theme }) => theme.borderColor};
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  height: 250px;
  padding: 10px;
  overflow-y: auto;
  overflow-x: hidden;

  @media ${media.pc_s} {
    height: 300px;
  }
`;

const Items = styled.li<{chk: number, kind: sortKinds}>`
  ${includes.flexBox('center', 'flex-start')}
  width: 100%;
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.inputColor};
  color: ${({ theme }) => theme.textColor};
  box-shadow: 0 0 10px rgba(0, 0, 0, .3);
  transition: transform 200ms ease-in-out;

  span:first-child {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 10px;
    background-color: ${({ chk }) =>
    chk === 0 ? colors.chartBlue(.5).blue1 :
      chk === 1 ? colors.chartBlue(.5).blue2 :
        chk === 2 ? colors.chartBlue(.5).blue3 :
          chk === 3 ? colors.chartBlue(.5).blue4 :
            chk === 4 ? colors.chartBlue(.5).blue5 :
              chk === 5 ? colors.chartBlue(.5).blue6 : colors.darkSlateGray};
    border-radius: 50%;
    font-size: 14px;
    font-weight: 600;
    text-align: center;
    color: ${colors.white};
    line-height: 18px;
  }

  span:nth-child(2) {
    margin-right: auto;
    font-weight: 600;
  }

  span:nth-child(3) {
    margin-right: 20px;
    font-size: 15px;
    ${({ kind }) => kind === 'count' && `
      color: ${colors.blueDark};
      font-weight: 600;
    `}

    @media ${media.pc_s} {
      font-size: 16px;
    }
  }

  span:nth-child(4) {
    width: 70px;
    font-size: 15px;
    text-align: right;
    ${({ kind }) => kind === 'price' && `
      color: ${colors.blueDark};
      font-weight: 600;
    `}

    @media ${media.pc_s} {
      font-size: 16px;
    }
  }

  svg {
    margin-left: 10px;
    color: ${colors.chartColor().yellow};
  }


  &:hover {
    transform: translateX(10px);
  }

  @media ${media.pc_s} {
    font-size: 14px;
  }
`;


