import { NgClass } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { IMenuGroup } from "../../models/menu-group.model";

@Component({
	selector: "app-menu",
	standalone: true,
	imports: [NgClass],
	templateUrl: "./menu.component.html"
})
export class MenuComponent implements OnInit {
	@Input() menuGroups: IMenuGroup[] = [];
	@Input() selectFirstElementByDefault = true;
	@Input() doDisableMenu = false;

	@Output() menuItemSelected = new EventEmitter<{ menuGroupTitle: string; menuItemTitle: string }>();

	currentOpenGroupIdx: number | undefined = undefined;
	savedItemIndexes: Map<number, number> = new Map();

	ngOnInit(): void {
		this.resetMenu();
	}

	resetMenu() {
		if (this.selectFirstElementByDefault) {
			for (let index = 0; index < this.menuGroups.length; index++) {
				this.savedItemIndexes.set(index, 0);
			}
		} else {
			this.savedItemIndexes.clear();
		}
		this.currentOpenGroupIdx = undefined;
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
