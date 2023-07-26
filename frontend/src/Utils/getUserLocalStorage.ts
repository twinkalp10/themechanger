import { User } from "../type";

export const getUserLocalStorage = (): User | undefined => {
  try {
    const user = localStorage.getItem("user");
    if (user) return JSON.parse(user);
  }
  catch (error) {
    return undefined
  }

}
