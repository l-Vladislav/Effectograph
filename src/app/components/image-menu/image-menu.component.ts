import { CommonModule, NgClass } from "@angular/common";
import { Component } from "@angular/core";

enum MenuItem {
	Filters = 1,
	Advanced = 2
}

@Component({
	selector: "app-image-menu",
	standalone: true,
	imports: [NgClass, CommonModule],
	templateUrl: "./image-menu.component.html",
	styleUrl: "./image-menu.component.css"
})
export class ImageMenuComponent {
	menuItems = MenuItem; // Expose the enum to the template
	activeMenuItem = MenuItem.Filters;

	openMenu(newActiveMenuItem: MenuItem) {
		this.activeMenuItem = newActiveMenuItem;
	}
}
