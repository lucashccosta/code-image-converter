import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.group(() => {
    Route.get("/", "V1/ImageController.index").as("list");
    Route.post("/", "V1/ImageController.store").as("create");
    Route.get("/:uuid", "V1/ImageController.show").as("details");
  }).prefix("/images").as("images");
}).prefix("/api/v1");
