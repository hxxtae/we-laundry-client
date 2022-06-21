export const queryKeys = {
  auth: {
    all: ['/auth'] as const,
    me: () => [...queryKeys.auth.all, 'me'] as const,
    csrf: () => [...queryKeys.auth.all, 'csrf-token'] as const,
  },
  address: {
    all: ['/address'] as const,
  },
  customer: {
    all: ['/customer'] as const,
    list: () => [...queryKeys.customer.all, 'list'] as const,
    listDongHo: (addname: string, dong?: string, ho?: string) => [...queryKeys.customer.list(), `${addname}`, `${dong}`, `${ho}`] as const,
    check: () => [...queryKeys.customer.all, 'check'] as const,
    checkDongHo: (addname: string, dong: string, ho: string) => [...queryKeys.customer.check(), `${addname}-${dong}-${ho}`] as const,
  },
  products: {
    all: ['/products'] as const,
  },
  records: {
    all: ['/records'] as const,
    list: () => [...queryKeys.records.all, 'list'] as const,
    listDate: (date: string) => [...queryKeys.records.list(), date] as const,
    listDong: (addname: string, dong: string) => [...queryKeys.records.list(), `${addname}`, `${dong}`] as const,
    listDongHo: (addname: string, dong: string, ho?: string) => [...queryKeys.records.list(), `${addname}`, `${dong}`, `${ho}`] as const,
  },
  sale: {
    all: ['/sales'] as const,
  },
};
