import type { ApartmentService } from "./apartment.service.ts";
import type { Router } from "@oak/oak/router";

export default function registerApartmentController(
  router: Router,
  apartmentService: ApartmentService,
) {
  return router
    .get("/apartments", async ({ request, response }) => {
      response.body = await apartmentService.getApartments(
        Object.fromEntries(request.url.searchParams),
      );
    });
}
