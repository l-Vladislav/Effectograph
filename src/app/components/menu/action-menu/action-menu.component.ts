import { NgClass } from "@angular/common";
import { Component, input, model, output } from "@angular/core";
import { IMenuGroup, IMenuSelectedItem } from "../../../models/menu/menu-group.model";

@Component({
	selector: "app-action-menu",
	standalone: true,
	imports: [NgClass],
	templateUrl: "./action-menu.component.html"
})
export class ActionMenuComponent {
	actionMenuGroups = model.required<IMenuGroup[]>();
	disabled = input(false, {
		transform: (value: boolean | string) => (typeof value === "string" ? value === "" : value)
	});

	menuItemHovered = output<string>();
	menuItemSelected = output<IMenuSelectedItem>();
}
