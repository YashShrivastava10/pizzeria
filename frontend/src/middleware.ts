import { cookies } from "next/headers";

export const middleware = async (req, res) => {
  const cookieStore = cookies();
  console.log(cookieStore.get("token"));
};
