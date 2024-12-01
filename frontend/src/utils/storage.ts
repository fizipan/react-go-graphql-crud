import Cookies from "js-cookie";

export const Cookie = {
  setAccessToken(token: string) {
    const inOneDay = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    Cookies.set("token", token, {
      secure: true,
      sameSite: "lax",
      expires: inOneDay,
    });
  },
  getAccessToken() {
    return Cookies.get("token");
  },
  clearTokens() {
    Cookies.remove("token", {
      secure: true,
      sameSite: "lax",
    });
  },
};
