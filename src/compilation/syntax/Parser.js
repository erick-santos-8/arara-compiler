class Parser {
    constructor(tokens) {
      this.tokens = tokens;
      this.current = 0;
    }
//Retorna o token atual  
    peek() {
      return this.tokens[this.current] || null;
    }
//Retorna o token avançado  
    advance() {
      return this.tokens[this.current++] || null;
    }
  
    match(expected) {
      if (this.peek() === expected) {
        this.advance();
        return true;
      }
      return false;
    }
//Função principal  
    parseProgram() {
      let ast = { type: "Program", body: [] };
      while (this.current < this.tokens.length) {
        let statement = this.parseStatement();
        if (statement) {
          ast.body.push(statement);
        } else {
          throw new Error(`Erro de sintaxe próximo a '${this.peek()}'`);
        }
      }
      return ast;
    }
//Verificador de declarações
    parseStatement() {
      if (this.match("inteiro") || this.match("real") || this.match("texto") || this.match("caractere") || this.match("logico")) {
        return this.parseDeclaration();
      } else if (this.match("se")) {
        return this.parseIfStatement();
      } else if (this.match("enquanto")) {
        return this.parseWhileStatement();
      } else if (this.match("escreva")) {
        return this.parsePrintStatement();
      } else {
        return this.parseExpressionStatement();
      }
    }
//Analisador de tipos  
    parseDeclaration() {
      let type = this.tokens[this.current - 1];
      let identifier = this.advance();
      if (!identifier.match(/^[a-zA-Z_][a-zA-Z0-9_]*$/)) {
        throw new Error(`Identificador inválido: ${identifier}`);
      }
      return { type: "Declaration", varType: type, name: identifier };
    }
  
    parseIfStatement() {
      if (!this.match("(")) throw new Error("Esperado '(' após 'se'");
      let condition = this.parseExpression();
      if (!this.match(")")) throw new Error("Esperado ')' após condição do 'se'");
      let body = this.parseBlock();
      return { type: "IfStatement", condition, body };
    }
  
    parseWhileStatement() {
      if (!this.match("(")) throw new Error("Esperado '(' após 'enquanto'");
      let condition = this.parseExpression();
      if (!this.match(")")) throw new Error("Esperado ')' após condição do 'enquanto'");
      let body = this.parseBlock();
      return { type: "WhileStatement", condition, body };
    }
  
    parsePrintStatement() {
      if (!this.match("(")) throw new Error("Esperado '(' após 'escreva'");
      let argument = this.parseComparison();
      if (!this.match(")")) throw new Error("Esperado ')' após argumento de 'escreva'");
      return { type: "PrintStatement", argument };
    }
  
    parseExpressionStatement() {
      let expr = this.parseComparison();
      return { type: "ExpressionStatement", expression: expr };
    }
  
    parseComparison() {
      let left = this.parseTerm();
      while (this.match("<") || this.match(">") || this.match("<=") || this.match(">=") || this.match("==") || this.match("!=")) {
        let operator = this.tokens[this.current - 1];
        let right = this.parseTerm();
        left = { type: "BinaryExpression", left, operator, right };
      }
      return left;
    }
  
    parseTerm() {
      let left = this.parseFactor();
      while (this.match("+") || this.match("-")) {
        let operator = this.tokens[this.current - 1];
        let right = this.parseFactor();
        left = { type: "BinaryExpression", left, operator, right };
      }
      return left;
    }
  
    parseFactor() {
      let left = this.parsePrimary();
      while (this.match("*") || this.match("/")) {
        let operator = this.tokens[this.current - 1];
        let right = this.parsePrimary();
        left = { type: "BinaryExpression", left, operator, right };
      }
      return left;
    }
  
    parsePrimary() {
      let token = this.advance();
      if (token.match(/^[0-9]+$/)) {
        return { type: "Literal", value: Number(token) };
      }
      if (token.match(/^[a-zA-Z_][a-zA-Z0-9_]*$/)) {
        return { type: "Identifier", name: token };
      }
      if (token === "(") {
        let expr = this.parseExpression();
        if (!this.match(")")) {
          throw new Error("Esperado ')' para fechar a expressão");
        }
        return expr;
      }
      throw new Error(`Token inesperado: ${token}`);
    }
  
    parseBlock() {
      if (!this.match("{")) throw new Error("Esperado '{' para início de bloco");
      let body = [];
      while (!this.match("}")) {
        body.push(this.parseStatement());
      }
      return body;
    }
  }
  
  export default Parser;
  