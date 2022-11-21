import { Resetter, useResetRecoilState } from 'recoil';
import { customerRequestState, customerSearchState, searchState, updateState } from '../atom';

interface IResetCustomerAtom {
  resetCustomerRequest: Resetter;
  resetCustoemrSearch: Resetter;
  resetSearchState: Resetter;
  resetUpdateState: Resetter;
}

export const useCustomerResetAtom = (): IResetCustomerAtom => {
  const resetCustomerRequest = useResetRecoilState(customerRequestState);
  const resetCustoemrSearch = useResetRecoilState(customerSearchState);
  const resetSearchState = useResetRecoilState(searchState);
  const resetUpdateState = useResetRecoilState(updateState);

  return { resetCustomerRequest, resetCustoemrSearch, resetSearchState, resetUpdateState };
}
