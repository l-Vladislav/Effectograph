import { IPhotonImage } from "./photon-image.model";

export interface IPhoton {
	open_image: (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => IPhotonImage;
	putImageData: (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, image: IPhotonImage) => void;
	filter: (image: IPhotonImage, filterName: string) => void;
	oil: (image: IPhotonImage, radius: number, intensity: number) => void;
	ryo: (image: IPhotonImage) => void;
	solarize: (image: IPhotonImage) => void;
	offset_red: (image: IPhotonImage, offset: number) => void;
	fliph: (image: IPhotonImage) => void;
	flipv: (image: IPhotonImage) => void;
}
