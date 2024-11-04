import React, { Suspense, lazy } from 'react'

const ChatRoom = lazy(() => import('./ChatRoom'))

const Chat = () => (
  <Suspense fallback={<div>Loading chat...</div>}>
    <ChatRoom />
  </Suspense>
)

export default Chat
