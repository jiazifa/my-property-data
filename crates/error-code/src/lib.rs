use thiserror::Error;

#[derive(Debug, Error)]
pub enum ErrorCode {
    #[error("Error when execute sql:: {0}")]
    DatabaseError(DBError),
}

#[derive(Debug, Error)]
pub enum DBError {
    #[error("Connect Fail uri: {0}")]
    Connect(String),

    #[error("Fail Execute: {0}")]
    Execute(String),

    #[error("Record Not Found: {0}")]
    RecordNotFound(String),
}
