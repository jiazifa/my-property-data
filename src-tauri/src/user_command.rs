use entity::{
    user::{Gender, Model as UserMeta},
    DBConnection,
};
use tauri::Manager;

// User
#[tauri::command]
pub async fn add_user<'r>(
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
pub async fn load_all_user(app: tauri::AppHandle) -> Vec<UserMeta> {
    let db_state = app.state::<DBConnection>();
    let db = db_state.inner();
    match entity::user::FindAllUsers::execute(db).await {
        Ok(users) => users,
        Err(_) => Vec::new(),
    }
}
