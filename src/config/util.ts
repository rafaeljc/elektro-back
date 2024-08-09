
const parseBoolean = (valor: string) => {
  if (valor.toLowerCase() == "true") return true;
  if (valor.toLowerCase() == "false") return false;
  throw new Error("Não foi possível converter o valor para booleano.");
}

export default parseBoolean;
