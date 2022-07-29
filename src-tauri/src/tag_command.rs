use entity::{tag::Model as TagMeta, DBConnection};
use tauri::Manager;

// Tag
#[tauri::command]
pub async fn add_tag<'r>(
    app: tauri::AppHandle,
    title: String,
    desc: Option<String>,
    remark: Option<String>,
) -> Result<TagMeta, String> {
    let db_state = app.state::<DBConnection>();
    let db = db_state.inner();

    let new_tag = entity::tag::InsertTag::new(title, desc, remark);
    match new_tag.execute(db).await {
        Ok(u) => Ok(u),
        Err(e) => {
            println!("{:?}", e);
            return Err("插入数据失败".to_string());
        }
    }
}

#[tauri::command]
pub async fn load_all_tag(app: tauri::AppHandle) -> Vec<TagMeta> {
    let db_state = app.state::<DBConnection>();
    let db = db_state.inner();
    match entity::tag::FindAllTag::execute(db).await {
        Ok(users) => users,
        Err(_) => Vec::new(),
    }
}
