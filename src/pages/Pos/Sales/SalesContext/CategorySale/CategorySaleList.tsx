import { faClipboard, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback } from 'react'
import styled from 'styled-components';

import { colors, includes, media, scroll } from '../../../../../styles';
import { IProductStats } from '../../../../../services/sales';
import { sortKinds } from '../SalesContext';

interface ICategorySaleList {
  productStats: IProductStats[];
  sortKind: sortKinds;
}

function CategorySaleList({ productStats, sortKind }: ICategorySaleList) {
  
  const countFilter = useCallback((count: number) => {
    if (count < 10_000) return count;
    const showMillion = Math.floor((count * 100) / 10_000) / 100;
    return `${showMillion}m`;
    // NOTE: 1만 단위로 뒤에서 부터 잘라서(100의 자리부터) 보여준다.
    //   Math.floor((count / 10_000) * 100) / 100 -> 나눗셈으로 소숫점에서 시작하면
    //   count 11300은 1.13이 아닌 1.12가 되어버리기 때문이다.
  }, []);

  const notFoundItems = (productStats: IProductStats[] = []) => {
    return !productStats?.length && (
      <NotFound>
        <FontAwesomeIcon icon={faClipboard} />
        <span>{'(통계 내역 없음)'}</span>
      </NotFound>
    )
  }

  return (
    <List>
      {productStats?.map((stats, index) => (
        <Items key={stats.productId} chk={index} kind={sortKind}>
          <span>{index + 1}</span>
          <span>
            {stats.productName}
            {index === 0 && <FontAwesomeIcon icon={faStar} />}
          </span>
          <span>{countFilter(stats.count)}</span>
          <span>{`${stats.price.toLocaleString()}`}</span>
        </Items>
      ))}
      {notFoundItems(productStats)}
    </List>
  )
}

export default CategorySaleList;

const List = styled.ul`
  ${includes.flexBox('flex-start', 'flex-start')}
  ${({ theme }) => scroll.custom(5, theme.borderColorSub, theme.textColor)}
  flex-direction: column;
  border-top: 1px solid ${({ theme }) => theme.borderColor};
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  height: 220px;
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

  &:hover {
    transform: translateX(10px);
  }

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
    width: 100px;
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

  @media ${media.pc_s} {
    font-size: 14px;
  }
`;

const NotFound = styled.p`
  align-self: center;
  margin: auto 0;
  ${includes.flexBox()}
  flex-direction: column;
  gap: 10px;

  span, svg {
    color: ${({ theme }) => theme.textColor};
    font-size: 14px;
  }

  svg {
      font-size: 20px;
    }

  @media ${media.pc_s} {
    svg {
      font-size: 30px;
    }
  }
`;
