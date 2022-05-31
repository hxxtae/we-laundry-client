import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { FieldValues, UseFormSetValue } from 'react-hook-form';
import styled from 'styled-components';
import { dragging, includes } from '../styles';

interface IKeyboardBox {
  setValue: UseFormSetValue<FieldValues>;
  value: string;
}

function KeyboardBox({ setValue, value }: IKeyboardBox) {
  const [comStrNum, setComStrNum] = useState('');
  const keyPad = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const onClick = (num: string) => {
    setComStrNum((prev) => {
      setValue(value, prev + num);
      return prev + num;
    })
  }

  const onClean = () => {
    setComStrNum('');
    setValue(value, '');
  }

  const onErase = () => {
    setComStrNum((prev) => {
      const arr = prev.split('');
      arr.pop();
      setValue(value, arr.join(''));
      return arr.join('');
    });
  }

  return (
    <SelectBox variants={boxVariant} initial="init" animate="start" exit="end">
      <SelectItems variants={itemsVariant}>
        {keyPad.map((item) => (
          <SelectItem
            key={item}
            onClick={() => onClick(item+"")}
          >{item}</SelectItem>
        ))}
        <SelectItem onClick={onClean}>{'C'}</SelectItem>
        <SelectItem onClick={() => onClick('0')}>{'0'}</SelectItem>
        <SelectItem onClick={onErase}>
          <FontAwesomeIcon icon={faDeleteLeft} />
        </SelectItem>
      </SelectItems>
    </SelectBox>
  )
}

export default KeyboardBox;

const boxVariant = {
  init: {
    height: 0,
  },
  start: {
    height: "auto",
    transition: {
      delayChildren: 0.3,
      type: 'tween',
    }
  },
  end: {
    height: 0,
    transition: {
      delay: 0.3,
    }
  }
}

const itemsVariant = {
  init: {
    opacity: 0,
  },
  start: {
    opacity: 1,
  },
  end: {
    opacity: 0,
  }
}

const SelectBox = styled(motion.div)`
  position: absolute;
  top: 85px;
  left: 0;
  width: 100%;
  background-color: ${(props) => props.theme.borderColor};
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`;

const SelectItems = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  padding: 5px;
`;

const SelectItem = styled(motion.span)`
  ${dragging.stop}
  ${includes.flexBox()}
  border-radius: 4px;
  background-color: ${(props) => props.theme.inputColor};
  color: ${(props) => props.theme.textColor};
  font-size: 16px;
  padding: 8px;

  &:hover,
  &:active {
    opacity: .6;
  }
`;
