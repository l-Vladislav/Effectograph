import { Injectable } from "@angular/core";
import { IMenuGroup } from "../models/menu/menu-group.model";
import {
	AvailableActionMenuGroupTitles,
	AvailableActionMenuItemTitles,
	AvailableEffectsMenuItemTitles,
	AvailableFiltersMenuItemTitles,
	AvailableSideMenuGroupTitles,
	AvailableTransformMenuItemTitles
} from "../models/menu/menu-titles.enum";
import { MenuItemAction } from "../models/menu/menu-item-action.model";

const _mockupSideMenuGroups: IMenuGroup[] = [
	{
		title: AvailableSideMenuGroupTitles.Filter,
		items: Object.values(AvailableFiltersMenuItemTitles).map(title => ({ title }))
	},
	{
		title: AvailableSideMenuGroupTitles.Effects,
		items: Object.values(AvailableEffectsMenuItemTitles).map(title => ({ title }))
	},
	{
		title: AvailableSideMenuGroupTitles.Transform,
		items: Object.values(AvailableTransformMenuItemTitles).map(title => ({ title }))
	}
];

let _mockupActionMenuGroups: IMenuGroup[] = [];

@Injectable({
	providedIn: "root"
})
export class MenuService {
	constructor() {
		_mockupActionMenuGroups = [
			{
				title: AvailableActionMenuGroupTitles.Action,
				items: Object.values(AvailableActionMenuItemTitles).map(title => ({ title, iconName: this.getItemGroupIcon(title) }))
			}
		];
	}

	getMockupSideMenuGroups() {
		return _mockupSideMenuGroups;
	}

	getMockupActionMenuGroups() {
		return _mockupActionMenuGroups;
	}

	invokeMenuItemFunction(combinedMenuItem: string, menuItemActions: MenuItemAction) {
		if (!menuItemActions[combinedMenuItem]) return;
		menuItemActions[combinedMenuItem]();
	}

	combineMenuItem(
		menuGroupTitle: AvailableSideMenuGroupTitles | AvailableActionMenuGroupTitles,
		menuItemTitle: AvailableFiltersMenuItemTitles | AvailableEffectsMenuItemTitles | AvailableTransformMenuItemTitles | AvailableActionMenuItemTitles
	): string {
		return `${menuGroupTitle}|${menuItemTitle}`;
	}

	private getItemGroupIcon(menuItemTitle: AvailableActionMenuItemTitles) {
		// google material icon
		switch (menuItemTitle) {
			case AvailableActionMenuItemTitles.Download_Image:
				return "download";
			case AvailableActionMenuItemTitles.Clear_Image_Modifications:
				return "layers_clear";
			case AvailableActionMenuItemTitles.Clear_Image:
				return "cancel";
			default:
				return "";
		}
	}
}
