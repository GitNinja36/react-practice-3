import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useRef hook -> for giving the effect of copied part 
  
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback( ()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "@#$^&*+~-_"

    for(let i=1; i<= length; i++){
      let Char = Math.floor(Math.random()*str.length + 1);
      pass += str.charAt(Char);
    }

    setPassword(pass);

  }, [length, numberAllowed, charAllowed]);


  //useCallback hook memorise the function

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()                     //for getting effect of copy in window
    window.navigator.clipboard.writeText(password)    //for getting the value from window for copy the object
  }, [password])


  //when ever the page reload this function reload or else when ever the dependense variable get effected then this function will get reload

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator] );

  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-lg rounded-xl pt-10 px-3 py-3 my-8 bg-gray-700 text-purple-600'> 
    <h1 className='text-4xl text-center text-white pb-8' >Password generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
              type="text" 
              value={password}
              className='outline-none w-full py-1 px-3'
              placeholder='password'
              readOnly
              ref={passwordRef}
          />
          <button 
            onClick={copyPasswordToClipboard}
            className='outline-none py-0.5 px-3 shrink-0 bg-blue-600 text-white hover:bg-blue-500'
          >
            copy
          </button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
              type="range" 
              min={0}
              max={15}
              value={length}
              className='cursor-pointer'
              onChange={(e)=>{setLength(e.target.value)}}
            />
            <label style={{color: "orange"}} >Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1 pl-2'>
            <input 
              type="checkbox" 
              defaultChecked = {numberAllowed}
              id='numberInput'
              onChange={()=>{
                setNumberAllowed((prev) => !(prev));
              }}
            />
            <label htmlFor="numberInput" style={{color: "orange"}} >Numbers</label>
          </div>
          <div className='flex items-center gap-x-1 pl-2'>
            <input 
              type="checkbox" 
              defaultChecked = {charAllowed}
              id='charInput'
              onChange={()=>{
                setCharAllowed((prev) => !(prev));
              }}
            />
            <label htmlFor="charInput" style={{color: "orange"}} >Charater</label>
          </div>
        </div>
    </div>
    </>
  )
}

export default App
