import { TestBed } from "@angular/core/testing";
import { MenuService } from "./menu.service";
import { AvailableSideMenuGroupTitles, AvailableActionMenuGroupTitles, AvailableFiltersMenuItemTitles } from "../models/menu/menu-titles.enum";
import { MenuItemAction } from "../models/menu/menu-item-action.model";

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
		expect(sideMenuGroups.length).toBeGreaterThan(0);
		expect(sideMenuGroups[0].title).toBe(AvailableSideMenuGroupTitles.Filter);
	});

	it("should return mockup action menu groups", () => {
		const actionMenuGroups = service.getMockupActionMenuGroups();
		expect(actionMenuGroups.length).toBe(1);
		expect(actionMenuGroups[0].title).toBe(AvailableActionMenuGroupTitles.Action);
	});

	it("should invoke menu item function", () => {
		const mockAction = jasmine.createSpy("mockAction");
		const menuItemActions: MenuItemAction = {
			"Action|Download_Image": mockAction
		};

		service.invokeMenuItemFunction("Action|Download_Image", menuItemActions);
		expect(mockAction).toHaveBeenCalled();
	});

	it("should not invoke menu item function if not found", () => {
		const mockAction = jasmine.createSpy("mockAction");
		const menuItemActions: MenuItemAction = {
			"Action|Download_Image": mockAction
		};

		service.invokeMenuItemFunction("Action|NonExistent", menuItemActions);
		expect(mockAction).not.toHaveBeenCalled();
	});

	it("should combine menu item correctly", () => {
		const combined = service.combineMenuItem(AvailableSideMenuGroupTitles.Filter, AvailableFiltersMenuItemTitles.Mauve);
		expect(combined).toBe("Filters|mauve");
	});
});
