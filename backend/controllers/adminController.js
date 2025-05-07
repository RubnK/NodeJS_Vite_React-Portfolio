import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

export async function loginAdmin(req, res) {
  const { password } = req.body;
  const hash = process.env.ADMIN_PASSWORD_HASH;

  if (!hash) {
    return res.status(500).json({ error: "Mot de passe non configuré" });
  }

  const isValid = await bcrypt.compare(password, hash);
  if (!isValid) {
    return res.status(401).json({ error: "Mot de passe incorrect" });
  }

  return res.status(200).json({ message: "Connexion réussie" });
}
