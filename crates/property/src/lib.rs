use entity::user::Model;
use sea_orm::DatabaseConnection;
use serde::{Deserialize, Serialize};

pub struct App {
    settingPath: Option<String>,
    connection: DatabaseConnection,
}

impl App {
    pub fn new(connection: DatabaseConnection) -> App {
        App {
            connection: connection,
            settingPath: None,
        }
    }
}
