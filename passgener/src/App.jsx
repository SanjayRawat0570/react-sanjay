import { useState, useCallback, useEffect, useRef } from 'react'
function App() {
  const [length, setlength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "fdhdkslapsjsjSAFSFDHuido"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*"
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)

    }
    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() =>  {
    passwordRef.current.select();
    passwordRef.current.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  },
  [password])
  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])


  return (
    <>

      <div className='w-full bg- max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
        <h>Password Generator</h>
      </div>
      <div className='className="flex shadow 
    rounded-lg overflow-hidden mb-4"' >
        <input
          type="text"
          value={password}
          className='outline-none py-1 px-3'
          placeholder='Password'
          readOnly
          ref={passwordRef}

        />
        <button onClick={copyPasswordToClipboard}
         className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>

      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => { setlength(e.target.value) }}
          />

          <label className='text-white'>length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            className='text-white'
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label
            className='text-white'

            htmlFor="numberInput" >Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            className='text-white'
            type="checkbox"
            defaultChecked={charAllowed}
            id="charInput"
            onChange={() => {
              setcharAllowed((prev) => !prev);
            }}
          />
          <label
            className='text-white'
            htmlFor="charInput" >Characters</label>
        </div>
      </div>
    </>
  )
}

export default App
