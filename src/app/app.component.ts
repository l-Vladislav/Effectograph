import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
	selector: "app-root",
	standalone: true,
	template: `<router-outlet></router-outlet>`,
	imports: [RouterOutlet]
})
export class AppComponent {
	title = "effectograph";

	// TODO: Consider adding lifecycle hooks if needed for initialization or cleanup
	// TODO: Add methods or properties to handle application-wide functionality if necessary
}
