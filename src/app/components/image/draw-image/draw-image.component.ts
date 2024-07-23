import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, ViewChild } from "@angular/core";
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

	@Output() isProcessing = new EventEmitter<boolean>();

	constructor(private photonService: PhotonService) {}

	ngOnChanges() {
		this.drawImage();
	}

	private async drawImage() {
		if (!this.canvas || !this.imageFile) return;

		const ctx = this.canvas.nativeElement.getContext("2d");
		this.isProcessing.emit(true);

		setTimeout(async () => {
			const imageElement = await this.createImageElement(this.imageFile!);
			this.canvas!.nativeElement.width = imageElement.width;
			this.canvas!.nativeElement.height = imageElement.height;

			ctx?.drawImage(imageElement, 0, 0);
			this.photonService.applyImageModification(this.canvas!.nativeElement, {
				effect: this.effectName as PhotonEffects,
				filter: this.filterName as PhotonFilters,
				transform: this.transformName as PhotonTransform
			});
			this.isProcessing.emit(false);
		}, 200);
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
