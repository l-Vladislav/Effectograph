import { NgClass } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MenuService } from "../../services/menu.service";
import { IMenuGroup } from "../../models/menu-group.model";

interface IMenuGroupPrepared extends IMenuGroup {
	isActive: boolean;
}

@Component({
	selector: "app-menu",
	standalone: true,
	imports: [NgClass],
	templateUrl: "./menu.component.html"
})
export class MenuComponent implements OnInit {
	@Input() groups: IMenuGroup[] = [];

	@Output() menuItemSelected = new EventEmitter<string>();

	menuGroups: IMenuGroupPrepared[] = [];

	constructor(private menuService: MenuService) {
		this.groups = menuService.getMockupMenuGroups();
	}

	ngOnInit(): void {
		this.menuGroups = this.groups.map(group => {
			return {
				title: group.title,
				items: group.items.map(groupItem => {
					return { title: groupItem.title };
				}),
				isActive: false
			};
		});
	}

	openMenu(menuGroup: IMenuGroupPrepared) {
		this.menuGroups.forEach(menuItem => (menuItem.isActive = false));
		menuGroup.isActive = true;
	}

	// should emit value outside
	invokeMenuItemFunction(groupTitle: string, itemTitle: string) {
		this.menuService.invokeMenuItemFunction(groupTitle, itemTitle);
	}
}
