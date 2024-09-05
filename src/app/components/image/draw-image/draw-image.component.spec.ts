import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DrawImageComponent } from "./draw-image.component";
import { BehaviorSubject } from "rxjs";
import { IImageModification } from "../../../models/image-modification.model";
import { PhotonEffects, PhotonFilters, PhotonTransform } from "../../../models/photon-enums";
import { PHOTON, PhotonService } from "../../../services/photon.service";
import { IPhoton } from "../../../models/photon/photon.model";

const VALID_IMG_FILE = "assets/test-images/valid.jpeg";

describe("DrawImageComponent", () => {
	let component: DrawImageComponent;
	let fixture: ComponentFixture<DrawImageComponent>;
	let mockPhoton: IPhoton;

	beforeEach(async () => {
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

		await TestBed.configureTestingModule({
			imports: [DrawImageComponent],
			providers: [PhotonService, { provide: PHOTON, useValue: mockPhoton }]
		}).compileComponents();

		fixture = TestBed.createComponent(DrawImageComponent);
		component = fixture.componentInstance;
		const validFileToTest = await loadImageFile(VALID_IMG_FILE, "test.jpg", "image/jpeg");
		component.imageFile.set(validFileToTest);
		component.imageModification$.set(
			new BehaviorSubject<IImageModification>({
				effect: PhotonEffects.None,
				filter: PhotonFilters.None,
				transform: PhotonTransform.None
			})
		);
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should initialize canvas and subscribe to imageModification$", () => {
		const canvasSpy = jasmine.createSpyObj("HTMLCanvasElement", ["getContext"]);
		component.canvas = { nativeElement: canvasSpy };
		const contextSpy = jasmine.createSpyObj("CanvasRenderingContext2D", ["drawImage"]);
		canvasSpy.getContext.and.returnValue(contextSpy);

		component.ngOnInit();

		expect(component["subscription"]).toBeDefined();
	});

	it("should unsubscribe and reset imageFile on destroy", () => {
		const unsubscribeSpy = spyOn(component["subscription"], "unsubscribe");
		const updateSpy = spyOn(component.imageFile, "update");

		component.ngOnDestroy();

		expect(unsubscribeSpy).toHaveBeenCalled();
		expect(updateSpy).toHaveBeenCalledWith(jasmine.any(Function));
	});

	async function loadImageFile(imageFileUrl: string, newImageFileName: string, type: string): Promise<File> {
		const response = await fetch(imageFileUrl);
		const blob = await response.blob();
		return new File([blob], newImageFileName, { type: type });
	}
});
