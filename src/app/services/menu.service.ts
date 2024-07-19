import { Injectable } from "@angular/core";
import { IMenuGroup } from "../models/menu-group.model";

export enum AvailableMenuGroupTitles {
	Filter = "Filters",
	Effects = "Effects",
	Transform = "Transform"
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

export type MenuItemAction = {
	[key: string]: () => void;
};

const _mockupMenuGroups: IMenuGroup[] = [
	{
		title: AvailableMenuGroupTitles.Filter,
		items: Object.values(AvailableFiltersMenuItemTitles).map(title => ({ title }))
	},
	{
		title: AvailableMenuGroupTitles.Effects,
		items: Object.values(AvailableEffectsMenuItemTitles).map(title => ({ title }))
	},
	{
		title: AvailableMenuGroupTitles.Transform,
		items: Object.values(AvailableTransformMenuItemTitles).map(title => ({ title }))
	}
];

@Injectable({
	providedIn: "root"
})
export class MenuService {
	constructor() {}

	getMockupMenuGroups() {
		return _mockupMenuGroups;
	}

	invokeMenuItemFunction(combinedMenuItem: string, menuItemActions: MenuItemAction) {
		if (!menuItemActions[combinedMenuItem]) return;
		menuItemActions[combinedMenuItem]();
	}

	combineMenuItem(
		menuGroupTitle: AvailableMenuGroupTitles,
		menuItemTitle: AvailableFiltersMenuItemTitles | AvailableEffectsMenuItemTitles | AvailableTransformMenuItemTitles
	): string {
		return menuGroupTitle + "|" + menuItemTitle;
	}
}
