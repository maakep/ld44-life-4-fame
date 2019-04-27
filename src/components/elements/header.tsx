import * as React from 'react';
import { styled } from '@glitz/react';

const HeaderWrapper = styled.div({
  width: '100%',
  position: 'absolute',
  height: '70px',
  display: 'flex',
  backgroundColor: '#e2f4f5',
  boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
  justifyContent: 'space-between',
});

const LeftContent = styled.div({
  flexGrow: 1,
  alignSelf: 'left',
  display: 'flex',
  alignItems: 'center',
});

const MiddleContent = styled.div({
  flexGrow: 1,
  alignSelf: 'center',
  display: 'flex',
  alignItems: 'center',
  textAlign: 'center',
});

const RightContent = styled.div({
  flexGrow: 1,
  alignSelf: 'right',
  display: 'flex',
  alignItems: 'center',
});


export const Header = () => (
  <HeaderWrapper>
    <LeftContent>

    </LeftContent>
    <MiddleContent>
      <h1 style={{ marginLeft: '50%', transform: 'translateX(-50%)' }}>
        LIFE 4 FAME
      </h1>
    </MiddleContent>
    <RightContent>

    </RightContent>
  </HeaderWrapper>
);