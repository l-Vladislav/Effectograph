import { NgClass } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";

const actionMenuItems = [
	{
		title: "Save image",
		materialIcon: "save",
		action: () => console.log(42)
	},
	{
		title: "Clear all modifications",
		materialIcon: "layers_clear",
		action: () => console.log(42)
	},
	{
		title: "Delete image",
		materialIcon: "cancel",
		action: () => console.log(42)
	}
];

@Component({
	selector: "app-action-menu",
	standalone: true,
	imports: [NgClass],
	templateUrl: "./action-menu.component.html"
})
export class ActionMenuComponent {
	@Input() doDisableMenu = false;
	@Output() menuItemHovered = new EventEmitter<string>();

	menuItems = actionMenuItems;

	menuItemHover(menuItemTitle: string) {
		this.menuItemHovered.emit(menuItemTitle);
	}
}
