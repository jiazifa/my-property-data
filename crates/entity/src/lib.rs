pub mod budget;
pub mod flow;
pub mod tag;
pub mod user;

use thiserror::Error;

pub use sea_orm::Database;
pub type DBConnection = sea_orm::DatabaseConnection;
pub type ErrorType = EntityError;
pub type Result<T> = std::result::Result<T, ErrorType>;

#[derive(Debug, Error)]
pub enum EntityError {
    #[error("Connect Fail uri: {0}")]
    Connect(String),

    #[error("Fail Execute: {0}")]
    Execute(String),

    #[error("Record Not Found: {0}")]
    RecordNotFound(String),

    #[error("other error: {0}")]
    Other(String),
}

impl From<sea_orm::DbErr> for EntityError {
    fn from(db_error: sea_orm::DbErr) -> Self {
        match db_error {
            sea_orm::DbErr::Conn(info) => EntityError::Connect(info),
            sea_orm::DbErr::Exec(info) => EntityError::Execute(info),
            sea_orm::DbErr::Query(info) => EntityError::Execute(info),
            sea_orm::DbErr::RecordNotFound(info) => EntityError::RecordNotFound(info),
            sea_orm::DbErr::Custom(info) => EntityError::Other(info),
            sea_orm::DbErr::Type(info) => EntityError::Other(info),
            sea_orm::DbErr::Json(info) => EntityError::Other(info),
            sea_orm::DbErr::Migration(info) => EntityError::Other(info),
        }
    }
}
