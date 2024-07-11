import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { ImageUploadComponent } from "./components/image-upload/image-upload.component";
import { ImageMenuComponent } from "./components/image-menu/image-menu.component";

@Component({
	selector: "app-root",
	standalone: true,
	imports: [RouterOutlet, ImageUploadComponent, ImageMenuComponent],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.css"
})
export class AppComponent {
	title = "effectograph";
}
