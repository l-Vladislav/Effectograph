/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FileUploadComponent, uploadErrorMessages } from "./file-upload.component";
import { IUploadedFile } from "../../models/upload-file.model";
import { lastValueFrom } from "rxjs";

describe("UploadComponent", () => {
	const IMG_FILE_WITH_WRONG_EXTENSION = "assets/test-images/wrong_format.tif";
	const OVERSIZED_IMG_FILE = "assets/test-images/oversized.jpg";
	const VALID_IMG_FILE = "assets/test-images/valid.jpeg";

	let component: FileUploadComponent;
	let fixture: ComponentFixture<FileUploadComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [FileUploadComponent],
			teardown: { destroyAfterEach: false }
		}).compileComponents();

		fixture = TestBed.createComponent(FileUploadComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should ", () => {
		expect(component).toBeTruthy();
	});

	it("should emit the validated file when a file is uploaded", async () => {
		const mockFile = await loadImageFile(VALID_IMG_FILE, "test.jpeg", "image/jpeg");
		const mockFileList = {
			0: mockFile,
			length: 1,
			item: () => mockFile
		} as FileList;

		const mockValidatedFile: IUploadedFile = { file: mockFile };

		spyOn(component.uploadedFiles, "emit").and.callFake((emittedFile: IUploadedFile) => {
			expect(emittedFile).toEqual(mockValidatedFile);
		});

		component.uploadFile(mockFileList);
	});

	// it("should emit the validated file when a file is uploaded", async () => {
	// 	// Load the mock file
	// 	const mockFile = await loadImageFile(VALID_IMG_FILE, "test.jpeg", "image/jpeg");

	// 	// Create a mock FileList object
	// 	const mockFileList = {
	// 		0: mockFile,
	// 		length: 1,
	// 		item: () => mockFile
	// 	} as FileList;

	// 	// Define the expected validated file
	// 	const mockValidatedFile: IUploadedFile = { file: mockFile };

	// 	// Spy on the emit method
	// 	const emitSpy = spyOn(component.uploadedFiles, "emit");

	// 	// Call the uploadFile method
	// 	component.uploadFile(mockFileList);

	// 	// Use `tick` to wait for any asynchronous operations to complete
	// 	await fixture.whenStable();

	// 	// Debug: Log calls to the emit function
	// 	console.log("42", emitSpy.calls.all());

	// 	// Check if the emit method was called with the correct argument
	// 	expect(emitSpy).toHaveBeenCalledWith(mockValidatedFile);
	// });

	it("should emit the validation error when the oversized file is uploaded", async () => {
		const mockFile = await loadImageFile(OVERSIZED_IMG_FILE, "test.jpg", "image/jpeg");
		const mockFileList = {
			0: mockFile,
			length: 1,
			item: () => mockFile
		} as FileList;

		const mockValidatedFile: IUploadedFile = { errorMessage: uploadErrorMessages.invalidFileSize };

		spyOn(component.uploadedFiles, "emit").and.callFake((emittedFile: IUploadedFile) => {
			expect(emittedFile).toEqual(mockValidatedFile);
		});

		component.uploadFile(mockFileList);
	});

	it("should emit the validation error when the oversized file is uploaded", async () => {
		const mockFile = await loadImageFile(IMG_FILE_WITH_WRONG_EXTENSION, "test.tif", "image/tiff");
		const mockFileList = {
			0: mockFile,
			length: 1,
			item: () => mockFile
		} as FileList;

		const mockValidatedFile: IUploadedFile = { errorMessage: "42" };

		spyOn(component.uploadedFiles, "emit").and.callFake((emittedFile: IUploadedFile) => {
			expect(emittedFile).toEqual(mockValidatedFile);
		});

		component.uploadFile(mockFileList);
	});

	async function loadImageFile(imageFileUrl: string, newImageFileName: string, type: string): Promise<File> {
		const response = await fetch(imageFileUrl);
		const blob = await response.blob();
		return new File([blob], newImageFileName, { type: type });
	}
});
