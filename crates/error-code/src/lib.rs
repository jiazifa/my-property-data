use thiserror::Error;

#[derive(Debug, Error, Clone, PartialEq, Eq)]
pub enum ErrorCode {
    #[error("Error when execute sql:: {0}")]
    DatabaseError(String),
}
