import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";

// TODO: Ensure that routes are correctly defined in app.routes.ts
// TODO: Add additional providers if needed for your application (e.g., services, state management)

export const appConfig: ApplicationConfig = {
	providers: [provideRouter(routes)]
};
