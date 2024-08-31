import { Component, input, output } from "@angular/core";
import { IUploadedFile } from "../../models/upload-file.model";
import { catchError, concatMap, from, Observable, Observer, of, take } from "rxjs";
import { DecimalPipe } from "@angular/common";

// can be extended if you want to implement a different logic of this component
enum uploadFileMimeTypes {
	//all = "",
	img = "image/(png|jpeg)"
}

export enum uploadErrorMessages {
	invalidFile = "Invalid file",
	invalidFileFormat = "Invalid file format",
	invalidFileSize = "Invalid file size",
	invalidImage = "Invalid image"
}

@Component({
	selector: "app-file-upload",
	standalone: true,
	imports: [DecimalPipe],
	templateUrl: "./file-upload.component.html"
})
export class FileUploadComponent {
	maximumFilesToUpload = input(1);
	maximumFileSizeInKb = input(1024);
	uploadFileMimeTypes = input(uploadFileMimeTypes.img);

	uploadedFiles = output<IUploadedFile>();

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

	async uploadFile(files: FileList | null) {
		if (!files || !files.length) return;

		from(files)
			.pipe(
				concatMap((file: File) =>
					this.validateFile(file).pipe(
						catchError((error: IUploadedFile) => {
							return of(error);
						})
					)
				),
				take(this.maximumFilesToUpload())
			)
			.subscribe((validatedFile: IUploadedFile) => {
				console.log(validatedFile);
				this.uploadedFiles.emit(validatedFile);
			});
	}

	validateFile(file: File): Observable<IUploadedFile> {
		const fileReader = new FileReader();
		return new Observable((observer: Observer<IUploadedFile>) => {
			const fileSize = Math.floor(file.size / 1024);
			if (fileSize > this.maximumFileSizeInKb()) {
				observer.error({ errorMessage: uploadErrorMessages.invalidFileSize });
				return;
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
						observer.error({ errorMessage: uploadErrorMessages.invalidImage } as IUploadedFile);
					};
					image.src = fileReader.result as string;
				} else {
					observer.error({ errorMessage: uploadErrorMessages.invalidFileFormat } as IUploadedFile);
				}
			};

			fileReader.onerror = () => {
				observer.error({ errorMessage: uploadErrorMessages.invalidFile } as IUploadedFile);
			};
		});
	}

	private isImage(mimeType: string): boolean {
		if (!this.uploadFileMimeTypes().length) return true;
		return mimeType.match(this.uploadFileMimeTypes()) !== null;
	}
}
