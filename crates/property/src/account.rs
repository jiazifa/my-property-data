use entity::{
    user::{CancellationUser, FindUserById, Gender, InsertUser, Model, UpdateUser},
    DBConnection, EntityError,
};
use uuid::Uuid;

use crate::{ErrorType, PropertyError};

#[derive(Debug)]
pub struct AccountCoordinator {
    user: Model,
}

impl AccountCoordinator {
    pub fn new(user: Model) -> Self {
        Self { user }
    }

    pub async fn create_user(
        name: String,
        is_male: Option<bool>,
        email: Option<String>,
        phone: Option<String>,
        icon: Option<String>,
        db: &DBConnection,
    ) -> Result<Self, EntityError> {
        let gender = match is_male {
            Some(true) => Some(Gender::Male),
            Some(false) => Some(Gender::Female),
            None => None,
        };
        let uuid = Uuid::new_v4().to_string();
        let user = InsertUser::new(uuid, name, gender, email, phone, icon);
        let u = user.execute(db).await?;
        return Ok(AccountCoordinator::new(u));
    }

    pub async fn find_user_by_id(uid: i32, db: &DBConnection) -> Result<Self, ErrorType> {
        let user = FindUserById::new(uid).execute(db).await?;
        if let Some(u) = user {
            return Ok(AccountCoordinator::new(u));
        }
        return Err(ErrorType::DbError(error_code::DBError::RecordNotFound(
            "Not Found user with uid: {uid}".to_string(),
        )));
    }

    // pub async fn find_user_by_name(name: String, db: &DBConnection) -> Result<Self, EntityError> {}

    pub async fn update_user(
        &self,
        uid: i32,
        name: Option<String>,
        is_male: Option<bool>,
        email: Option<String>,
        phone: Option<String>,
        icon: Option<String>,
        db: &DBConnection,
    ) -> Result<Model, PropertyError> {
        let gender = match is_male {
            Some(true) => Some(Gender::Male),
            Some(false) => Some(Gender::Female),
            None => None,
        };
        let origin = AccountCoordinator::find_user_by_id(uid, db).await?.user;
        let updated = UpdateUser::new(name, gender, email, phone, icon);
        let u = updated.execute(origin, db).await?;
        return Ok(u);
    }

    pub async fn cancellation(&self, db: &DBConnection) -> Result<bool, EntityError> {
        CancellationUser::new(self.user.id).execute(db).await
    }
}
