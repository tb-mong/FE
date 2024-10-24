import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../Components/BottomNav';
import Header from '../Components/Header';

const WRAPPER_WIDTH = '375px';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #FEFEFE;
`;

const AppWrapper = styled.div`
    width: ${WRAPPER_WIDTH};
    max-width: ${WRAPPER_WIDTH};
    min-height: 100vh;
    background-color: #A7D2FF;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    position: relative;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
`;

const SettingButton = styled.button`
    position: relative;
    background: none;
    border: none;
    cursor: pointer;
    margin-bottom: 20px;
    width: 300px;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        width: 100%;
        height: auto;
    }
`;

const ButtonText = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 35px;
    color: black;
    font-weight: bold;
    font-family: DNFBitBitv2;
    white-space: nowrap;
`;

const Setting = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리
    const navigate = useNavigate();

    useEffect(() => {
        const kakaoKey = process.env.REACT_APP_KAKAO_JS_KEY;

        // Kakao SDK 초기화 확인 로그 추가
        if (window.Kakao) {
            if (!window.Kakao.isInitialized()) {
                window.Kakao.init(kakaoKey);
                console.log('카카오 SDK 초기화 완료');
            } else {
                console.log('카카오 SDK 이미 초기화됨');
            }

            // sessionStorage에서 액세스 토큰 가져와 SDK에 설정
            const storedToken = sessionStorage.getItem('kakao_access_token');
            if (storedToken) {
                window.Kakao.Auth.setAccessToken(storedToken); // SDK에 액세스 토큰 설정
                setIsLoggedIn(true); // 로그인 상태로 설정
                console.log('세션 스토리지에서 액세스 토큰을 불러와 로그인된 상태입니다.');
            } else {
                console.log('로그인된 사용자가 없습니다.');
                setIsLoggedIn(false);
            }
        } else {
            console.log('Kakao 객체를 찾을 수 없습니다. SDK가 로드되지 않았을 수 있습니다.');
        }
    }, []);

    const handleLogout = () => {
        if (isLoggedIn) {
            window.Kakao.Auth.logout(() => {
                console.log('카카오 로그아웃 완료');
                sessionStorage.removeItem('kakao_access_token'); // 로그아웃 시 토큰 제거
                navigate('/');
            });
        } else {
            console.log('로그인된 사용자가 없습니다.');
        }
    };

    return (
        <Container>
            <AppWrapper>
                <Header />

                <ButtonWrapper>
                    <SettingButton onClick={() => navigate('/dongne-setting')}>
                        <img src="/setting_button.png" alt="동네 설정 버튼" />
                        <ButtonText>동네 설정</ButtonText>
                    </SettingButton>

                    <SettingButton onClick={() => navigate('/nickname')}>
                        <img src="/setting_button.png" alt="닉네임 설정 버튼" />
                        <ButtonText>닉네임 설정</ButtonText>
                    </SettingButton>

                    <SettingButton onClick={handleLogout}>
                        <img src="/setting_button.png" alt="로그아웃 버튼" />
                        <ButtonText>로그아웃</ButtonText>
                    </SettingButton>
                </ButtonWrapper>

                <BottomNav />
            </AppWrapper>
        </Container>
    );
};

export default Setting;
