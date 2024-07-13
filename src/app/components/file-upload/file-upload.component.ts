import { Component, EventEmitter, Input, Output } from "@angular/core";
import { IUploadedFile } from "../../models/upload-file.model";
import { catchError, concatMap, from, Observable, Observer, of, take } from "rxjs";

export enum uploadFileMimeTypes {
	img = "image/(png|jpeg)",
	all = ""
}

enum uploadErrorMessages {
	invalidFile = "Invalid file",
	invalidFileFormat = "Invalid file format",
	invalidImage = "Invalid image",
	invalidFileSize = "Invalid file size"
}

const MAX_IMAGE_SIZE_KB = 5140;

@Component({
	selector: "app-file-upload",
	standalone: true,
	templateUrl: "./file-upload.component.html"
})
export class FileUploadComponent {
	@Input() uploadFileMimeTypes = uploadFileMimeTypes.all;
	@Input() maximumFilesToUpload = 1;

	@Output() uploadedFiles = new EventEmitter<IUploadedFile>();

	onDragOver(event: DragEvent) {
		event.preventDefault();
		event.stopPropagation();
	}

	onDrop(event: DragEvent) {
		event.preventDefault();
		event.stopPropagation();

		this.uploadFile(event.dataTransfer?.files ?? null);
	}

	onDragLeave(event: DragEvent) {
		event.preventDefault();
		event.stopPropagation();
	}

	onFileSelected(event: Event) {
		const input = event.target as HTMLInputElement;
		this.uploadFile(input.files);
	}

	private uploadFile(files: FileList | null) {
		if (!files || !files.length) return;
		from(files)
			.pipe(
				concatMap((file: File) => this.validateFile(file).pipe(catchError((error: IUploadedFile) => of(error)))),
				take(this.maximumFilesToUpload)
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
				const { type } = file;
				if (this.isImage(type)) {
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
		if (!this.uploadFileMimeTypes.length) return true;
		return mimeType.match(this.uploadFileMimeTypes) !== null;
	}
}
