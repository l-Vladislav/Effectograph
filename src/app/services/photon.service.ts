import { Injectable, Inject } from "@angular/core";
import { PHOTON } from "../tokens/photon.token";
import { PhotonFilters, PhotonEffects, PhotonTransform } from "../models/photon-enums";
import { IImageModification } from "../models/image-modification.model";
import { IPhoton } from "../models/photon/photon.model";
import { IPhotonImage } from "../models/photon/photon-image.model";

@Injectable({
	providedIn: "root"
})
export class PhotonService {
	constructor(@Inject(PHOTON) private photon: IPhoton) {}

	async applyImageModification(canvas: HTMLCanvasElement, imageModification: IImageModification) {
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const photonImage = this.photon.open_image(canvas, ctx);

		await this.applyFilter(photonImage, imageModification.filter);
		await this.applyTransform(photonImage, imageModification.transform);
		await this.applyEffect(photonImage, imageModification.effect);

		this.photon.putImageData(canvas, ctx, photonImage);
	}

	async applyFilter(photonImage: IPhotonImage, filterName: PhotonFilters) {
		if (filterName === PhotonFilters.None) return;

		this.photon.filter(photonImage, filterName);
	}

	async applyEffect(photonImage: IPhotonImage, effectName: PhotonEffects) {
		if (effectName === PhotonEffects.None) return;

		if (effectName === PhotonEffects.Oil_Painting) {
			this.photon.oil(photonImage, 5, 90);
		} else if (effectName == PhotonEffects.Ryo) {
			this.photon.ryo(photonImage);
		} else if (effectName == PhotonEffects.Solarize) {
			this.photon.solarize(photonImage);
		} else if (effectName == PhotonEffects.Offset_Red) {
			this.photon.offset_red(photonImage, 30);
		}
	}

	async applyTransform(photonImage: IPhotonImage, transformName: PhotonTransform) {
		if (transformName === PhotonTransform.None) return;

		if (transformName === PhotonTransform.Flip_Horizontal) {
			this.photon.fliph(photonImage);
		} else if (transformName === PhotonTransform.Flip_Vertical) {
			this.photon.flipv(photonImage);
		}
	}
}
