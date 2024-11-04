import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Home = () => (
  <Container>
    <Title>Welcome to Chat App</Title>
    <SubTitle>Connect and chat with people around the world.</SubTitle>
    <StartButton to='/chat'>Start Chatting</StartButton>
  </Container>
)

export default Home

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #3b82f6, #9333ea);
  color: #ffffff;
  text-align: center;
`

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 0.5em;
  font-weight: bold;
`

const SubTitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 1.5em;
`

const StartButton = styled(Link)`
  padding: 0.75em 2em;
  background-color: #ffffff;
  color: #3b82f6;
  font-weight: bold;
  text-decoration: none;
  border-radius: 50px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`
