#![cfg_attr(
    all(not(debug_assertions), target_os = "window&&s"),
    windows_subsystem = "windows"
)]

use std::path::PathBuf;

use entity::{
    user::{Gender, Model as UserMeta},
    DBConnection, Database,
};
use migration::{Migrator, MigratorTrait};
use tauri::{Manager, State};

pub struct Config {
    pub setting_path: PathBuf,
    pub db: DBConnection,
}

impl Config {
    pub fn new(setting_path: PathBuf, db: DBConnection) -> Self {
        Self { setting_path, db }
    }
}

#[tauri::command]
async fn setup_app(app: tauri::AppHandle) -> Result<String, String> {
    let mut path = app.path_resolver().resource_dir().unwrap();
    path.push("property.sqlite");
    if path.exists() == false {
        {
            if let Ok(_) = rusqlite::Connection::open(path.clone()) {
            } else {
                println!("创建数据路失败");
            }
        }
    }
    let uri = format!("sqlite://{}", path.as_path().to_str().unwrap());
    if let Ok(db) = Database::connect(uri).await {
        let _ = Migrator::up(&db, None).await;
        app.manage(db);
    } else {
        println!("初始化数据库失败")
    }
    return Ok("Ok".to_owned());
}

#[tauri::command]
async fn add_user<'r>(
    app: tauri::AppHandle,
    name: String,
    gender: i32,
    email: Option<String>,
    phone: Option<String>,
) -> Result<UserMeta, String> {
    let db_state = app.state::<DBConnection>();
    let db = db_state.inner();
    let uuid = uuid::Uuid::new_v4();
    let gender = match gender {
        1 => Gender::Male,
        2 => Gender::Female,
        _ => return Err("性别枚举只能是1/2".to_string()),
    };
    let new_user = entity::user::InsertUser::new(
        uuid.to_string(),
        name,
        Some(Gender::from(gender)),
        email,
        phone,
        None,
    );
    if let Ok(u) = new_user.execute(db).await {
        Ok(u)
    } else {
        return Err("插入数据失败".to_string());
    }
}

#[tauri::command]
async fn load_all_user(app: tauri::AppHandle) -> Vec<entity::user::Model> {
    let db_state = app.state::<DBConnection>();
    let db = db_state.inner();
    match entity::user::FindAllUsers::execute(db).await {
        Ok(users) => users,
        Err(_) => Vec::new(),
    }
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
        .invoke_handler(tauri::generate_handler![setup_app, add_user, load_all_user])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
