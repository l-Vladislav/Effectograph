import { NgClass } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { IMenuGroup } from "../../models/menu-group.model";

@Component({
	selector: "app-action-menu",
	standalone: true,
	imports: [NgClass],
	templateUrl: "./action-menu.component.html"
})
export class ActionMenuComponent {
	@Input() actionMenuGroups: IMenuGroup[] = [];
	@Input() doDisableMenu = false;

	@Output() menuItemHovered = new EventEmitter<string>();
	@Output() menuItemSelected = new EventEmitter<{ menuGroupTitle: string; menuItemTitle: string }>();

	menuItemHover(menuItemTitle: string) {
		this.menuItemHovered.emit(menuItemTitle);
	}

	selectGroupItem(menuGroupTitle: string, menuItemTitle: string) {
		this.menuItemSelected.emit({ menuGroupTitle, menuItemTitle });
	}
}
