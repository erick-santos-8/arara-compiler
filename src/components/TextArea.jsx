import React, { useEffect, useState } from 'react'

const TextArea = () => {
  const [writtenCode, setwrittenCode] = useState("")

  useEffect(() => {
    console.log(writtenCode)
  }, [writtenCode])

  return (
    <div className='h-[640px] w-[1266px] flex items-center justify-center '>
      <form className='flex-col w-full h-full p-2 gap-5'>
        <textarea onChange={(e) => setwrittenCode(e.target.value)} className='bg-zinc-800 text-white w-full h-3/4 font-mono my-1' />
        <button type='submit' className='bg-red-500 my-1 rounded-md p-2 border border-red-200'>Testar</button>
      </form>
    </div>
  )
}

export default TextArea
