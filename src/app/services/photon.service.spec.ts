import { TestBed } from "@angular/core/testing";
import { PhotonService, IImageModification, PhotonEffects, PhotonFilters, PhotonTransform } from "./photon.service";
import { filter, fliph, flipv, offset_red, oil, open_image, PhotonImage, putImageData, ryo, solarize } from "@silvia-odwyer/photon";

describe("PhotonService", () => {
	let service: PhotonService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(PhotonService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	it("should apply image modifications correctly", async () => {
		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const imageModification: IImageModification = {
			effect: PhotonEffects.Solarize,
			filter: PhotonFilters.Radio,
			transform: PhotonTransform.Flip_Horizontal
		};

		spyOn(service as any, "applyFilter").and.callThrough();
		spyOn(service as Pho, "applyEffect").and.callThrough();
		spyOn(service as any, "applyTransform").and.callThrough();

		spyOn(open_image, "open_image").and.returnValue({} as PhotonImage);
		spyOn(putImageData, "putImageData");

		await service.applyImageModification(canvas, imageModification);

		expect(service["applyFilter"]).toHaveBeenCalledWith(jasmine.any(Object), imageModification.filter);
		expect(service["applyEffect"]).toHaveBeenCalledWith(jasmine.any(Object), imageModification.effect);
		expect(service["applyTransform"]).toHaveBeenCalledWith(jasmine.any(Object), imageModification.transform);
		expect(putImageData).toHaveBeenCalledWith(canvas, ctx, jasmine.any(Object));
	});

	it("should apply filter correctly", async () => {
		const photonImage = {} as PhotonImage;
		const filterName = PhotonFilters.Radio;

		spyOn(filter, "filter");

		await (service as any).applyFilter(photonImage, filterName);

		expect(filter).toHaveBeenCalledWith(photonImage, filterName);
	});

	it("should apply effect correctly", async () => {
		const photonImage = {} as PhotonImage;
		const effectName = PhotonEffects.Solarize;

		spyOn(service as any, "applyEffect").and.callThrough();
		spyOn(oil, "oil");
		spyOn(ryo, "ryo");
		spyOn(solarize, "solarize");
		spyOn(offset_red, "offset_red");

		await (service as any).applyEffect(photonImage, effectName);

		expect(solarize).toHaveBeenCalledWith(photonImage);
	});

	it("should apply transform correctly", async () => {
		const photonImage = {} as PhotonImage;
		const transformName = PhotonTransform.Flip_Horizontal;

		spyOn(service as any, "applyTransform").and.callThrough();
		spyOn(fliph, "fliph");
		spyOn(flipv, "flipv");

		await (service as any).applyTransform(photonImage, transformName);

		expect(fliph).toHaveBeenCalledWith(photonImage);
	});
});
