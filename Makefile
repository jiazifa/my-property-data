
DATABASE_URI := sqlite://report.sqlite

clean:
	@echo "清理项目"
	@cargo clean

run: 
	@echo "将安装 sqlx-cli"
	@cargo install sqlx-cli --features sqlite
	sqlx database create --database-url ${DATABASE_URI}
	# sqlx migrate run --database-url ${DATABASE_URI}
	@echo "数据库脚本执行完成"
