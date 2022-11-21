import { GridDropZone, GridItem } from 'react-grid-dnd';

import { IProducts } from '../../../services/products';
import ProductsCard from './ProductsCard';

interface IProductsBoard {
  products: IProducts[];
  setCopyProducts: React.Dispatch<React.SetStateAction<IProducts[]>>;
}

function ProductsBoard({ products, setCopyProducts }: IProductsBoard) {
  
  return (
    <GridDropZone
      className='list'
      id='products'
      boxesPerRow={7}
      rowHeight={110}
    >
      {products?.map((product, index) => (
        <GridItem key={product.productId}>
          <ProductsCard
            product={product}
            products={products}
            index={index}
            setCopyProducts={setCopyProducts} />
        </GridItem>
      ))}
    </GridDropZone>
  )
}

export default ProductsBoard;
