import { useQuery } from 'react-query'
import { useRecoilValue } from 'recoil'

import { IGetProductSales, IProductStats } from '../../services/sales'
import { salesApi } from '../../global'
import { toastStyle } from '../../styles'
import { queryKeys } from '../../util'
import { AxiosResponse } from 'axios'

interface IProductSaleFetch {
  loading: boolean;
  productStats: IProductStats[];
}

export const useProductSaleFetch = (): IProductSaleFetch => {
  const salesService = useRecoilValue(salesApi);

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

  return { loading, productStats: data! };
}
