export interface IMenuGroup {
	title: string;
	items: IMenuItem[];
}

export interface IMenuItem {
	title: string;
	iconName?: string;
}

export interface IMenuSelectedItem {
	menuGroupTitle: string;
	menuItemTitle: string;
}
