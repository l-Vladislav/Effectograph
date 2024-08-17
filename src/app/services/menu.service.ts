import { Injectable } from "@angular/core";
import { IMenuGroup } from "../models/menu-group.model";

export enum AvailableSideMenuGroupTitles {
	Filter = "Filters",
	Effects = "Effects",
	Transform = "Transform"
}

export enum AvailableActionMenuGroupTitles {
	Action = "Action",
	Info = "Info"
}

export enum AvailableFiltersMenuItemTitles {
	None = "None",
	lofi = "loFi",
	radio = "radio",
	Oceanic = "oceanic",
	Marine = "marine",
	Liquid = "liquid",
	Diamante = "diamante",
	Twenties = "twenties",
	Mauve = "mauve",
	Vintage = "vintage"
}

export enum AvailableEffectsMenuItemTitles {
	None = "None",
	Solarize = "solarize",
	Oil_Painting = "oil painting",
	Offset_Red = "offset red",
	Ryo = "ryo"
}

export enum AvailableTransformMenuItemTitles {
	None = "None",
	Flip_Horizontal = "Flip Horizontal",
	Flip_Vertical = "Flip Vertical"
}

export enum AvailableActionMenuItemTitles {
	Download_Image = "Download Image",
	Clear_Image_Modifications = "Clear Image Modifications",
	Clear_Image = "Clear Image"
}

export type MenuItemAction = {
	[key: string]: () => void;
};

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
		return menuGroupTitle + "|" + menuItemTitle;
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
