import { NgClass } from "@angular/common";
import { Component, input, output } from "@angular/core";
import { IMenuGroup } from "../../../models/menu-group.model";

@Component({
	selector: "app-action-menu",
	standalone: true,
	imports: [NgClass],
	templateUrl: "./action-menu.component.html"
})
export class ActionMenuComponent {
	actionMenuGroups = input.required<IMenuGroup[]>();
	disabled = input(false, {
		transform: (value: boolean | string) => (typeof value === "string" ? value === "" : value)
	});

	menuItemHovered = output<string>();
	menuItemSelected = output<{ menuGroupTitle: string; menuItemTitle: string }>();
}
