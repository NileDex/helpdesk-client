import { useState, useRef, useEffect } from 'react'
import { processMessage } from '../services/chatService'
import MessageContent from './MessageContent'
import SuggestedReplies from './SuggestedReplies'
import QuestionDictionary from './QuestionDictionary'

const BOT_NAME = 'UniHelp'

function now() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const INITIAL_MESSAGES = [
  {
    id: 1,
    from: 'bot',
    text:
      `Hello! I'm **UniHelp**, your Rivers State University student assistant.\n\n` +
      `I can help you with admissions, fees, exams, results, hostel, library, scholarships, and more.\n\n` +
      `How can I assist you today?`,
    time: now(),
  },
]

const INITIAL_SUGGESTIONS = [
  'What are the admission requirements?',
  'How do I pay my school fees?',
  'Tell me about scholarships',
]

export default function ChatCard() {
  const [messages, setMessages]       = useState(INITIAL_MESSAGES)
  const [input, setInput]             = useState('')
  const [isTyping, setIsTyping]       = useState(false)
  const [suggestions, setSuggestions] = useState(INITIAL_SUGGESTIONS)
  const [activeTab, setActiveTab]     = useState('chat')
  const bottomRef = useRef(null)

  useEffect(() => {
    if (activeTab === 'chat') {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isTyping, activeTab])

  async function sendMessageText(text) {
    const trimmed = text.trim()
    if (!trimmed || isTyping) return

    setActiveTab('chat')
    setSuggestions([])
    setMessages(prev => [...prev, { id: Date.now(), from: 'user', text: trimmed, time: now() }])
    setIsTyping(true)

    try {
      const { response, suggestions: newSugs } = await processMessage(trimmed)
      setMessages(prev => [...prev, { id: Date.now() + 1, from: 'bot', text: response, time: now() }])
      setSuggestions(newSugs ?? [])
    } catch {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        from: 'bot',
        text: 'Something went wrong. Please try again.',
        time: now(),
      }])
    } finally {
      setIsTyping(false)
    }
  }

  function handleSend() {
    sendMessageText(input)
    setInput('')
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const tabClass = (tab) =>
    `flex-1 py-2.5 text-[12.5px] font-medium border-b-2 transition-colors ` +
    (activeTab === tab
      ? 'text-indigo-500 border-indigo-500 bg-white'
      : 'text-gray-400 border-transparent hover:text-indigo-400 bg-gray-50')

  return (
    <div className="w-[440px] max-w-[calc(100vw-32px)] h-[620px] bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden">

      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 bg-indigo-500 text-white flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-[11px] font-bold flex-shrink-0">
          RSU
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-[15px] font-semibold">{BOT_NAME}</span>
          <span className="text-xs opacity-80 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
            {isTyping ? 'Typing...' : 'Online'}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-100 flex-shrink-0">
        <button className={tabClass('chat')} onClick={() => setActiveTab('chat')}>
          Chat
        </button>
        <button className={tabClass('questions')} onClick={() => setActiveTab('questions')}>
          Question Dictionary
        </button>
      </div>

      {/* Chat view */}
      {activeTab === 'chat' && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3.5 chat-scroll">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex items-end gap-2 ${msg.from === 'user' ? 'flex-row-reverse' : ''}`}
              >
                {msg.from === 'bot' && (
                  <div className="w-7 h-7 rounded-full bg-indigo-50 flex items-center justify-center text-[8px] font-bold text-indigo-500 flex-shrink-0">
                    RSU
                  </div>
                )}
                <div className={`flex flex-col gap-0.5 max-w-[74%] ${msg.from === 'user' ? 'items-end' : ''}`}>
                  <div className={`px-3.5 py-2.5 text-[13.5px] leading-relaxed break-words rounded-2xl ${
                    msg.from === 'bot'
                      ? 'bg-gray-100 text-gray-900 rounded-bl-sm'
                      : 'bg-indigo-500 text-white rounded-br-sm'
                  }`}>
                    {msg.from === 'bot' ? <MessageContent text={msg.text} /> : msg.text}
                  </div>
                  <span className="text-[10px] text-gray-300 px-1">{msg.time}</span>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex items-end gap-2">
                <div className="w-7 h-7 rounded-full bg-indigo-50 flex items-center justify-center text-[8px] font-bold text-indigo-500 flex-shrink-0">
                  RSU
                </div>
                <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-typing [animation-delay:0ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-typing [animation-delay:180ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-typing [animation-delay:360ms]" />
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Suggested replies */}
          {!isTyping && (
            <SuggestedReplies suggestions={suggestions} onSelect={sendMessageText} />
          )}

          {/* Input */}
          <div className="flex items-center gap-2.5 px-3.5 py-3 border-t border-gray-100 flex-shrink-0">
            <textarea
              rows={1}
              placeholder="Ask me anything about university..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              disabled={isTyping}
              className="flex-1 resize-none border border-gray-200 rounded-xl px-3.5 py-2.5 text-[13.5px] font-[inherit] leading-relaxed outline-none text-gray-900 bg-gray-50 focus:border-indigo-500 focus:bg-white transition-colors placeholder:text-gray-300 disabled:opacity-60"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="px-4 h-10 rounded-xl bg-indigo-500 hover:bg-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed text-white text-[13px] font-semibold flex-shrink-0 transition-colors"
            >
              Send
            </button>
          </div>
        </>
      )}

      {/* Question Dictionary view */}
      {activeTab === 'questions' && (
        <QuestionDictionary onSelect={sendMessageText} />
      )}
    </div>
  )
}
