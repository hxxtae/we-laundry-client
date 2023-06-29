import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FormProvider, useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { IRecordsOfRepair } from '../../../../services/records';
import { buttonStyle, includes, media } from '../../../../styles';
import { recordRepairState } from '../../../../global';
import { RecordRepairName } from '../RecordsInputs';
import { RecordRepairPrice } from '../RecordsInputs';
import { useEffect } from 'react';

interface IRecordRepairPopup {
  setPopupActive: React.Dispatch<React.SetStateAction<boolean>>;
}

function RecordsRepairPopup({ setPopupActive }: IRecordRepairPopup) {
  const setRepairs = useSetRecoilState(recordRepairState);
  const method = useForm<IRecordsOfRepair>();

  const onSubmit = ({ repairId, repairName, price, count }: IRecordsOfRepair) => {
    const data = { repairId, repairName, price, count };
    setRepairs((prevRepairs) => {
      const copyRepairs = [...prevRepairs];
      copyRepairs.push({
        ...data,
        count: Number(data.count),
        price: Number(data.price),
      });
      return copyRepairs;
    });
    setPopupActive(false);
  }

  useEffect(() => {
    method.setFocus('repairName');
  }, []);

  return (
    <FormProvider {...method}>
      <InputGroup onSubmit={method.handleSubmit(onSubmit)}>
        <Close type='button' onClick={() => setPopupActive(false)}>
          <FontAwesomeIcon icon={faXmark} />
        </Close>
        <input style={{ display: 'none' }} {...method.register("repairId")} defaultValue={`R_${Date.now().toString()}`} />
        <input style={{ display: 'none' }} {...method.register("count")} defaultValue={Number(1)} type="number" />
        <RecordRepairName />
        <RecordRepairPrice />
        <Submit>{'추가'}</Submit>
      </InputGroup>
    </FormProvider>
  )
}

export default RecordsRepairPopup;

const InputGroup = styled.form`
  position: relative;
  ${includes.flexBox("center", "center")}
  flex-direction: column;
  gap: 25px;
  width: 315px;
  height: 315px;
  padding: 25px;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 4px;
  background-color: ${(props) => props.theme.bgColor};
  transition: background-color border-color 200ms ease-in-out;
  z-index: 11;
`;

const Close = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  ${includes.flexBox()}
  ${buttonStyle.base()}
  background-color: ${(props) => props.theme.borderColor};
  width: 30px;
  height: 30px;
  color: ${(props) => props.theme.textColor};

  &:hover,
  &:active {
    opacity: .6;
  }
`;

const Submit = styled.button`
  ${buttonStyle.open()}
  width: 100px;
`;
