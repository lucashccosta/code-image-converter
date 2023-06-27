import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = "images";

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.uuid("uuid").unique().index().notNullable();
      table.enum("status", ["processing", "converted", "failed"]).defaultTo("processing");
      table.string("uploaded_file").nullable().defaultTo(null);
      table.string("converted_file").nullable().defaultTo(null);
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
