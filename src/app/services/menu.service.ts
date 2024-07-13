import { Injectable } from "@angular/core";
import { IMenuGroup } from "../models/menu-group.model";

enum menuGroupNames {
	filter = "filters",
	advanced = "advanced"
}

const _mockMenuGroups: IMenuGroup[] = [
	{
		title: "filters",
		items: [
			{
				title: "Lofi"
			},
			{
				title: "Radio"
			}
		]
	},
	{
		title: "advanced",
		items: [
			{
				title: "Lofi"
			},
			{
				title: "Radio"
			}
		]
	}
];

@Injectable({
	providedIn: "root"
})
export class MenuService {
	constructor() {}

	getMockupMenuGroups() {
		return _mockMenuGroups;
	}

	invokeMenuItemFunction(groupTitle: string, itemTitle: string) {
		switch (groupTitle) {
			case menuGroupNames.filter:
				return console.log(itemTitle);
			case menuGroupNames.advanced:
				return console.log(itemTitle);
		}
	}
}
