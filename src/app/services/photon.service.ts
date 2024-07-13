import { Injectable } from "@angular/core";
import { filter, open_image, putImageData } from "@silvia-odwyer/photon";

@Injectable({
	providedIn: "root"
})
export class PhotonService {
	constructor() {}

	async applyImageFilter(canvas: HTMLCanvasElement, filterName: string = "radio") {
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		const photonImage = open_image(canvas, ctx);
		filter(photonImage, filterName);
		putImageData(canvas, ctx, photonImage);
	}
}
