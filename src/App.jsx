import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';

function App() {

  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const PasswordGenerator = useCallback(() => {
    
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numAllowed) 
      str += "0123456789";
    if(charAllowed) 
      str += "!@#$%^&*`~.,;:/|";
    for (let i = 0; i < length; i++) {
      let charIndex = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(charIndex);
    }

    setPassword(pass);

  },[length, numAllowed, charAllowed])

  useEffect(() => {
    PasswordGenerator();
  },[length, numAllowed, charAllowed, PasswordGenerator])

  const passref = useRef(null);

  const CopyToClipboard = () => {
    passref.current?.select();
    window.navigator.clipboard.writeText(password);
  }

  return (
    <>
      <div className="bg-gray-800 w-full mx-auto my-60 px-7 py-4 rounded-2xl max-w-xl text-orange-600">
        <h1 className='text-center text-white font-bold text-2xl'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden my-5'>
          <input className='py-1 px-3 outline-none w-full' value={password} readOnly type="text" placeholder='Password' ref={passref}/>
          <button className='bg-blue-500 text-white px-3 py-1' onClick={CopyToClipboard}>Copy</button>
        </div>
        <div className='flex gap-x-8'>
          <div className='flex gap-x-2'>
            <input className='cursor-pointer' type='range' value={length} min={0} max={100} onChange={(e) => setLength(e.target.value)}/>
            <label>Length : {length}</label>
          </div>
          <div className='flex gap-x-2'>
            <input className='cursor-pointer' type='checkbox' defaultChecked={numAllowed} onChange={() => setNumAllowed(prev => !prev)}/>
            <label>Numbers</label>
          </div>
          <div className='flex gap-x-2'>
            <input className='cursor-pointer' type='checkbox' defaultChecked={charAllowed} onChange={() => setCharAllowed(prev => !prev)}/>
            <label>Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
