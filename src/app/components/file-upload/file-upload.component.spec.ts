/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FileUploadComponent, uploadErrorMessages, uploadFileMimeTypes } from "./file-upload.component";
import { IUploadedFile } from "../../models/upload-file.model";

const enum TestFiles {
	VALID_IMG_FILE = "assets/test-images/valid.jpeg",
	IMG_FILE_WITH_WRONG_EXTENSION = "assets/test-images/wrong_format.tif",
	OVERSIZED_IMG_FILE = "assets/test-images/oversized.jpg"
}

describe("UploadComponent", () => {
	let component: FileUploadComponent;
	let fixture: ComponentFixture<FileUploadComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [FileUploadComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(FileUploadComponent);
		component = fixture.componentInstance;

		component.maximumFilesToUpload.set(1);
		component.maximumFileSizeInKb.set(1024);
		component.uploadFileMimeTypes.set(uploadFileMimeTypes.img);

		fixture.detectChanges();
	});

	// TO DO add vcalidation for cases like multiple files, other mime types, etc.

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should emit the validated file when a file is uploaded", done => {
		const mockValidatedFile: IUploadedFile = { file: new File([""], "test.jpg", { type: "image/jpeg" }) };

		spyOn(component.uploadedFiles, "emit").and.callFake((emittedFile: IUploadedFile) => {
			expect(emittedFile).toEqual(mockValidatedFile);
			done();
		});
		loadImageFile(TestFiles.VALID_IMG_FILE, "test.jpg", "image/jpeg").then(loadedFile => {
			const mockFileList = {
				0: loadedFile,
				length: 1,
				item: () => loadedFile
			} as FileList;
			component.uploadFile(mockFileList);
		});
	});

	it("should emit the validation error when the oversized file is uploaded", done => {
		const mockValidatedFile: IUploadedFile = { errorMessage: uploadErrorMessages.invalidFileSize };

		spyOn(component.uploadedFiles, "emit").and.callFake((emittedFile: IUploadedFile) => {
			expect(emittedFile).toEqual(mockValidatedFile);
			done();
		});

		loadImageFile(TestFiles.OVERSIZED_IMG_FILE, "test.jpg", "image/jpeg").then(loadedFile => {
			const mockFileList = {
				0: loadedFile,
				length: 1,
				item: () => loadedFile
			} as FileList;
			component.uploadFile(mockFileList);
		});
	});

	it("should emit the validation error when a file with wrong extension is uploaded", done => {
		const mockValidatedFile: IUploadedFile = { errorMessage: uploadErrorMessages.invalidFileType };
		spyOn(component.uploadedFiles, "emit").and.callFake((emittedFile: IUploadedFile) => {
			expect(emittedFile).toEqual(mockValidatedFile);
			done();
		});

		loadImageFile(TestFiles.IMG_FILE_WITH_WRONG_EXTENSION, "test.tiff", "image/tiff").then(loadedFile => {
			const mockFileList = {
				0: loadedFile,
				length: 1,
				item: () => loadedFile
			} as FileList;

			component.uploadFile(mockFileList);
		});
	});

	it("should not emit when no files are uploaded", done => {
		const emitSpy = spyOn(component.uploadedFiles, "emit");
		component.uploadFile(null);
		setTimeout(() => {
			expect(emitSpy).not.toHaveBeenCalled();
			done();
		}, 100);
	});

	it("should prevent default behavior on drag over", () => {
		const event = new DragEvent("dragover");
		spyOn(event, "preventDefault");
		spyOn(event, "stopPropagation");

		component.onDragOver(event);

		expect(event.preventDefault).toHaveBeenCalled();
		expect(event.stopPropagation).toHaveBeenCalled();
	});

	it("should call uploadFile on drop", () => {
		const file = new File([""], "test.jpg", { type: "image/jpeg" });
		const event = new DragEvent("drop", { dataTransfer: new DataTransfer() });
		event.dataTransfer?.items.add(file);

		spyOn(component, "uploadFile");
		component.onDrop(event);

		expect(component.uploadFile).toHaveBeenCalled();
	});

	async function loadImageFile(imageFileUrl: string, newImageFileName: string, type: string): Promise<File> {
		const response = await fetch(imageFileUrl);
		const blob = await response.blob();
		return new File([blob], newImageFileName, { type: type });
	}
});
