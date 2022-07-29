use chrono::{Local, TimeZone};
use entity::{budget::Model as BudgetMeta, DBConnection};

use tauri::Manager;

// Budget
#[tauri::command]
pub async fn add_budget(
    app: tauri::AppHandle,
    title: String,
    money: i64,
    remark: Option<String>,
    limit_start: i64,
    limit_end: i64,
) -> Result<BudgetMeta, String> {
    let db_state = app.state::<DBConnection>();
    let db = db_state.inner();
    let start = Local.timestamp_millis(limit_start);
    let end = Local.timestamp_millis(limit_end);
    let new_data = entity::budget::InsertBudget::new(title, money as i32, remark, end, start);
    println!("{:?}", new_data);
    match new_data.execute(db).await {
        Ok(u) => Ok(u),
        Err(e) => {
            println!("{:?}", e);
            return Err("插入数据失败".to_string());
        }
    }
}

#[tauri::command]
pub async fn load_all_budget(app: tauri::AppHandle) -> Vec<BudgetMeta> {
    let db_state = app.state::<DBConnection>();
    let db = db_state.inner();
    match entity::budget::FindAllBudget::execute(db).await {
        Ok(users) => users,
        Err(_) => Vec::new(),
    }
}
