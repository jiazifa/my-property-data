use entity::Database;
use property::{account::AccountCoordinator, App};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let connection = Database::connect("sqlite://sqlite/test.sqlite").await?;
    let mut app = App::new(&connection, None);
    app.update_migrator().await;
    let user = AccountCoordinator::create_user(
        "test".to_owned(),
        Some(true),
        Some("2332532718@qq.com".to_owned()),
        Some("18356289816".to_owned()),
        None,
        &app.connection,
    )
    .await?;
    println!("{:?} created", user.user.name);
    match app.login("test".to_owned()).await? {
        true => println!("登录成功"),
        false => println!("登录失败"),
    }

    return Ok(());
}
