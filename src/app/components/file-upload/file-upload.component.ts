import { Component, input, output } from "@angular/core";
import { IUploadedFile } from "../../models/upload-file.model";
import { catchError, concatMap, from, Observable, Observer, of, take } from "rxjs";

// can be extended if you want to implement a different logic of this component
enum uploadFileMimeTypes {
	//all = "",
	img = "image/(png|jpeg)"
}

enum uploadErrorMessages {
	invalidFile = "Invalid file",
	invalidFileFormat = "Invalid file format",
	invalidFileSize = "Invalid file size",
	invalidImage = "Invalid image"
}

const MAX_IMAGE_SIZE_KB = 5140; //5mb // 5140kb

@Component({
	selector: "app-file-upload",
	standalone: true,
	templateUrl: "./file-upload.component.html"
})
export class FileUploadComponent {
	maximumFilesToUpload = input(1);
	uploadFileMimeTypes = input(uploadFileMimeTypes.img);

	uploadedFiles = output<IUploadedFile>();

	protected onDragOver(event: DragEvent) {
		event.preventDefault();
		event.stopPropagation();
	}

	protected onDrop(event: DragEvent) {
		event.preventDefault();
		event.stopPropagation();

		this.uploadFile(event.dataTransfer?.files ?? null);
	}

	protected onDragLeave(event: DragEvent) {
		event.preventDefault();
		event.stopPropagation();
	}

	protected onFileSelected(event: Event) {
		const input = event.target as HTMLInputElement;
		this.uploadFile(input.files);
	}

	private uploadFile(files: FileList | null) {
		if (!files || !files.length) return;
		from(files)
			.pipe(
				concatMap((file: File) => this.validateFile(file).pipe(catchError((error: IUploadedFile) => of(error)))),
				take(this.maximumFilesToUpload())
			)
			.subscribe((validatedFile: IUploadedFile) => {
				this.uploadedFiles.emit(validatedFile);
			});
	}

	private validateFile(file: File): Observable<IUploadedFile> {
		const fileReader = new FileReader();
		return new Observable((observer: Observer<IUploadedFile>) => {
			const fileSize = Math.floor(file.size / 1024);
			if (fileSize > MAX_IMAGE_SIZE_KB) {
				observer.error({ errorMessage: uploadErrorMessages.invalidFileSize });
			}
			fileReader.readAsDataURL(file);
			fileReader.onload = () => {
				if (this.isImage(file.type)) {
					const image = new Image();
					image.onload = () => {
						observer.next({ file });
						observer.complete();
					};
					image.onerror = () => {
						observer.error({ errorMessage: uploadErrorMessages.invalidImage });
					};
					image.src = fileReader.result as string;
				} else {
					observer.error({ errorMessage: uploadErrorMessages.invalidFileFormat });
				}
			};

			fileReader.onerror = () => {
				observer.error({ errorMessage: uploadErrorMessages.invalidFile });
			};
		});
	}

	private isImage(mimeType: string): boolean {
		if (!this.uploadFileMimeTypes().length) return true;
		return mimeType.match(this.uploadFileMimeTypes()) !== null;
	}
}
