import { useResetRecoilState } from 'recoil';
import {
  deleteState,
  searchState,
  updateState,
  popupState,
  addressRequestState,
  customerRequestState,
  productRequestState,
  recordRequestState,
  recordLaundryState,
  recordRepairState,
  recordReceiptExeState,
  customerSearchState
} from '../global';

export const useResetState = (state: boolean = false) => {
  /* atom action */
  const resetUpdateState = useResetRecoilState(updateState);
  const resetDeleteState = useResetRecoilState(deleteState);
  const resetPopupState = useResetRecoilState(popupState);
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
    resetUpdateState();
    resetDeleteState();
    resetPopupState();
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
