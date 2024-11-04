import GlobalStyle from './GlobalStyle'
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
import Home from './pages/Home'
import ChatPage from './pages/ChatPage'
import { ChatProvider } from './context/ChatContext'

const App = () => (
  <Router>
    <GlobalStyle />
    <ChatProvider>
      <ErrorBoundary>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/chat' element={<ChatPage />} />
        </Routes>
      </ErrorBoundary>
    </ChatProvider>
  </Router>
)

export default App
