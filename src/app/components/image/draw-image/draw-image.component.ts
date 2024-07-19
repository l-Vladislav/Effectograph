import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from "@angular/core";
import { PhotonEffects, PhotonFilters, PhotonService, PhotonTransform } from "../../../services/photon.service";
import { NgClass } from "@angular/common";

@Component({
	selector: "app-draw-image",
	standalone: true,
	templateUrl: "./draw-image.component.html",
	imports: [NgClass]
})
export class DrawImageComponent implements OnChanges {
	@ViewChild("imageCanvas", { static: true }) canvas?: ElementRef<HTMLCanvasElement>;

	@Input() imageFile?: File;
	@Input() filterName: string = "";
	@Input() effectName: string = "";
	@Input() transformName: string = "";
	@Input() customClasses: string = "";

	isDrawing = false;
	constructor(private photonService: PhotonService) {}

	ngOnChanges(changes: SimpleChanges) {
		this.drawImage();
		console.log(changes);
		// if (changes["imageFile"] && this.imageFile) {
		// 	this.drawImage();
		// }
		// if (changes["filterName"] && this.filterName) {
		// 	this.drawImage();
		// }
		// if (changes["effectName"] && this.effectName) {
		// 	this.drawImage();
		// }
	}

	private drawImage() {
		if (!this.canvas || !this.imageFile) return;

		const ctx = this.canvas.nativeElement.getContext("2d");
		this.isDrawing = true;
		setTimeout(
			async () =>
				this.createImageElement(this.imageFile!).then(imgEl => {
					this.canvas!.nativeElement.width = imgEl.width;
					this.canvas!.nativeElement.height = imgEl.height;

					ctx?.drawImage(imgEl, 0, 0);
					this.photonService.applyImageModification(this.canvas!.nativeElement, {
						effect: this.effectName as PhotonEffects,
						filter: this.filterName as PhotonFilters,
						transform: this.transformName as PhotonTransform
					});
					this.isDrawing = false;
				}),
			300
		);
	}

	private createImageElement(file: File): Promise<HTMLImageElement> {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = (e: ProgressEvent<FileReader>) => {
				const img = new Image();
				img.src = e.target!.result as string;
				img.onload = () => resolve(img);
				img.onerror = error => reject(error);
			};
			reader.readAsDataURL(file);
		});
	}
}
