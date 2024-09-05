import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import * as photon from "@silvia-odwyer/photon";
import { PHOTON } from "./services/photon.service";

export const appConfig: ApplicationConfig = {
	providers: [provideRouter(routes), { provide: PHOTON, useValue: photon }]
};
