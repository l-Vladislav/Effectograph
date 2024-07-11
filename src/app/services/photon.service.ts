import { Injectable } from "@angular/core";
import { filter, open_image, putImageData } from "@silvia-odwyer/photon";

@Injectable({
	providedIn: "root"
})
export class PhotonService {
	constructor() {}

	async applyImageFilter(imageElement: HTMLImageElement, canvas: HTMLCanvasElement) {
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		canvas.width = imageElement.width;
		canvas.height = imageElement.height;
		ctx.drawImage(imageElement, 0, 0);

		const photonImage = open_image(canvas, ctx);
		filter(photonImage, "Radio");
		putImageData(canvas, ctx, photonImage);
	}
}
