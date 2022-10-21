import { useResetRecoilState } from 'recoil';
import {
  searchState,
  addressRequestState,
  customerRequestState,
  productRequestState,
  recordRequestState,
  recordLaundryState,
  recordRepairState,
  recordReceiptExeState,
  customerSearchState,
  categoryPopupState,
  productsPopupState,
  menuPopupState
} from '../global';

export const useResetState = (state: boolean = false) => {
  /* atom action */
  const resetCategoryPopupState = useResetRecoilState(categoryPopupState);
  const resetProductsPopupState = useResetRecoilState(productsPopupState);
  const resetMenuPopupState = useResetRecoilState(menuPopupState);
  const resetSearchState = useResetRecoilState(searchState);

  /* atom Records */
  const resetLaundryState = useResetRecoilState(recordLaundryState);
  const resetRepairState = useResetRecoilState(recordRepairState);
  const resetReceiptState = useResetRecoilState(recordReceiptExeState);

  /* request */
  const resetAddressState = useResetRecoilState(addressRequestState);
  const resetCustomerState = useResetRecoilState(customerRequestState);
  const resetCustomerSearchState = useResetRecoilState(customerSearchState);
  const resetProductState = useResetRecoilState(productRequestState);
  const resetRecordState = useResetRecoilState(recordRequestState);

  const allStateReset = () => {
    resetCategoryPopupState();
    resetProductsPopupState();
    resetMenuPopupState();
    resetSearchState();

    resetLaundryState();
    resetRepairState();
    resetReceiptState();

    resetAddressState();
    resetCustomerState();
    resetProductState();
    resetRecordState();
    if(state) resetCustomerSearchState();
  }

  return { allStateReset };
};
