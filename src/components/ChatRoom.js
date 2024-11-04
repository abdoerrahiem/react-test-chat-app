import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addMessage } from '../redux/chatSlice'
import { useChatContext } from '../context/ChatContext'
import styled from 'styled-components'

const ChatRoom = () => {
  const [input, setInput] = useState('')
  const [userId] = useState(`user_${Math.floor(Math.random() * 1000000)}`)
  const dispatch = useDispatch()
  const messages = useSelector((state) => state.chat.messages)
  const pusher = useChatContext()

  useEffect(() => {
    const channel = pusher.subscribe('chat')
    channel.bind('message', (data) => {
      dispatch(addMessage(data))
    })

    return () => {
      channel.unbind_all()
      channel.unsubscribe()
    }
  }, [dispatch, pusher])

  const sendMessage = useCallback(async () => {
    if (input.trim()) {
      const messageData = { text: input, sender: userId }
      try {
        await fetch('http://localhost:3001/api/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(messageData),
        })

        setInput('')
      } catch (error) {
        console.error('Error sending message:', error)
      }
    }
  }, [input, userId])

  return (
    <Container>
      <Messages>
        {messages.map((msg, index) => (
          <Message key={index} isMine={msg.sender === userId}>
            <Sender isMine={msg.sender === userId}>
              {msg.sender === userId ? 'Me' : 'Anonymous'}
            </Sender>
            <Text>{msg.text}</Text>
          </Message>
        ))}
      </Messages>
      <InputWrapper>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Type a message...'
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              sendMessage()
            }
          }}
        />
        <SendButton onClick={sendMessage}>Send</SendButton>
      </InputWrapper>
    </Container>
  )
}

export default ChatRoom

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-height: 100%;
  padding: 1em;
  box-sizing: border-box;
`

const Messages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1em;
  background: #e5e7eb;
  border-radius: 10px;
  margin-bottom: 1em;
  display: flex;
  flex-direction: column;
`

const Message = styled.div`
  display: block;
  align-self: ${(props) => (props.isMine ? 'flex-end' : 'flex-start')};
  margin-bottom: 0.5em;
  padding: 0.75em;
  background: ${(props) => (props.isMine ? '#3b82f6' : '#e0e0e0')};
  color: ${(props) => (props.isMine ? '#ffffff' : '#333333')};
  border-radius: ${(props) =>
    props.isMine ? '10px 10px 0 10px' : '10px 10px 10px 0'};
  max-width: 75%;
  width: fit-content;
  word-wrap: break-word;
`

const Sender = styled.div`
  font-size: 0.8rem;
  font-weight: bold;
  margin-bottom: 0.25em;
  color: ${(props) => (props.isMine ? '#cbd5e1' : '#555')};
  text-align: ${(props) => (props.isMine ? 'right' : 'left')};
`

const Text = styled.div`
  font-size: 1rem;
`

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  background: #ffffff;
  border-top: 1px solid #e5e7eb;
  padding: 0.5em;
  position: sticky;
  bottom: 0;
`

const Input = styled.input`
  flex: 1;
  padding: 0.75em;
  font-size: 1rem;
  border: none;
  outline: none;
  border-radius: 10px;
  margin-right: 0.5em;
  background-color: #f3f4f6;
`

const SendButton = styled.button`
  padding: 0.75em 1.5em;
  background-color: #3b82f6;
  color: #ffffff;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2563eb;
  }
`
