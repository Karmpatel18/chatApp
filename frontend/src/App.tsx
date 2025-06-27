import './App.css'
import { useRef, useState, useEffect } from 'react'
function App() {
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState();
  const inputRef = useRef<HTMLInputElement>(null)
  function handleSummit() {
    const i = inputRef.current?.value
    if (i) {
      setInput(i);
      socket.send(i)
    } else {
      return
    }

  }
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    //@ts-expect-error sdsfs
    setSocket(ws)
    
    ws.onmessage = function (event) {
      console.log('Message from server:', event.data);
    };

    
    ws.onclose = function (event) {
      console.log('WebSocket connection closed:', event);
    };

    
    ws.onerror = function (error) {
      console.error('WebSocket error:', error);
    };
  }, [input])

  return (
    <>
      hi there
      <br />
      <input type='text' ref={inputRef} placeholder='enter ping' />
      <br></br>
      <button onClick={handleSummit}>submit</button>
    </>
  )
}

export default App
