import { NgClass } from "@angular/common";
import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from "@angular/core";
import { IMenuGroup } from "../../models/menu-group.model";

@Component({
	selector: "app-menu",
	standalone: true,
	imports: [NgClass],
	templateUrl: "./menu.component.html"
})
export class MenuComponent implements OnChanges {
	@Input() menuGroups: IMenuGroup[] = [];
	@Input() reInitMenu = false;
	@Input() doDisableMenu = false;

	@Output() menuItemSelected = new EventEmitter<{ menuGroupTitle: string; menuItemTitle: string }>();

	currentOpenGroupIdx: number | undefined = undefined;
	savedItemIndexes: Map<number, number> = new Map();

	ngOnChanges(changes: SimpleChanges) {
		if (changes["reInitMenu"] && !!this.reInitMenu) {
			this.currentOpenGroupIdx = undefined;
			this.savedItemIndexes.clear();
		}
	}

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
