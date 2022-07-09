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
    #[error("DbError: {0}")]
    DbError(error_code::DBError),
}

impl From<sea_orm::DbErr> for EntityError {
    fn from(db_error: sea_orm::DbErr) -> Self {
        match db_error {
            sea_orm::DbErr::Conn(info) => EntityError::DbError(error_code::DBError::Connect(info)),
            sea_orm::DbErr::Exec(info) => EntityError::DbError(error_code::DBError::Execute(info)),
            sea_orm::DbErr::Query(info) => EntityError::DbError(error_code::DBError::Execute(info)),
            sea_orm::DbErr::RecordNotFound(info) => {
                EntityError::DbError(error_code::DBError::RecordNotFound(info))
            }
            sea_orm::DbErr::Custom(info) => {
                EntityError::DbError(error_code::DBError::Unknown(info))
            }
            sea_orm::DbErr::Type(info) => EntityError::DbError(error_code::DBError::Unknown(info)),
            sea_orm::DbErr::Json(info) => EntityError::DbError(error_code::DBError::Unknown(info)),
            sea_orm::DbErr::Migration(info) => {
                EntityError::DbError(error_code::DBError::Unknown(info))
            }
        }
    }
}
