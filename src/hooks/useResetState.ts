import { useResetRecoilState } from 'recoil';
import {
  addressRequestState,
  productRequestState,
  recordRequestState,
  recordLaundryState,
  recordRepairState,
  recordReceiptExeState,
  categoryPopupState,
  productsPopupState,
  menuPopupState,
} from '../global';

export const useResetState = (state: boolean = false) => {
  /* atom action */
  const resetCategoryPopupState = useResetRecoilState(categoryPopupState);
  const resetProductsPopupState = useResetRecoilState(productsPopupState);
  const resetMenuPopupState = useResetRecoilState(menuPopupState);

  /* atom Records */
  const resetLaundryState = useResetRecoilState(recordLaundryState);
  const resetRepairState = useResetRecoilState(recordRepairState);
  const resetReceiptState = useResetRecoilState(recordReceiptExeState);

  /* request */
  const resetAddressState = useResetRecoilState(addressRequestState);
  const resetProductState = useResetRecoilState(productRequestState);
  const resetRecordState = useResetRecoilState(recordRequestState);

  const allStateReset = () => {
    resetCategoryPopupState();
    resetProductsPopupState();
    resetMenuPopupState();

    resetLaundryState();
    resetRepairState();
    resetReceiptState();

    resetAddressState();
    resetProductState();
    resetRecordState();
  }

  return { allStateReset };
};
