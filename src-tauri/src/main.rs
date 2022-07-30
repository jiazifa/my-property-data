#![cfg_attr(
    all(not(debug_assertions), target_os = "window&s"),
    windows_subsystem = "windows"
)]

mod budget_command;
mod tag_command;
mod user_command;

use std::str::FromStr;

use entity::Database;
use migration::{Migrator, MigratorTrait};
use tauri::Manager;

// User
#[tauri::command]
async fn setup_app(app: tauri::AppHandle) -> Result<String, String> {
    let mut path = app.path_resolver().resource_dir().unwrap();
    path.push("property.sqlite");
    if path.exists() == false {
        {
            if let Ok(_) = rusqlite::Connection::open(path.clone()) {
                println!("创建数据库成功");
            } else {
                println!("创建数据库失败");
            }
        }
    }
    let mut uri = String::new();
    if cfg!(target_os = "windows") {
        uri = format!("{}", path.to_string_lossy());
        let match_str = "\\\\?\\";
        if uri.starts_with(match_str) {
            if let Some(pref) = uri.strip_prefix(match_str) {
                uri = String::from_str(pref).unwrap();
            } else {
                uri = uri.replace(match_str, "");
            }
            uri = format!("sqlite:///{}", &uri);
        }
    } else {
        uri = format!("sqlite://{}", path.as_path().to_str().unwrap());
    }
    println!("准备连接数据库: {}", &uri);
    if let Ok(db) = Database::connect(uri).await {
        let _ = Migrator::up(&db, None).await;
        app.manage(db);
    } else {
        println!("初始化数据库失败")
    }
    return Ok("Ok".to_owned());
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            // #[cfg(debug_assertions)] // only include this code on debug builds
            // {
            //     let window = app.get_window("main").unwrap();
            //     window.open_devtools();
            //     window.close_devtools();
            // }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            setup_app,
            user_command::add_user,
            user_command::load_all_user,
            tag_command::add_tag,
            tag_command::load_all_tag,
            budget_command::add_budget,
            budget_command::load_all_budget,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
