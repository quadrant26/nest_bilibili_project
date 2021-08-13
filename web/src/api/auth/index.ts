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

export async function _register(user: ILogin) {
  return api({
    method: "POST",
    url: "/auth/regist",
    data: user,
  });
}

export async function _alter(user: ILogin) {
  return api({
    method: "POST",
    url: "/auth/alter",
    data: user,
  });
}
