use thiserror::Error;

#[derive(Debug, Error)]
pub enum ErrorCode {
    #[error("Error when execute sql:: {0}")]
    DatabaseError(DBError),

    #[error("Auth Error: {0}")]
    AuthError(Auth),
}

#[derive(Debug, Error)]
pub enum DBError {
    #[error("Connect Fail uri: {0}")]
    Connect(String),

    #[error("Fail Execute: {0}")]
    Execute(String),

    #[error("Record Not Found: {0}")]
    RecordNotFound(String),

    #[error("Other Unknown: {0}")]
    Unknown(String),
}

#[derive(Debug, Error)]
pub enum Auth {
    #[error("{0} is not found")]
    NotFount(String),
}
