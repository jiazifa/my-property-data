import { invoke } from "@tauri-apps/api";

async function setup_app() {
  return invoke("setup_app");
}

async function load_all_user() {
  return invoke("load_all_user");
}

async function add_user(
  name: string,
  gender: number,
  email: string,
  phone: string
) {
  const data = {
    name: name,
    gender: +gender,
    email: email,
    phone: phone,
  };
  return invoke("add_user", data);
}

export { setup_app, load_all_user, add_user };
