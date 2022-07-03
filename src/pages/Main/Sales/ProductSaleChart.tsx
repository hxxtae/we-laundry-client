import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import styled from 'styled-components';

import { IProductStats } from '../../../services/sales';
import { colors, media } from '../../../styles';
import { sortKinds } from '../../../hooks';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface IProductSaleChart {
  chartData: IProductStats[];
  sortKind: sortKinds;
}

function ProductSaleChart({ chartData, sortKind }: IProductSaleChart) {
  const chartStatsData = chartData.map((data) => data[sortKind]);
  const chartStatsLabel = chartData.map((data) => data.productName);

  return (
    <Wrapper>
      <Bar data={initChart(chartStatsLabel, chartStatsData)} options={options} />
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
        colors.chartBlue(0.5).blue6,
      ],
      borderColor: [
        colors.chartBlue().blue1,
        colors.chartBlue().blue2,
        colors.chartBlue().blue3,
        colors.chartBlue().blue4,
        colors.chartBlue().blue5,
        colors.chartBlue().blue6,
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
  position: relative;
  width: 400px;
  right: 0px;
  

  @media ${media.pc_s} {
    width: 450px;
    right: 20px;
  }
`;