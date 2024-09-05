import { ComponentFixture, TestBed } from "@angular/core/testing";
import { SideMenuComponent } from "./side-menu.component";
import { IMenuGroup } from "../../../models/menu/menu-group.model";

describe("SideMenuComponent", () => {
	let component: SideMenuComponent;
	let fixture: ComponentFixture<SideMenuComponent>;

	const mockMenuGroups: IMenuGroup[] = [
		{ title: "Group 1", items: [{ title: "Item 1" }, { title: "Item 2" }] },
		{ title: "Group 2", items: [{ title: "Item 3" }, { title: "Item 4" }] }
	];

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [SideMenuComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(SideMenuComponent);
		component = fixture.componentInstance;
		component.sideMenuGroups.set(mockMenuGroups);
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should reset menu with first elements selected by default", () => {
		component.resetMenu();
		expect(component.selectedGroupItemIndexes.get(0)).toBe(0);
		expect(component.selectedGroupItemIndexes.get(1)).toBe(0);
	});

	it("should open menu group", () => {
		component.openMenu(1);
		expect(component.currentOpenGroupIdx).toBe(1);
	});

	it("should select group item and emit event", () => {
		spyOn(component.menuItemSelected, "emit");

		component.selectGroupItem("Group 1", "Item 2", 0, 1);

		expect(component.selectedGroupItemIndexes.get(0)).toBe(1);
		expect(component.menuItemSelected.emit).toHaveBeenCalledWith({ menuGroupTitle: "Group 1", menuItemTitle: "Item 2" });
	});

	it("should check if current item is active", () => {
		component.selectGroupItem("Group 1", "Item 2", 0, 1);

		expect(component.isCurrentItemActive(0, 1)).toBeTrue();
		expect(component.isCurrentItemActive(0, 0)).toBeFalse();
	});
});
