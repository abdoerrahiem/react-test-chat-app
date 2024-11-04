import React from 'react'
import styled from 'styled-components'
import Chat from '../components/Chat'

const ChatPage = () => (
  <Container>
    <ChatBox>
      <Header>Chat Room</Header>
      <Chat />
    </ChatBox>
  </Container>
)

export default ChatPage

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f3f4f6;
`

const ChatBox = styled.div`
  width: 100%;
  max-width: 600px;
  height: 80vh;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  background-color: #ffffff;
`

const Header = styled.div`
  padding: 1em;
  background-color: #3b82f6;
  color: #ffffff;
  font-weight: bold;
  text-align: center;
`
