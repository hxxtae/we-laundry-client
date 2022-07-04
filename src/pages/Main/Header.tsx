import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useHistory } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { motion } from 'framer-motion';
import '@fortawesome/fontawesome-svg-core';
import styled from 'styled-components';

import { authApi, openState, sidebarState, userState } from '../../global/atoms';
import { colors, dragging, includes, media } from '../../styles';
import { useCustomDate } from '../../hooks';

function Header() {
  console.log("Header");

  const authService = useRecoilValue(authApi);
  const open = useRecoilValue(openState);
  const setSideToggle = useSetRecoilState(sidebarState);
  const setUser = useSetRecoilState(userState);
  const history = useHistory();
  const { toDate, toClock } = useCustomDate();
  const client = useQueryClient();

  const { mutate } = useMutation(() => authService.logout());

  const onLogout = async () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      mutate(undefined, {
        onSuccess: () => {
          setUser(undefined);
          client.clear();
          history.push('/');
        },
      });
    }
  };

  const menuClick = () => {
    setSideToggle((prev) => !prev);
  }

  return (
    <HeaderSection>
      <LeftControl>
        <MenuIcon onClick={menuClick}>
          <FontAwesomeIcon icon={faBars} size='2x' />
        </MenuIcon>
        <OpenAndClose>
          <StateIcon state={open.toString()} animate={{opacity: 0}} transition={{repeatType: "reverse", repeat: Infinity, duration: 1}} />
          <StateText>{open ? '영업중' : '영업마감'}</StateText>
        </OpenAndClose>
      </LeftControl>
      
      <RightControl>
        <Logout type='button' onClick={onLogout}>
          {'로그아웃'}
        </Logout>
        <ToDate>
          {toDate}
        </ToDate>
        <ToClock>
          {toClock}
        </ToClock>
      </RightControl>
    </HeaderSection>
  )
}

export default Header;

const HeaderSection = styled(motion.header)`
  ${dragging.stop}
  ${includes.flexBox('center', 'space-between')}
  background-color: ${colors.darkSlateSub};
  transition: background-color 200ms ease-in-out;
  width: 100%;
  padding: 16px;

  @media ${media.pc_s} {
    padding: 20px;
  }
`;

const LeftControl = styled(motion.div)`
  ${includes.flexBox()}
`;

const RightControl = styled(motion.div)`

`;

const MenuIcon = styled(motion.div)`
  color: ${colors.white};
  padding: 0 4px;
  font-size: 12px;
  cursor: pointer;

  &:active {
    opacity: .5;
  }

  @media ${media.pc_s} {
    padding: 0 4.5px;
    font-size: 14px;
  }
`;

const OpenAndClose = styled(motion.div)`
  ${includes.flexBox('center', 'space-between')}
  margin-left: 30px;
`;

const StateIcon = styled(motion.div)<{state: string}>`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: ${(props) => props.state === 'true' ? colors.green : colors.red};
  box-shadow: 0 0 10px ${(props) => props.state === 'true' ? colors.green : colors.red};
`;

const StateText = styled(motion.span)`
  color: ${colors.white};
  font-weight: 600;
  font-size: 17px;
  margin-left: 10px;
`;

const Logout = styled.button`
  color: ${colors.white};
  font-size: 12px;
  font-weight: 600;
  padding: 0 10px;
  cursor: pointer;

  &:hover {
    opacity: .6;
  }
`;

const ToDate = styled.span`
  color: ${colors.white};
  font-size: 20px;
  font-weight: 400;
  padding: 0 10px;
`;

const ToClock = styled.span`
  color: ${colors.white};
  font-size: 22px;
  font-weight: 400;
  padding: 0 10px;
`;