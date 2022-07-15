use entity::budget::{InsertBudget, RemoveBudget, UpdateBudget};

use crate::{App, PropertyError, Result};

// Budget
impl App<'_> {
    pub async fn add_budget(
        &self,
        title: String,
        moneny: i32,
        remark: Option<String>,
        limit_start: chrono::DateTime<chrono::Local>,
        limit_end: chrono::DateTime<chrono::Local>,
    ) -> Result<entity::budget::Model> {
        let insert = InsertBudget::new(title, moneny, remark, limit_end, limit_start);
        let budget = insert.execute(self.connection).await?;
        return Ok(budget);
    }

    pub async fn update_budget(
        &self,
        origin_id: i32,
        title: Option<String>,
        moneny: Option<i32>,
        remark: Option<String>,
        limit_start: Option<chrono::DateTime<chrono::Local>>,
        limit_end: Option<chrono::DateTime<chrono::Local>>,
    ) -> Result<entity::budget::Model> {
        let origin = entity::budget::FindBudget::new(origin_id)
            .execute(&self.connection)
            .await?;
        match origin {
            None => {
                return Err(PropertyError::NotFound(
                    "Budget not found for uid: {origin_id}".to_owned(),
                ))
            }
            Some(o) => {
                let update = UpdateBudget::new(title, moneny, remark, limit_end, limit_start);
                let updated = update.execute(o, self.connection).await?;
                return Ok(updated);
            }
        }
    }

    pub async fn remove_budget(&self, uid: i32) -> Result<bool> {
        let removed = RemoveBudget::new(uid).execute(self.connection).await?;
        return Ok(removed);
    }

    pub async fn budget_flow(&self, uid: i32) -> Result<entity::flow::Model> {
        todo!()
    }
}
