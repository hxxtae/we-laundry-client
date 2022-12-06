import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

import styled from 'styled-components';
import { buttonStyle, colors, includes, media } from '../../../../../styles';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function CategorySaleChart() {
  return (
    <div></div>
    // <Wrapper>
    //   <ListControl>
    //     <Tab type='button' onClick={() => setSortKind('count')}>{'누적 개수'}</Tab>
    //     <Tab type='button' onClick={() => setSortKind('price')}>{'누적 금액'}</Tab>
    //   </ListControl>
    //   <Bar data={initChart(chartStatsLabel, chartStatsData)} options={options} />
    // </Wrapper>
  )
}

export default CategorySaleChart;

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
  position: relative;
  width: 400px;
  right: 0px;
  ${includes.flexBox('flex-end', 'space-between')};
  flex-direction: column;
  

  @media ${media.pc_s} {
    width: 450px;
    right: 20px;
  }
`;

const ListControl = styled.div`
  text-align: right;
  margin-bottom: auto;
`;

const Tab = styled.button`
  ${buttonStyle.primary()}

  &:last-child {
    margin-left: 5px;
  }
`;
