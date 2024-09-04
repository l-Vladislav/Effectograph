import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { PHOTON } from "./tokens/photon.token";
import * as photon from "@silvia-odwyer/photon";

export const appConfig: ApplicationConfig = {
	providers: [provideRouter(routes), { provide: PHOTON, useValue: photon }]
};
