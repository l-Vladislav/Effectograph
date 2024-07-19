import { NgClass } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { IMenuGroup } from "../../models/menu-group.model";

@Component({
	selector: "app-menu",
	standalone: true,
	imports: [NgClass],
	templateUrl: "./menu.component.html"
})
export class MenuComponent {
	@Input() menuGroups: IMenuGroup[] = [];

	@Output() menuItemSelected = new EventEmitter<{ menuGroupTitle: string; menuItemTitle: string }>();

	currentOpenGroupIdx: number | undefined = undefined;
	savedItemIndexes: Map<number, number> = new Map();

	openMenu(groupIdx: number) {
		this.currentOpenGroupIdx = groupIdx;
	}

	selectGroupItem(menuGroupTitle: string, menuItemTitle: string, groupIdx: number, itemIdx: number) {
		this.savedItemIndexes.set(groupIdx, itemIdx);
		this.menuItemSelected.emit({ menuGroupTitle, menuItemTitle });
	}

	isCurrentItemActive(groupIdx: number, itemIdx: number) {
		return this.savedItemIndexes.get(groupIdx) === itemIdx ? true : false;
	}
}
