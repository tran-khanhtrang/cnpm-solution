import React, { useState } from 'react';
import styled from 'styled-components';
import { MessageOutlined, CloseOutlined, FacebookOutlined, SendOutlined } from '@ant-design/icons';

const ChatWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const ChatButton = styled.div`
  width: 60px;
  height: 60px;
  background-color: #0084ff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.1);
  }
`;

const SocialList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 15px;
  opacity: ${props => (props.isOpen ? 1 : 0)};
  visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
  transform: translateY(${props => (props.isOpen ? '0' : '20px')});
  transition: all 0.3s ease;
`;

const SocialItem = styled.a`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 20px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  text-decoration: none;
  &:hover {
    transform: scale(1.1);
  }
`;

const ZaloIcon = () => (
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Icon_of_Zalo.svg/1200px-Icon_of_Zalo.svg.png"
        alt="Zalo" style={{ width: '25px', height: '25px' }} />
);

const SocialChatComponent = () => {
    const [isOpen, setIsOpen] = useState(false);

    const socialPlatforms = [
        {
            name: 'Facebook',
            icon: <FacebookOutlined />,
            color: '#1877F2',
            link: process.env.REACT_APP_FACEBOOK || 'https://facebook.com'
        },
        {
            name: 'Zalo',
            icon: <ZaloIcon />,
            color: '#0068ff',
            link: `https://zalo.me/${process.env.REACT_APP_ZALO}`
        },
        {
            name: 'Telegram',
            icon: <SendOutlined style={{ transform: 'rotate(-30deg)' }} />,
            color: '#0088cc',
            link: process.env.REACT_APP_TELEGRAM || 'https://t.me'
        }
    ];

    return (
        <ChatWrapper>
            <SocialList isOpen={isOpen}>
                {socialPlatforms.map((platform, index) => (
                    <SocialItem
                        key={index}
                        href={platform.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ backgroundColor: platform.color }}
                        title={platform.name}
                    >
                        {platform.icon}
                    </SocialItem>
                ))}
            </SocialList>
            <ChatButton onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <CloseOutlined /> : <MessageOutlined />}
            </ChatButton>
        </ChatWrapper>
    );
};

export default SocialChatComponent;
