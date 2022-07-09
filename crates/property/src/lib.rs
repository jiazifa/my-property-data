use thiserror::Error;

pub mod account;
pub mod budget;
pub mod flow;

use account::AccountCoordinator;
use entity::{DBConnection, EntityError};

#[derive(Debug, Error)]
pub enum PropertyError {
    #[error("Found DbError: {0}")]
    DbError(error_code::DBError),

    #[error("Auth Error: {0}")]
    AuthError(error_code::Auth),
}

impl From<EntityError> for PropertyError {
    fn from(e: EntityError) -> Self {
        match e {
            EntityError::DbError(info) => Self::DbError(info),
        }
    }
}

pub type ErrorType = PropertyError;

pub struct App {
    settingPath: Option<String>,
    pub connection: DBConnection,
    pub account: Option<AccountCoordinator>,
}

impl App {
    pub fn new(connection: DBConnection) -> App {
        App {
            connection: connection,
            settingPath: None,
            account: None,
        }
    }
}

impl App {
    pub async fn login(&mut self, name: String) -> Result<bool, ErrorType> {
        let user = entity::user::FindUserByName::new(name.clone())
            .execute(&self.connection)
            .await?;
        let user = match user {
            Some(u) => u,
            None => return Err(ErrorType::AuthError(error_code::Auth::NotFount(name))),
        };
        let coordinator = AccountCoordinator::new(user);
        self.account = Some(coordinator);
        return Ok(true);
    }
}
