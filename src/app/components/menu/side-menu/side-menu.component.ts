import { NgClass } from "@angular/common";
import { Component, input, OnInit, output } from "@angular/core";
import { IMenuGroup } from "../../../models/menu-group.model";

@Component({
	selector: "app-side-menu",
	standalone: true,
	imports: [NgClass],
	templateUrl: "./side-menu.component.html"
})
export class SideMenuComponent implements OnInit {
	sideMenuGroups = input.required<IMenuGroup[]>();
	selectFirstElementByDefault = input<boolean>(true);
	disabled = input(false, {
		transform: (value: boolean | string) => (typeof value === "string" ? value === "" : value)
	});
	menuItemSelected = output<{ menuGroupTitle: string; menuItemTitle: string }>();

	currentOpenGroupIdx: number | undefined = undefined;
	selectedGroupItemIndexes: Map<number, number> = new Map();

	ngOnInit(): void {
		this.resetMenu();
	}

	resetMenu() {
		if (this.selectFirstElementByDefault()) {
			for (let index = 0; index < this.sideMenuGroups().length; index++) {
				this.selectedGroupItemIndexes.set(index, 0);
			}
		} else {
			this.selectedGroupItemIndexes.clear();
		}
		this.currentOpenGroupIdx = undefined;
	}

	openMenu(groupIdx: number) {
		this.currentOpenGroupIdx = groupIdx;
	}

	selectGroupItem(menuGroupTitle: string, menuItemTitle: string, groupIdx: number, itemIdx: number) {
		this.selectedGroupItemIndexes.set(groupIdx, itemIdx);
		this.menuItemSelected.emit({ menuGroupTitle, menuItemTitle });
	}

	isCurrentItemActive(groupIdx: number, itemIdx: number) {
		return this.selectedGroupItemIndexes.get(groupIdx) === itemIdx ? true : false;
	}
}
