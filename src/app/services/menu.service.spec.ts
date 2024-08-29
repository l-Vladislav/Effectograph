import { TestBed } from "@angular/core/testing";
import {
	MenuService,
	AvailableSideMenuGroupTitles,
	AvailableActionMenuGroupTitles,
	AvailableFiltersMenuItemTitles,
	AvailableEffectsMenuItemTitles,
	AvailableTransformMenuItemTitles,
	AvailableActionMenuItemTitles
} from "./menu.service";

describe("MenuService", () => {
	let service: MenuService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(MenuService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	it("should return mockup side menu groups", () => {
		const sideMenuGroups = service.getMockupSideMenuGroups();
		expect(sideMenuGroups).toEqual([
			{
				title: AvailableSideMenuGroupTitles.Filter,
				items: Object.values(AvailableFiltersMenuItemTitles).map(title => ({ title }))
			},
			{
				title: AvailableSideMenuGroupTitles.Effects,
				items: Object.values(AvailableEffectsMenuItemTitles).map(title => ({ title }))
			},
			{
				title: AvailableSideMenuGroupTitles.Transform,
				items: Object.values(AvailableTransformMenuItemTitles).map(title => ({ title }))
			}
		]);
	});

	it("should return mockup action menu groups", () => {
		const actionMenuGroups = service.getMockupActionMenuGroups();
		expect(actionMenuGroups).toEqual([
			{
				title: AvailableActionMenuGroupTitles.Action,
				items: Object.values(AvailableActionMenuItemTitles).map(title => ({ title, iconName: service["getItemGroupIcon"](title) }))
			}
		]);
	});

	it("should invoke menu item function if it exists", () => {
		const mockActions = {
			"Action|Download Image": jasmine.createSpy("Download Image")
		};
		const combinedItem = "Action|Download Image";
		service.invokeMenuItemFunction(combinedItem, mockActions);
		expect(mockActions[combinedItem]).toHaveBeenCalled();
	});

	it("should not invoke menu item function if it does not exist", () => {
		const mockActions = {};
		const combinedItem = "Action|NonExistingItem";
		service.invokeMenuItemFunction(combinedItem, mockActions);
		// No action should be invoked
	});

	it("should combine menu item title and group title", () => {
		const combined = service.combineMenuItem(AvailableSideMenuGroupTitles.Filter, AvailableFiltersMenuItemTitles.lofi);
		expect(combined).toBe("Filters|loFi");
	});

	it("should return correct icon for menu item", () => {
		expect(service["getItemGroupIcon"](AvailableActionMenuItemTitles.Download_Image)).toBe("download");
		expect(service["getItemGroupIcon"](AvailableActionMenuItemTitles.Clear_Image_Modifications)).toBe("layers_clear");
		expect(service["getItemGroupIcon"](AvailableActionMenuItemTitles.Clear_Image)).toBe("cancel");
		expect(service["getItemGroupIcon"](AvailableActionMenuItemTitles.Clear_Image)).toBe("cancel");
	});
});
