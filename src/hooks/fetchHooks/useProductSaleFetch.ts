import { useState } from 'react'
import { useQuery } from 'react-query'
import { useRecoilValue } from 'recoil'

import { IGetProductSales, IProductStats } from '../../services/sales'
import { salesApi } from '../../global'
import { toastStyle } from '../../styles'
import { queryKeys } from '../../util'
import { AxiosResponse } from 'axios'

// export type sortKinds = 'count' | 'price';

interface IProductSaleFetch {
  loading: boolean;
  productStats: IProductStats[];
  // sortKind: sortKinds;
  // setSortKind: React.Dispatch<React.SetStateAction<sortKinds>>;
}

export const useProductSaleFetch = (): IProductSaleFetch => {
  const salesService = useRecoilValue(salesApi);
  // const [sortKind, setSortKind] = useState<sortKinds>('count');

  const {
    isLoading,
    isFetching,
    data,
  } = useQuery(queryKeys.sale.statsOfProduct(), () => salesService.getAllProductSale(), {
    staleTime: Infinity,
    cacheTime: Infinity,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: 'always',
    select: (data: AxiosResponse<IGetProductSales>) => {
      const resultObj = data?.data;
      return resultObj ? resultObj.productStats : [];
    },
    onError: (error: any) => {
      toastStyle.error(error.message);
    }
  });

  const loading = isLoading || isFetching;
  // const totalCountAndPriceSort = dataSortCountAndPrice(sortKind, data?.data);

  return { loading, productStats: data! };
}
