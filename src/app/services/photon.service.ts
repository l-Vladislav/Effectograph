import { Injectable } from "@angular/core";
import { filter, fliph, flipv, offset_red, oil, open_image, PhotonImage, putImageData, ryo, solarize } from "@silvia-odwyer/photon";

export enum PhotonFilters {
	None = "",
	Radio = "radio",
	LoFi = "lofi",
	Oceanic = "oceanic",
	Islands = "islands",
	Marine = "marine",
	Seagreen = "seagreen",
	Flagblue = "flagblue",
	Liquid = "liquid",
	Diamante = "diamante",
	Twenties = "twenties",
	Mauve = "mauve",
	Vintage = "vintage",
	Bluechrome = "bluechrome"
}

export enum PhotonEffects {
	None = "",
	Solarize = "solarize",
	Oil_Painting = "oil_painting",
	Offset_Red = "offset_red",
	Ryo = "ryo"
}

export enum PhotonTransform {
	None = "",
	Flip_Horizontal = "flip_horizontal",
	Flip_Vertical = "flip_vertical"
}

export interface IImageModification {
	effect: PhotonEffects;
	filter: PhotonFilters;
	transform: PhotonTransform;
}

@Injectable({
	providedIn: "root"
})
export class PhotonService {
	constructor() {}

	async applyImageModification(canvas: HTMLCanvasElement, imageModification: IImageModification) {
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const photonImage = open_image(canvas, ctx);

		this.applyFilter(photonImage, imageModification.filter);
		this.applyEffect(photonImage, imageModification.effect);
		this.applyTransform(photonImage, imageModification.transform);

		putImageData(canvas, ctx, photonImage);
	}

	private async applyFilter(photonImage: PhotonImage, filterName: PhotonFilters) {
		if (filterName === PhotonFilters.None) return;

		filter(photonImage, filterName);
	}

	private async applyEffect(photonImage: PhotonImage, effectName: PhotonEffects) {
		if (effectName === PhotonEffects.None) return;

		if (effectName === PhotonEffects.Oil_Painting) {
			oil(photonImage, 5, 90);
		} else if (effectName == PhotonEffects.Ryo) {
			ryo(photonImage);
		} else if (effectName == PhotonEffects.Solarize) {
			solarize(photonImage);
		} else if (effectName == PhotonEffects.Offset_Red) {
			offset_red(photonImage, 30);
		}
	}

	private async applyTransform(photonImage: PhotonImage, transformName: PhotonTransform) {
		if (transformName === PhotonTransform.None) return;

		if (transformName === PhotonTransform.Flip_Horizontal) {
			fliph(photonImage);
		} else if (transformName === PhotonTransform.Flip_Vertical) {
			flipv(photonImage);
		}
	}
}
