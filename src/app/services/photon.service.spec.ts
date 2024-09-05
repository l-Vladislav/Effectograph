import { TestBed } from "@angular/core/testing";
import { PHOTON, PhotonService } from "./photon.service";
import { PhotonEffects, PhotonFilters, PhotonTransform } from "../models/photon-enums";
import { IImageModification } from "../models/image-modification.model";
import { IPhoton } from "../models/photon/photon.model";

describe("PhotonService", () => {
	let service: PhotonService;
	let mockPhoton: IPhoton;

	beforeEach(() => {
		mockPhoton = {
			open_image: jasmine.createSpy("open_image").and.returnValue({}),
			putImageData: jasmine.createSpy("putImageData"),
			filter: jasmine.createSpy("filter"),
			oil: jasmine.createSpy("oil"),
			ryo: jasmine.createSpy("ryo"),
			solarize: jasmine.createSpy("solarize"),
			offset_red: jasmine.createSpy("offset_red"),
			fliph: jasmine.createSpy("fliph"),
			flipv: jasmine.createSpy("flipv")
		};

		TestBed.configureTestingModule({
			providers: [PhotonService, { provide: PHOTON, useValue: mockPhoton }]
		});
		service = TestBed.inject(PhotonService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	it("should apply image modification", async () => {
		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
		spyOn(ctx, "drawImage").and.stub();

		const imageModification: IImageModification = {
			effect: PhotonEffects.Oil_Painting,
			filter: PhotonFilters.Diamante,
			transform: PhotonTransform.Flip_Horizontal
		};

		await service.applyImageModification(canvas, imageModification);

		expect(mockPhoton.open_image).toHaveBeenCalled();
		expect(mockPhoton.putImageData).toHaveBeenCalled();
		expect(mockPhoton.filter).toHaveBeenCalled();
		expect(mockPhoton.oil).toHaveBeenCalled();
		expect(mockPhoton.fliph).toHaveBeenCalled();
	});

	it("should apply filter", async () => {
		const photonImage = {};
		await service.applyFilter(photonImage, PhotonFilters.Diamante);
		expect(mockPhoton.filter).toHaveBeenCalledWith(photonImage, PhotonFilters.Diamante);
	});

	it("should apply effect", async () => {
		const photonImage = {};
		await service.applyEffect(photonImage, PhotonEffects.Oil_Painting);
		expect(mockPhoton.oil).toHaveBeenCalledWith(photonImage, 5, 90);

		await service.applyEffect(photonImage, PhotonEffects.Ryo);
		expect(mockPhoton.ryo).toHaveBeenCalledWith(photonImage);

		await service.applyEffect(photonImage, PhotonEffects.Solarize);
		expect(mockPhoton.solarize).toHaveBeenCalledWith(photonImage);

		await service.applyEffect(photonImage, PhotonEffects.Offset_Red);
		expect(mockPhoton.offset_red).toHaveBeenCalledWith(photonImage, 30);
	});

	it("should apply transform", async () => {
		const photonImage = {};
		await service.applyTransform(photonImage, PhotonTransform.Flip_Horizontal);
		expect(mockPhoton.fliph).toHaveBeenCalledWith(photonImage);

		await service.applyTransform(photonImage, PhotonTransform.Flip_Vertical);
		expect(mockPhoton.flipv).toHaveBeenCalledWith(photonImage);
	});
});
