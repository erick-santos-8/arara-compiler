const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '0123456789';
const mathLetters = '+-*/=';
const declaration = '.,(){}[]';
const dot = ';';
const logicalOperators = ['<', '>', '<=', '>=', '==', '!=', '||', '&&'];
const reservedWords = ['inteiro', 'real', 'texto', 'caractere', 'logico', 'se', 'senao', 'enquanto', 'para', 'escreva', 'leia'];

const Scanner = ({ writtenCode }) => {
  let errors = [];
  let writtenCodeList = [];

  if (writtenCode && writtenCode.trim()) {
    for (const c of writtenCode) {
      if (
        letters.includes(c) ||
        numbers.includes(c) ||
        mathLetters.includes(c) ||
        declaration.includes(c) ||
        dot.includes(c) ||
        c === " " ||
        c === "\n" ||
        logicalOperators.some(op => writtenCode.includes(op)) ||
        reservedWords.some(word => writtenCode.includes(word))
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

