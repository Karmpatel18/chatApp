import './App.css'
import { useRef, useState, useEffect } from 'react'

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState<string[]>([]);

  const socketRef = useRef<WebSocket | null>(null); // ✅ useRef instead of state

  function handleSubmit() {
    const i = inputRef.current?.value;
    if (i && socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(i);
      setMessages((prev) => [...prev, `You: ${i}`]);
      inputRef.current.value = ""; // Clear input after send
    }
  }

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    socketRef.current = ws;

    ws.onopen = () => {
      console.log("WebSocket connected ✅");
    };

    ws.onmessage = (event) => {
      const newMessage = event.data;
      setMessages((prev) => [...prev, newMessage]);
    };

    ws.onclose = (event) => {
      console.log('WebSocket connection closed:', event);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // Cleanup on unmount
    return () => {
      ws.close();
    };
  }, []);

  return (
    <>
      <h2>Live Chat</h2>
      <input type='text' ref={inputRef} placeholder='Enter message...' />
      <br />
      <button onClick={handleSubmit}>Submit</button>

      <div style={{ marginTop: '1rem' }}>
        {messages.map((msg, idx) => (
          <div key={idx}>{msg}</div>
        ))}
      </div>
    </>
  );
}

export default App;
