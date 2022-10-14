import { useState } from 'react'
import { useQuery } from 'react-query'
import { useRecoilValue } from 'recoil'
import { salesApi } from '../../global'
import { IGetProductSales, IProductStats } from '../../services/sales'
import { toastStyle } from '../../styles'
import { queryKeys } from '../../util'

export type sortKinds = 'count' | 'price';

interface IProductSaleFetch {
  loading: boolean;
  dataSort: (sort: sortKinds) => IGetProductSales;
  sortKind: sortKinds;
  setSortKind: React.Dispatch<React.SetStateAction<sortKinds>>;
}

export const useProductSaleFetch = (): IProductSaleFetch => {
  const salesService = useRecoilValue(salesApi);
  const [sortKind, setSortKind] = useState<sortKinds>('count');

  const {
    isLoading,
    isFetching,
    data: productStatsData
  } = useQuery(queryKeys.sale.statsOfProduct(), () => salesService.getAllProductSale(), {
    staleTime: Infinity,
    cacheTime: Infinity,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: 'always',
    onError: (error: any) => {
      toastStyle.error(error.message);
    }
  });

  const loading = isLoading || isFetching;

  // -------------------------
  // 품목 이름 (한, 영) 필터링
  // -------------------------
  const nameOverlap = (statsArr: IProductStats[]) => {
    const str = new RegExp(/[가-하ㄱ-ㅎㅏ-ㅣa-zA-Z]+/);
    const nameStatsArr = statsArr.map((obj) => {
      const { productName } = obj;
      const name = str.exec(productName)?.toString();
      return {
        ...obj,
        productName: name as string,
      }
    });

    return nameStatsArr;
  }

  // -------------------------
  // 품목 이름 중복 결합
  // -------------------------
  const nameOverlapSum = (statsArr: IProductStats[]) => {
    const sumStatsArr = statsArr.reduce((prev: IProductStats[], curr: IProductStats) => {
      const idx = prev.findIndex((obj) => obj.productName === curr.productName);
      if (idx === -1) {
        return [...prev, curr];
      }
      const setObj = {
        ...prev[idx],
        count: prev[idx].count + curr.count,
        price: prev[idx].price + curr.price,
      };

      prev[idx] = setObj;
      return [...prev];
      
    }, [] as IProductStats[]);

    return sumStatsArr;
  }

  // -------------------------
  // 품목 Sort
  // -------------------------
  const dataSort = (sort: sortKinds) => {
    const datas: IGetProductSales = productStatsData?.data;
    if (!datas) {
      return {
        id: '',
        _id: '',
        productStats: [],
      }
    }

    const statsArrByName = nameOverlap(datas.productStats);
    const statsArrBySum = nameOverlapSum(statsArrByName);

    const statsArr: IProductStats[] = statsArrBySum.sort((a, b) => {
      if (b[sort] - a[sort] === 0) {
        if (sort === 'count') return b['price'] - a['price'];
        if (sort === 'price') return b['count'] - a['count'];
      }
      return b[sort] - a[sort];
    }).slice(0, 10);
    
    return {
      ...datas,
      productStats: statsArr,
    }
  }


  return { loading, dataSort, sortKind, setSortKind };
}
