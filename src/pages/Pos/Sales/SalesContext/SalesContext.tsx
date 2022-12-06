import styled from 'styled-components';

import { LoadingComponent, Overlay } from '../../../../components';
import { useProductSaleFetch } from '../../../../hooks';
import { CategorySale } from './CategorySale';
import { ProductSale } from './ProductSale';

export type sortKinds = 'count' | 'price';

function SalesContext() {
  const { loading, productStats } = useProductSaleFetch();

  return (
    <>
      <Wrapper>
        {loading || <ProductSale productStats={productStats} />}
        {loading || <CategorySale productStats={productStats} />}
      </Wrapper>

      {loading &&
        <Overlay>
          <LoadingComponent loadingMessage='잠시만 기다려주세요.' />
        </Overlay>}
    </>
  )
}

export default SalesContext;

const Wrapper = styled.div`
  width: 100%;
`;
