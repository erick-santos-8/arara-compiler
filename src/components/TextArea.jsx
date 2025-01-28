import React, { useEffect, useState } from 'react';
import Scanner from '../compilation/lexing/Scanner';

const TextArea = () => {
  const [writtenCode, setWrittenCode] = useState("");

  useEffect(() => {
    console.log(writtenCode);
  }, [writtenCode]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Passando o objeto esperado para o Scanner
    const result = Scanner({ writtenCode });

    if (result.errors.length > 0) { // Corrigido "lenght" para "length"
      console.log("Erros:");
      console.log(result.errors);
    } else {
      console.log("Análise léxica:");
      console.log(result.writtenCodeList);
    }
  };

  return (
    <div className="h-[640px] w-[1266px] flex items-center justify-center">
      <form className="flex-col w-full h-full p-2 gap-5" onSubmit={handleSubmit}>
        <textarea
          onChange={(e) => setWrittenCode(e.target.value)}
          className="bg-zinc-800 text-white w-full h-3/4 font-mono my-1"
        />
        <button
          type="submit"
          className="bg-red-500 my-1 rounded-md p-2 border border-red-200 cursor-pointer"
        >
          Testar
        </button>
      </form>
    </div>
  );
};

export default TextArea;

