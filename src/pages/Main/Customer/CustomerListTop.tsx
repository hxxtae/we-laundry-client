import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { updateState } from '../../../global';
import { buttonStyle, includes } from '../../../styles';

interface IComponentListTop {
  customerDataLen: number;
  onSearchActive(): void;
}

function CustomerListTop({ customerDataLen, onSearchActive }: IComponentListTop) {
  const updateActive = useRecoilValue(updateState);

  return (
    <Wrapper>
      <Count>총 {customerDataLen || 0} 개</Count>
      <SearchButton
        type='button'
        onClick={onSearchActive}
        disabled={updateActive}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <span>검색</span>
      </SearchButton>
    </Wrapper>
  )
}

export default CustomerListTop;

const Wrapper = styled.div`
  ${includes.flexBox('center', 'space-between')}
  width: 100%;
  height: 40px;
`;

const Count = styled.strong`
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
`;

const SearchButton = styled.button`
  ${buttonStyle.primary()}
  ${includes.flexBox()}
  width: 100px;
  height: 30px;
  
  span {
    margin-left: 5px;
  }
`;
