import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MainComponent } from "./main.component";
import { MenuService } from "../../services/menu.service";
import { IUploadedFile } from "../../models/upload-file.model";
import { PhotonEffects, PhotonFilters, PhotonTransform } from "../../models/photon-enums";
import {
	AvailableSideMenuGroupTitles,
	AvailableFiltersMenuItemTitles,
	AvailableActionMenuGroupTitles,
	AvailableActionMenuItemTitles
} from "../../models/menu/menu-titles.enum";
import { PHOTON, PhotonService } from "../../services/photon.service";
import { IPhoton } from "../../models/photon/photon.model";
import { IMenuGroup } from "../../models/menu/menu-group.model";

describe("MainComponent", () => {
	let component: MainComponent;
	let fixture: ComponentFixture<MainComponent>;
	let menuService: jasmine.SpyObj<MenuService>;
	let mockPhoton: IPhoton;

	const mockMenuGroups: IMenuGroup[] = [
		{ title: "Group 1", items: [{ title: "Item 1" }, { title: "Item 2" }] },
		{ title: "Group 2", items: [{ title: "Item 3" }, { title: "Item 4" }] }
	];
	const mockFile: IUploadedFile = { file: new File([], "test.jpg") };

	beforeEach(async () => {
		const menuServiceSpy = jasmine.createSpyObj("MenuService", [
			"getMockupSideMenuGroups",
			"getMockupActionMenuGroups",
			"combineMenuItem",
			"invokeMenuItemFunction"
		]);

		await TestBed.configureTestingModule({
			imports: [MainComponent],
			providers: [{ provide: MenuService, useValue: menuServiceSpy }, PhotonService, { provide: PHOTON, useValue: mockPhoton }]
		}).compileComponents();

		menuService = TestBed.inject(MenuService) as jasmine.SpyObj<MenuService>;
		fixture = TestBed.createComponent(MainComponent);
		component = fixture.componentInstance;
		component.sideMenuGroups = mockMenuGroups;
		component.onImageFileUploaded(mockFile);

		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should initialize menu groups", () => {
		expect(menuService.getMockupSideMenuGroups).toHaveBeenCalled();
		expect(menuService.getMockupActionMenuGroups).toHaveBeenCalled();
	});

	it("should handle image file upload", () => {
		const mockFile: IUploadedFile = { file: new File([], "test.jpg") };
		component.onImageFileUploaded(mockFile);
		expect(component.uploadedFileInfo).toEqual(mockFile);
	});

	it("should handle modification menu item selection", () => {
		menuService.combineMenuItem.and.returnValue("Filters|lofi");
		component.modificationMenuItemSelected(AvailableSideMenuGroupTitles.Filter, AvailableFiltersMenuItemTitles.lofi);

		expect(menuService.invokeMenuItemFunction).toHaveBeenCalledWith("Filters|lofi", jasmine.any(Object));
	});

	it("should handle action menu item selection", () => {
		menuService.combineMenuItem.and.returnValue("Action|Download_Image");
		component.actionMenuItemSelected(AvailableActionMenuGroupTitles.Action, AvailableActionMenuItemTitles.Download_Image);

		expect(menuService.invokeMenuItemFunction).toHaveBeenCalledWith("Action|Download_Image", jasmine.any(Object));
	});

	it("should update image processing status", done => {
		component.imageProcessingStatusChange(true);
		setTimeout(() => {
			expect(component.isImageProcessing).toBeTrue();
			done();
		}, 0);
	});

	it("should remove image", () => {
		component.uploadedFileInfo = { file: new File([], "test.jpg") };
		component.hoveredActionMenuItem = "test";

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(component as any).removeImage();

		expect(component.uploadedFileInfo).toBeUndefined();
		expect(component.hoveredActionMenuItem).toBe("");
	});

	it("should clean image modifications", () => {
		component.imageModification$.next({ filter: PhotonFilters.LoFi, effect: PhotonEffects.Solarize, transform: PhotonTransform.Flip_Horizontal });
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(component as any).cleanImageModifications();

		expect(component.imageModification$.getValue()).toEqual({
			filter: PhotonFilters.None,
			effect: PhotonEffects.None,
			transform: PhotonTransform.None
		});
	});

	it("should download image", () => {
		const mockFile = new File([], "test.jpg");
		component.uploadedFileInfo = { file: mockFile };
		component.processedImageUrl = "data:image/jpeg;base64,test";

		const linkClickSpy = spyOn(HTMLAnchorElement.prototype, "click");
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(component as any).downloadImage();

		expect(linkClickSpy).toHaveBeenCalled();
	});

	it("should not download image when no file is uploaded", () => {
		const consoleSpy = spyOn(console, "error");
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(component as any).downloadImage();
		expect(consoleSpy).toHaveBeenCalledWith("No file uploaded or image URL is missing.");
	});
});
