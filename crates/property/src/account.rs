use entity::{
    user::{CancellationUser, FindUser, Gender, InsertUser, Model, UpdateUser},
    DBConnection, EntityError,
};
use uuid::Uuid;

pub struct AccountCoordinator {}

impl AccountCoordinator {
    pub fn new() -> Self {
        Self {}
    }

    pub async fn create_user(
        name: String,
        is_male: Option<bool>,
        email: Option<String>,
        phone: Option<String>,
        icon: Option<String>,
        db: &DBConnection,
    ) -> Result<Model, EntityError> {
        let gender = match is_male {
            Some(true) => Some(Gender::Male),
            Some(false) => Some(Gender::Female),
            None => None,
        };
        let uuid = Uuid::new_v4().to_string();
        let user = InsertUser::new(uuid, name, gender, email, phone, icon);
        user.execute(db).await
    }

    pub async fn find_user(&self, uid: i32, db: &DBConnection) -> Result<Model, EntityError> {
        let user = FindUser::new(uid).execute(db).await?;
        if let Some(u) = user {
            return Ok(u);
        }
        return Err(EntityError::RecordNotFound(
            "Not Found user with uid: {uid}".to_string(),
        ));
    }

    pub async fn update_user(
        &self,
        uid: i32,
        name: String,
        is_male: Option<bool>,
        email: Option<String>,
        phone: Option<String>,
        icon: Option<String>,
        db: &DBConnection,
    ) -> Result<Model, EntityError> {
        let gender = match is_male {
            Some(true) => Some(Gender::Male),
            Some(false) => Some(Gender::Female),
            None => None,
        };
        let origin = self.find_user(uid, db).await?;
        let updated = UpdateUser::new(Some(name), gender, email, phone, icon);
        updated.execute(origin, db).await
    }

    pub async fn cancellation(&self, uid: i32, db: &DBConnection) -> Result<bool, EntityError> {
        CancellationUser::new(uid).execute(db).await
    }
}
