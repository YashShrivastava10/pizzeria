import { cookies } from "next/headers";

export const middleware = async (req, res) => {
  const token = req.cookies.get("token");

  const cookie = cookies();

  console.log(token);
  console.log(cookie.get("token"));
};
