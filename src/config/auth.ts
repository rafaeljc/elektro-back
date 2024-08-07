import crypto from "crypto";

const geraHashSalt = (senha: string) => {
  const salt = crypto.randomBytes(32).toString("hex");
  const hash = crypto.pbkdf2Sync(senha, salt, 10000, 64, "sha512").toString("hex");
  return { hash: hash, salt: salt };
}

export default geraHashSalt;
