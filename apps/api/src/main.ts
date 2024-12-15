import { Application, Router } from "@oak/oak";
import registerApartmentController from "./app/apartment.controller.ts";
import { ApartmentService } from "./app/apartment.service.ts";
import { apartmentRepository } from "@new-new-boplats/apartment-repository";
import { ApartmentQueryHelper } from "./app/apartment-query.helper.ts";
import { mongooseModule } from "@new-new-boplats/mongoose";

await mongooseModule.connect();

const app = new Application();
let router = new Router();

router = registerApartmentController(
  router,
  new ApartmentService(
    apartmentRepository,
    new ApartmentQueryHelper(),
  ),
);

app.use(router.routes());
app.use(router.allowedMethods());

const port = parseInt(Deno.env.get("PORT") || "3000");
console.info(`Listening on port ${port}`);
await app.listen({ port });
