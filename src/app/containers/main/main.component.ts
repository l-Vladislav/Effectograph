import { Component } from "@angular/core";
import { MenuComponent } from "../../components/menu/menu.component";
import { FileUploadComponent } from "../../components/file-upload/file-upload.component";
import { IUploadedFile } from "../../models/upload-file.model";
import { DrawImageComponent } from "../../components/image/draw-image/draw-image.component";
import { PhotonFilters } from "../../constants/photon-filter.constants";

@Component({
	selector: "app-main",
	standalone: true,
	templateUrl: "./main.component.html",
	imports: [FileUploadComponent, MenuComponent, DrawImageComponent]
})
export class MainComponent {
	uploadedFile?: File;
	selectedFilter: PhotonFilters = PhotonFilters.None;

	onFileUploaded(uploadedFiles: IUploadedFile) {
		this.uploadedFile = uploadedFiles.file;
	}

	removeImage() {
		this.uploadedFile = undefined;
		this.selectedFilter = PhotonFilters.None;
	}
}
