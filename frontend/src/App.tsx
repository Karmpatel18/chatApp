import './App.css'
import { useRef, useState } from 'react'
function App() {
  const [ input , setInput ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null)
  function handleSummit() {
    const i  = inputRef.current?.value
    if(i){
      setInput(i);
    }else{
      return
    }
    
  }

  const socket = new WebSocket('ws://localhost:8080');
  socket.onopen = function (event) {
    console.log('WebSocket connection opened:', event);
    // You can now send messages
    socket.send(input);
  };

  // Event listener for incoming messages from the server
  socket.onmessage = function (event) {
    console.log('Message from server:', event.data);
  };

  // Event listener for when the connection is closed
  socket.onclose = function (event) {
    console.log('WebSocket connection closed:', event);
  };

  // Event listener for errors
  socket.onerror = function (error) {
    console.error('WebSocket error:', error);
  };
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
