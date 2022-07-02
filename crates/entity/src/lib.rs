pub mod budget;
pub mod flow;
pub mod tag;
pub mod user;

pub type DBConnection = sea_orm::DatabaseConnection;
pub type ErrorType = sea_orm::DbErr;
pub type Result<T> = std::result::Result<T, ErrorType>;
