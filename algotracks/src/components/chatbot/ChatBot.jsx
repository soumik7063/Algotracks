import { useState, useRef, useEffect } from 'react'
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
const ChatBot = () => {
    const [visible, setVisible] = useState(false)
    const [messages, setMessages] = useState([])
    const [currentText, setCurrentText] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handelMyResponse = (e) => {
        e.preventDefault()
        if (!currentText.trim()) return

        const userMessage = {
            id: Date.now(),
            text: currentText,
            sender: 'user',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
        
        setMessages(prev => [...prev, userMessage])
        const messageToSend = currentText
        setCurrentText('')
        fetchAIresponse(messageToSend)
    }

    const fetchAIresponse = async (messageText) => {
        try {
            setLoading(true)
            setError('')
            
            const response = await fetch(`${import.meta.env.VITE_API_URL}/aichat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: messageText })
            })
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            
            const data = await response.json()
            
            if (data && data.reply) {
                const aiMessage = {
                    id: Date.now() + 1,
                    text: data.reply,
                    sender: 'ai',
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }
                setMessages(prev => [...prev, aiMessage])
            }
        } catch (error) {
            console.error('Error fetching AI response:', error)
            setError('Failed to get AI response. Please try again.')
            
            // Add error message to chat
            const errorMessage = {
                id: Date.now() + 1,
                text: 'Sorry, I encountered an error. Please try again.',
                sender: 'ai',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                isError: true
            }
            setMessages(prev => [...prev, errorMessage])
        } finally {
            setLoading(false)
        }
    }

    const clearChat = () => {
        setMessages([])
        setError('')
    }

    return (
        <div>
            {/* Chat Window */}
            <section className={`flex flex-col rounded-2xl h-[500px] w-[350px] ${visible ? 'visible' : 'hidden'} bg-white border fixed bottom-20 right-10 transition-all ease-in-out duration-500 shadow-lg`}>
                
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b bg-gray-900 text-white rounded-t-2xl">
                    <h3 className="font-semibold">AlgoTracks AI</h3>
                    <div className="flex gap-2">
                        <button 
                            onClick={clearChat}
                            className="text-white hover:bg-gray-700 px-2 py-1 rounded text-sm"
                            title="Clear chat"
                        >
                            🗑️
                        </button>
                        <button 
                            onClick={() => setVisible(false)} 
                            className="text-white hover:bg-gray-700 px-2 py-1 rounded"
                        >
                            ❌
                        </button>
                    </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {messages.length === 0 ? (
                        <div className="text-center text-gray-500 mt-8">
                            <p>👋 Hello! I'm your AI assistant.</p>
                            <p className="text-sm mt-2">Ask any coding related issuse !</p>
                        </div>
                    ) : (
                        messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[80%] p-3 rounded-2xl ${
                                        message.sender === 'user'
                                            ? 'bg-blue-600 text-white rounded-br-sm'
                                            : message.isError
                                            ? 'bg-red-100 text-red-800 rounded-bl-sm'
                                            : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                                    }`}
                                >
                                    <p p className="text-sm whitespace-pre-wrap">{message.text}</p>
                                    <p className={`text-xs mt-1 ${
                                        message.sender === 'user' 
                                            ? 'text-blue-200' 
                                            : 'text-gray-500'
                                    }`}>
                                        {message.timestamp}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                    
                    {/* Loading indicator */}
                    {loading && (
                        <div className="flex justify-start">
                            <div className="bg-gray-100 p-3 rounded-2xl rounded-bl-sm">
                                <div className="flex space-x-1">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    <div ref={messagesEndRef} />
                </div>

                {/* Error display */}
                {error && (
                    <div className="px-4 py-2 bg-red-50 border-t border-red-200">
                        <p className="text-red-600 text-sm">{error}</p>
                    </div>
                )}

                {/* Input Area */}
                <div className="p-4 border-t bg-gray-50 rounded-b-2xl">
                    <div className="flex gap-2">
                        <input
                            className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                            value={currentText}
                            onChange={(e) => setCurrentText(e.target.value)}
                            placeholder="Type your message..."
                            type="text"
                            disabled={loading}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter' && !loading && currentText.trim()) {
                                    handelMyResponse(e)
                                }
                            }}
                        />
                        <button
                            onClick={handelMyResponse}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            disabled={loading || !currentText.trim()}
                        >
                            {loading ? '⏳' : '➤'}
                        </button>
                    </div>
                    <p className='text-center text-[10px] text-gray-500'>Algotracks AI can make mistakes, so double-check it</p>
                </div>
            </section>

            {/* Toggle Button */}
            <button
                className="border p-3 bottom-5 right-5  bg-gradient-to-l from-[#833AB4] via-[#FD1D1D] to-[#FCB045] hover:bg-blue-700 text-white rounded-full fixed shadow-lg transition-colors"
                onClick={() => setVisible(prev => !prev)}
            >
                💬 Chat
            </button>
        </div>
    )
}

export default ChatBot