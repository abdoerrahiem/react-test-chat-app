import React, { createContext, useContext, useEffect, useState } from 'react'
import Pusher from 'pusher-js'

const ChatContext = createContext()

export const useChatContext = () => useContext(ChatContext)

export const ChatProvider = ({ children }) => {
  const [pusher] = useState(
    () => new Pusher('7ab595c029964af251c4', { cluster: 'ap1' })
  )

  useEffect(() => {
    return () => {
      pusher.disconnect()
    }
  }, [pusher])

  return <ChatContext.Provider value={pusher}>{children}</ChatContext.Provider>
}
