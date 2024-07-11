import { Component } from "@angular/core";
import { PhotonService } from "../../services/photon.service";

@Component({
	selector: "app-image-upload",
	standalone: true,
	imports: [],
	templateUrl: "./image-upload.component.html",
	styleUrl: "./image-upload.component.css"
})
export class ImageUploadComponent {
	uploadedFile: File | null = null;
	imageUrl: string | ArrayBuffer | null = "";

	constructor(private photonService: PhotonService) {}

	onDragOver(event: DragEvent) {
		event.preventDefault();
		event.stopPropagation();
	}

	onDrop(event: DragEvent) {
		event.preventDefault();
		event.stopPropagation();

		this.handleFile(event.dataTransfer?.files ?? null);
	}

	onDragLeave(event: DragEvent) {
		event.preventDefault();
		event.stopPropagation();
	}

	onFileSelected(event: Event) {
		const input = event.target as HTMLInputElement;
		this.handleFile(input.files);
	}

	handleFile(files: FileList | null) {
		if (files && files.length > 0) {
			this.uploadedFile = files[0];
			const reader = new FileReader();
			reader.onload = () => {
				this.imageUrl = reader.result;
			};
			reader.readAsDataURL(files[0]);
		}
	}

	removeImage() {
		this.uploadedFile = null;
		this.imageUrl = null;
	}

	applyEffect() {
		const canvas = document.getElementById("canvas") as HTMLCanvasElement;
		const img = new Image();
		img.src = this.imageUrl!.toString();
		this.photonService.applyImageFilter(img, canvas);
	}
}
