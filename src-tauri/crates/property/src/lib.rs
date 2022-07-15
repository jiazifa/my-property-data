use migration::{Migrator, MigratorTrait};
use thiserror::Error;

pub mod account;
pub mod budget;
pub mod flow;

use account::AccountCoordinator;
use entity::{DBConnection, EntityError};

pub type ErrorType = PropertyError;
type Result<T> = std::result::Result<T, ErrorType>;

#[derive(Debug, Error)]
pub enum PropertyError {
    #[error("Found DbError: {0}")]
    DbError(error_code::DBError),

    #[error("Auth Error: {0}")]
    AuthError(error_code::Auth),

    #[error("Not Found: {0}")]
    NotFound(String),
}

impl From<EntityError> for PropertyError {
    fn from(e: EntityError) -> Self {
        match e {
            EntityError::DbError(info) => Self::DbError(info),
        }
    }
}

pub struct App<'a> {
    setting_path: Option<String>,
    pub connection: &'a DBConnection,
    pub account: Option<AccountCoordinator>,
}

impl App<'_> {
    pub fn new(connection: &DBConnection, setting_path: Option<String>) -> App {
        return App {
            connection: connection,
            setting_path,
            account: None,
        };
    }
}

// user
impl App<'_> {
    pub async fn login(&mut self, name: String) -> Result<bool> {
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

    pub async fn update_migrator(&self) {
        _ = Migrator::up(&self.connection, None).await;
    }
}

#[cfg(test)]
pub struct TestApp {
    setting_path: Option<String>,
    pub connection: DBConnection,
    pub account: Option<AccountCoordinator>,
}

#[cfg(test)]
impl TestApp {
    pub fn new(
        setting_path: Option<String>,
        connection: DBConnection,
        account: Option<AccountCoordinator>,
    ) -> Self {
        Self {
            setting_path,
            connection,
            account,
        }
    }
}
