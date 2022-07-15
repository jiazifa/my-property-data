#![cfg_attr(
    all(not(debug_assertions), target_os = "window&s"),
    windows_subsystem = "windows"
)]

use entity::DBConnection;
use migration::{Migrator, MigratorTrait};
use tauri::Manager;

pub struct App {
    pub setting_path: String,
    pub db: DBConnection,
}

impl App {
    pub fn new(setting_path: String, db: DBConnection) -> Self {
        Self { setting_path, db }
    }
}

#[tauri::command]
async fn setup_app(app: tauri::AppHandle) -> Result<String, String> {
    let r = app.manage(1);
    let path = app.path_resolver().resource_dir().unwrap();
    println!("managered, {:?}", path);

    return Ok("Ok".to_owned());
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            #[cfg(debug_assertions)] // only include this code on debug builds
            {
                // let window = app.get_window("main").unwrap();
                // window.open_devtools();
                // window.close_devtools();
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![setup_app])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
