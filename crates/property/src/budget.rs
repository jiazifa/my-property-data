use entity::{
    budget::{InsertBudget, Model, RemoveBudget, UpdateBudget},
    DBConnection, EntityError,
};

pub struct BudgetCoordinator {}

impl BudgetCoordinator {
    async fn create_budget(insert: InsertBudget, db: &DBConnection) -> Result<Model, EntityError> {
        insert.execute(db).await
    }

    async fn update(
        updated: UpdateBudget,
        origin: Model,
        db: &DBConnection,
    ) -> Result<Model, EntityError> {
        updated.execute(origin, db).await
    }

    async fn remove(removed: RemoveBudget, db: &DBConnection) -> Result<bool, EntityError> {
        removed.execute(db).await
    }
}
