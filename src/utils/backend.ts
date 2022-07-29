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

async function add_tag(title: string, desc?: string, remark?: string) {
  const data = {
    title: title,
    desc: desc,
    remark: remark,
  };
  return invoke("add_tag", data);
}

async function load_all_tag() {
  return invoke("load_all_tag");
}

async function add_budget(
  title: string,
  money: number,
  remark: string | undefined,
  limit_start: number,
  limit_end: number
) {
  const data = {
    title: title,
    money: money,
    remark: remark,
    limitStart: limit_start,
    limitEnd: limit_end,
  };
  console.log(`add_budget: ${JSON.stringify(data)}`);
  return invoke("add_budget", data);
}

async function load_all_budget() {
  return invoke("load_all_budget");
}

export {
  setup_app,
  load_all_user,
  add_user,
  add_tag,
  load_all_tag,
  add_budget,
  load_all_budget,
};
