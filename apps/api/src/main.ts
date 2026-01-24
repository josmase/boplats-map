import registerApartmentController from "./app/apartment.controller.ts";
import { ApartmentService } from "./app/apartment.service.ts";
import { apartmentRepository } from "@boplats/apartment-repository";
import { ApartmentQueryHelper } from "./app/apartment-query.helper.ts";
import { mongooseModule } from "@boplats/mongoose";
import { requestLogMiddleware } from "./app/middleware/request-log.ts";

await mongooseModule.connect();

const apartmentService = new ApartmentService(
  apartmentRepository,
  new ApartmentQueryHelper(),
);

const handleRoutes = registerApartmentController(apartmentService);

const port = parseInt(process.env.PORT || "3000");

Bun.serve({
  port,
  async fetch(req: Request) {
    const start = performance.now();

    // Handle routes
    const response = await handleRoutes(req);

    // Log request
    const diff = performance.now() - start;
    requestLogMiddleware(req, response, diff);

    return response;
  },
});

console.info(`Listening on port ${port}`);
