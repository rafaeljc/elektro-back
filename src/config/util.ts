
const parseBoolean = (valor: string) => {
  if (valor.toLowerCase() == "true") return true;
  if (valor.toLowerCase() == "false") return false;
  throw new Error("Não foi possível converter o valor para booleano.");
}

const parseDate = (dataString: string) => {
  let data = new Date(dataString);
  if (data.toString() == "Invalid Date") return undefined;
  return data;
}

export default { parseBoolean, parseDate };
