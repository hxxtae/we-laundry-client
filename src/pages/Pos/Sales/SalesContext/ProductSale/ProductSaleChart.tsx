import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import styled from 'styled-components';

import { IProductStats } from '../../../../../services/sales';
import { buttonStyle, colors, includes, media } from '../../../../../styles';
import { sortKinds } from '../SalesContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface IProductSaleChart {
  totalCountAndPriceSort: IProductStats[];
  sortKind: sortKinds;
  setSortKind: React.Dispatch<React.SetStateAction<sortKinds>>;
}

function ProductSaleChart({ totalCountAndPriceSort, sortKind, setSortKind }: IProductSaleChart) {
  const chartStatsLabel = totalCountAndPriceSort.map((productObj) => productObj.productName);
  const chartStatsData = totalCountAndPriceSort.map((productObj) => productObj[sortKind]);
  
  return (
    <Wrapper>
      <Tabs>
        <Tab type='button' onClick={() => setSortKind('count')} state={sortKind === 'count'}>{'누적 개수'}</Tab>
        <Tab type='button' onClick={() => setSortKind('price')} state={sortKind === 'price'}>{'누적 금액'}</Tab>
      </Tabs>
      <Chart>
        <Bar data={initChart(chartStatsLabel, chartStatsData)} options={options} />
      </Chart>
    </Wrapper>
  )
}

export default ProductSaleChart;

export const initChart = (labels: string[], data: number[]) => ({
  labels: [...labels],
  datasets: [
    {
      data: [...data],
      backgroundColor: [
        colors.chartBlue(0.5).blue1,
        colors.chartBlue(0.5).blue2,
        colors.chartBlue(0.5).blue3,
        colors.chartBlue(0.5).blue4,
        colors.chartBlue(0.5).blue5,
      ],
      borderColor: [
        colors.chartBlue().blue1,
        colors.chartBlue().blue2,
        colors.chartBlue().blue3,
        colors.chartBlue().blue4,
        colors.chartBlue().blue5,
      ],
      borderWidth: 2,
      borderRadius: 5,
    },
  ],
});

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
};

const Wrapper = styled.div`
  width: 400px;
  ${includes.flexBox('flex-end', 'space-between')};
  flex-direction: column;
  
  @media ${media.pc_s} {
    width: 450px;
  }
`;

const Tabs = styled.div`
  text-align: right;
  margin-bottom: auto;
`;

const Tab = styled.button<{state: boolean}>`
  ${buttonStyle.primary()}
  background-color: ${({ state }) => state ? colors.blue : colors.borderDark};

  &:last-child {
    margin-left: 5px;
  }
`;

const Chart = styled.div`
  position: relative;
  width: 100%;

  @media ${media.pc_s} {
    right: 22px;
  }
`;