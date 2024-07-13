import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from "@angular/core";
import { PhotonService } from "../../../services/photon.service";
import { NgClass } from "@angular/common";

@Component({
	selector: "app-draw-image",
	standalone: true,
	template: `<canvas #imageCanvas [ngClass]="customClasses"></canvas>`,
	imports: [NgClass]
})
export class DrawImageComponent implements OnChanges {
	@ViewChild("imageCanvas", { static: true }) canvas?: ElementRef<HTMLCanvasElement>;

	@Input() imageFile?: File;
	@Input() filterName: string = "";
	@Input() customClasses: string = "";

	constructor(private photonService: PhotonService) {}

	ngOnChanges(changes: SimpleChanges) {
		if (changes["imageFile"] && this.imageFile) {
			this.drawImage();
		}
		if (changes["filterName"] && this.filterName) {
			this.applyEffect();
		}
	}

	private drawImage() {
		if (!this.canvas || !this.imageFile) return;

		const ctx = this.canvas.nativeElement.getContext("2d");
		this.createImageElement(this.imageFile).then(imgEl => {
			this.canvas!.nativeElement.width = imgEl.width;
			this.canvas!.nativeElement.height = imgEl.height;
			ctx?.drawImage(imgEl, 0, 0);
		});
	}

	private applyEffect() {
		if (!this.canvas || !this.filterName.length) return;
		this.photonService.applyImageFilter(this.canvas.nativeElement, this.filterName);
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
