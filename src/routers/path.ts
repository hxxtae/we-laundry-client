const root = process.env.PUBLIC_URL!;

type IPathName = 'login' | 'signup' | 'pos' | 'board' | 'records' | 'history' | 'customer' | 'products' | 'address' | 'sales';

type INonUserPath = {
  login: string;
  signup: string;
}
const nonUserPath: INonUserPath = {
  login: `/` as const,
  signup: `/signup` as const,
}

type IUserPath = {
  pos: string;
  board: string;
}
const userPath: IUserPath = {
  pos: `/pos` as const,
  board: `/board` as const,
}

type IPosPath = {
  records: string;
  history: string;
  customer: string;
  products: string;
  address: string;
  sales: string;
}
const posPath: IPosPath = {
  records: `${userPath.pos}/records` as const,
  history: `${userPath.pos}/history` as const,
  customer: `${userPath.pos}/customer` as const,
  products: `${userPath.pos}/products` as const,
  address: `${userPath.pos}/address` as const,
  sales: `${userPath.pos}/sales` as const,
}

type IPath = INonUserPath & IUserPath & IPosPath;
const totalPath: IPath = {
  ...nonUserPath,
  ...userPath,
  ...posPath,
}

// NOTE: check property of totalPath object
//console.log(Object.keys(totalPath).map(key => `'${key}'`).join(' | '));

export const pathStr = (path: IPathName, rootActive = false) => {
  return rootActive ? `${root}${totalPath[path]}` : `${totalPath[path]}`;
}
