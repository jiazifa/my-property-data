pub mod account;
pub mod budget;

use entity::DBConnection;

pub struct App {
    settingPath: Option<String>,
    pub connection: DBConnection,
}

impl App {
    pub fn new(connection: DBConnection) -> App {
        App {
            connection: connection,
            settingPath: None,
        }
    }
}
