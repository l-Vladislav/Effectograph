import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActionMenuComponent } from "./action-menu.component";
import { IMenuGroup, IMenuSelectedItem } from "../../../models/menu/menu-group.model";

describe("ActionMenuComponent", () => {
	let component: ActionMenuComponent;
	let fixture: ComponentFixture<ActionMenuComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ActionMenuComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(ActionMenuComponent);
		component = fixture.componentInstance;
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should set actionMenuGroups input", () => {
		const mockMenuGroups: IMenuGroup[] = [
			{ title: "Group 1", items: [{ title: "Item1" }, { title: "Item2" }] },
			{ title: "Group 2", items: [{ title: "Item1" }] }
		];

		component.actionMenuGroups.set(mockMenuGroups);
		expect(component.actionMenuGroups()).toEqual(mockMenuGroups);
	});

	it("should emit menuItemSelected output", done => {
		const selectedItemMockup: IMenuSelectedItem = { menuGroupTitle: "group1", menuItemTitle: "item1" };

		spyOn(component.menuItemSelected, "emit").and.callFake((emittedValue: IMenuSelectedItem) => {
			expect(emittedValue).toEqual(selectedItemMockup);
			done();
		});

		component.menuItemSelected.emit(selectedItemMockup);
	});
});
