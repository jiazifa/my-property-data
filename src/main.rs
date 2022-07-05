use entity::{user::InsertUser, Database};
use property::{
    account::{self, AccountCoordinator},
    App,
};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    println!("Hello, world!");

    let uri = "sqlite://sqlite/test.sqlite".to_string();
    let connection = Database::connect(uri).await?;

    let app = App::new(connection);
    let coordinator = AccountCoordinator::new();
    let insert = InsertUser::new(
        "123123123123123123123123".to_string(),
        "Test".to_string(),
        None,
        None,
        None,
        None,
    );
    let result = coordinator.create_user(insert, &app.connection).await?;
    print!("inserted user : {result:?}");
    return Ok(());
}
