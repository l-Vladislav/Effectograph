import { Component, ElementRef, input, output, ViewChild, OnInit, OnDestroy, model } from "@angular/core";
import { IImageModification, PhotonService } from "../../../services/photon.service";
import { AsyncPipe, JsonPipe, NgClass } from "@angular/common";
import { BehaviorSubject, distinctUntilChanged, Subscription } from "rxjs";

@Component({
	selector: "app-draw-image",
	standalone: true,
	templateUrl: "./draw-image.component.html",
	imports: [NgClass, AsyncPipe, JsonPipe]
})
export class DrawImageComponent implements OnInit, OnDestroy {
	@ViewChild("imageCanvas", { static: true }) canvas?: ElementRef<HTMLCanvasElement>;

	imageModification$ = input.required<BehaviorSubject<IImageModification>>();
	imageFile = model<File>();
	customClasses = input("");

	isProcessing = output<boolean>();
	processedImageMetadata = output<{ dataUrl: string; height: number }>();

	private subscription: Subscription = new Subscription();

	constructor(public photonService: PhotonService) {}

	ngOnInit() {
		this.subscription.add(
			this.imageModification$()
				.pipe(
					distinctUntilChanged(
						(prev: IImageModification, curr: IImageModification) =>
							prev.effect === curr.effect && prev.filter === curr.filter && prev.transform === curr.transform
					)
				)
				.subscribe(imageModification => this.drawImage(imageModification))
		);
	}

	ngOnDestroy(): void {
		this.imageFile.update(() => undefined);
		this.subscription.unsubscribe();
	}

	private async drawImage(imageModifications: IImageModification) {
		if (!this.canvas) return;

		const ctx = this.canvas.nativeElement.getContext("2d");
		this.isProcessing.emit(true);

		setTimeout(async () => {
			if (!this.imageFile()) return;

			const imageElement = await this.createImageElement(this.imageFile()!);
			this.canvas!.nativeElement.width = imageElement.width;
			this.canvas!.nativeElement.height = imageElement.height;

			ctx?.drawImage(imageElement, 0, 0);

			this.photonService.applyImageModification(this.canvas!.nativeElement, imageModifications);

			const dataURL = this.canvas!.nativeElement.toDataURL("image/png");
			this.isProcessing.emit(false);
			this.processedImageMetadata.emit({ dataUrl: dataURL, height: imageElement.width });
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
