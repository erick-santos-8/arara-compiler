const words = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789-.';
const declaration = '+=-/*|.,(){}[]';
const comparation = '=<!>';
const boolWords = '&|';

const Scanner = ({ writtenCode }) => {
  let errors = [];
  let writtenCodeList = [];

  if (writtenCode && writtenCode.trim()) {
    for (const c of writtenCode) { // Corrigido para iterar pelos caracteres
      if (
        words.includes(c) ||
        numbers.includes(c) ||
        declaration.includes(c) ||
        comparation.includes(c) ||
        boolWords.includes(c) ||
        c === " " ||
        c === "\n"
      ) {
        continue;
      } else {
        errors.push(`Caractere inválido: '${c}'`);
        break;
      }
    }

    if (errors.length === 0) {
      // Melhorando a regex para capturar tokens de forma mais robusta
      writtenCodeList = writtenCode
        .split(/(\s+|==|>>|<<|<=|>=|!=|[\(\)\{\}\[\]\.\=\+\-\*\/\<\>])/)
        .filter((token) => token.trim()); // Remove espaços em branco e tokens vazios
      return { writtenCodeList, errors };
    }
  } else {
    errors.push("Código vazio ou apenas espaços.");
  }

  return { writtenCodeList, errors };
};

export default Scanner;

