import api from "../index";

interface ILogin {
  phone: string;
  password: string;
}

export async function _login(user: ILogin) {
  return api({
    method: "POST",
    url: "/auth/login",
    data: user,
  });
}
