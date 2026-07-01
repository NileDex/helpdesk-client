import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './auth/firebase'
import Login from './auth/Login'
import ChatCard from './components/ChatCard'
import './App.css'

export default function App() {
  const [user, setUser]       = useState(undefined) // undefined = loading
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f0f4ff]">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) return <Login />

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f4ff]">
      <ChatCard user={user} />
    </div>
  )
}
