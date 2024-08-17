import { Component, OnInit, ViewChild } from "@angular/core";
import { SideMenuComponent } from "../../components/menu/side-menu/side-menu.component";
import { FileUploadComponent } from "../../components/file-upload/file-upload.component";
import { IUploadedFile } from "../../models/upload-file.model";
import { DrawImageComponent } from "../../components/image/draw-image/draw-image.component";
import {
	AvailableSideMenuGroupTitles,
	AvailableFiltersMenuItemTitles,
	MenuItemAction,
	MenuService,
	AvailableEffectsMenuItemTitles,
	AvailableTransformMenuItemTitles,
	AvailableActionMenuGroupTitles,
	AvailableActionMenuItemTitles
} from "../../services/menu.service";
import { IImageModification, PhotonEffects, PhotonFilters, PhotonTransform } from "../../services/photon.service";
import { IMenuGroup } from "../../models/menu-group.model";
import { ActionMenuComponent } from "../../components/menu/action-menu/action-menu.component";
import { BehaviorSubject } from "rxjs";

@Component({
	selector: "app-main",
	standalone: true,
	templateUrl: "./main.component.html",
	imports: [FileUploadComponent, SideMenuComponent, DrawImageComponent, ActionMenuComponent]
})
export class MainComponent implements OnInit {
	@ViewChild(SideMenuComponent) private modificationMenuComponent!: SideMenuComponent;

	uploadedFile?: File;
	processedImageUrl = "";

	imageModification$ = new BehaviorSubject<IImageModification>({
		effect: PhotonEffects.None,
		filter: PhotonFilters.None,
		transform: PhotonTransform.None
	});

	hoveredActionMenuItem = "";

	isImageProcessing = false;

	sideMenuGroups: IMenuGroup[] = [];
	actionMenuGroups: IMenuGroup[] = [];

	modificationMenuItemActions: MenuItemAction = {};
	actionMenuItemActions: MenuItemAction = {};

	constructor(private menuService: MenuService) {
		this.sideMenuGroups = menuService.getMockupSideMenuGroups();
		this.actionMenuGroups = menuService.getMockupActionMenuGroups();
	}

	ngOnInit(): void {
		this.initMenuItemActions();
	}

	protected onImageFileUploaded(uploadedFiles: IUploadedFile) {
		this.uploadedFile = uploadedFiles.file;
	}

	protected modificationMenuItemSelected(menuGroupTitle: string, menuItemTitle: string) {
		const combineMenuItem = this.menuService.combineMenuItem(
			menuGroupTitle as AvailableSideMenuGroupTitles,
			menuItemTitle as AvailableFiltersMenuItemTitles
		);
		this.menuService.invokeMenuItemFunction(combineMenuItem, this.modificationMenuItemActions);
	}

	protected actionMenuItemSelected(menuGroupTitle: string, menuItemTitle: string) {
		const combineMenuItem = this.menuService.combineMenuItem(
			menuGroupTitle as AvailableActionMenuGroupTitles,
			menuItemTitle as AvailableActionMenuItemTitles
		);
		this.menuService.invokeMenuItemFunction(combineMenuItem, this.actionMenuItemActions);
	}

	protected imageProcessingStatusChange(isProcessing: boolean) {
		// this timeout fixed the change detection issue
		setTimeout(() => (this.isImageProcessing = isProcessing), 0);
	}

	private initMenuItemActions() {
		const combineMenuItem = this.menuService.combineMenuItem;
		const amgt = AvailableSideMenuGroupTitles;
		const afmi = AvailableFiltersMenuItemTitles;
		const aemi = AvailableEffectsMenuItemTitles;
		const atmi = AvailableTransformMenuItemTitles;
		const aamig = AvailableActionMenuGroupTitles;
		const aamii = AvailableActionMenuItemTitles;

		// Side-Menu Filters
		this.modificationMenuItemActions[combineMenuItem(amgt.Filter, afmi.None)] = () => {
			this.imageModification$.next({ ...this.imageModification$.getValue(), filter: PhotonFilters.None });
		};
		this.modificationMenuItemActions[combineMenuItem(amgt.Filter, afmi.lofi)] = () => {
			this.imageModification$.next({ ...this.imageModification$.getValue(), filter: PhotonFilters.LoFi });
		};
		this.modificationMenuItemActions[combineMenuItem(amgt.Filter, afmi.radio)] = () => {
			this.imageModification$.next({ ...this.imageModification$.getValue(), filter: PhotonFilters.Radio });
		};
		this.modificationMenuItemActions[combineMenuItem(amgt.Filter, afmi.Diamante)] = () => {
			this.imageModification$.next({ ...this.imageModification$.getValue(), filter: PhotonFilters.Diamante });
		};
		this.modificationMenuItemActions[combineMenuItem(amgt.Filter, afmi.Liquid)] = () => {
			this.imageModification$.next({ ...this.imageModification$.getValue(), filter: PhotonFilters.Liquid });
		};
		this.modificationMenuItemActions[combineMenuItem(amgt.Filter, afmi.Marine)] = () => {
			this.imageModification$.next({ ...this.imageModification$.getValue(), filter: PhotonFilters.Marine });
		};
		this.modificationMenuItemActions[combineMenuItem(amgt.Filter, afmi.Mauve)] = () => {
			this.imageModification$.next({ ...this.imageModification$.getValue(), filter: PhotonFilters.Mauve });
		};
		this.modificationMenuItemActions[combineMenuItem(amgt.Filter, afmi.Oceanic)] = () => {
			this.imageModification$.next({ ...this.imageModification$.getValue(), filter: PhotonFilters.Oceanic });
		};
		this.modificationMenuItemActions[combineMenuItem(amgt.Filter, afmi.Twenties)] = () => {
			this.imageModification$.next({ ...this.imageModification$.getValue(), filter: PhotonFilters.Twenties });
		};
		this.modificationMenuItemActions[combineMenuItem(amgt.Filter, afmi.Vintage)] = () => {
			this.imageModification$.next({ ...this.imageModification$.getValue(), filter: PhotonFilters.Vintage });
		};
		// Side-Menu Effects
		this.modificationMenuItemActions[combineMenuItem(amgt.Effects, aemi.None)] = () => {
			this.imageModification$.next({ ...this.imageModification$.getValue(), effect: PhotonEffects.None });
		};
		this.modificationMenuItemActions[combineMenuItem(amgt.Effects, aemi.Offset_Red)] = () => {
			this.imageModification$.next({ ...this.imageModification$.getValue(), effect: PhotonEffects.Offset_Red });
		};
		this.modificationMenuItemActions[combineMenuItem(amgt.Effects, aemi.Oil_Painting)] = () => {
			this.imageModification$.next({ ...this.imageModification$.getValue(), effect: PhotonEffects.Oil_Painting });
		};
		this.modificationMenuItemActions[combineMenuItem(amgt.Effects, aemi.Solarize)] = () => {
			this.imageModification$.next({ ...this.imageModification$.getValue(), effect: PhotonEffects.Solarize });
		};
		this.modificationMenuItemActions[combineMenuItem(amgt.Effects, aemi.Ryo)] = () => {
			this.imageModification$.next({ ...this.imageModification$.getValue(), effect: PhotonEffects.Ryo });
		};
		// Side-Menu Transform
		this.modificationMenuItemActions[combineMenuItem(amgt.Transform, atmi.None)] = () => {
			this.imageModification$.next({ ...this.imageModification$.getValue(), transform: PhotonTransform.None });
		};
		this.modificationMenuItemActions[combineMenuItem(amgt.Transform, atmi.Flip_Horizontal)] = () => {
			this.imageModification$.next({ ...this.imageModification$.getValue(), transform: PhotonTransform.Flip_Horizontal });
		};
		this.modificationMenuItemActions[combineMenuItem(amgt.Transform, atmi.Flip_Vertical)] = () => {
			this.imageModification$.next({ ...this.imageModification$.getValue(), transform: PhotonTransform.Flip_Vertical });
		};

		// Action-Menu
		this.actionMenuItemActions[combineMenuItem(aamig.Action, aamii.Download_Image)] = () => this.downloadImage();
		this.actionMenuItemActions[combineMenuItem(aamig.Action, aamii.Clear_Image_Modifications)] = () => this.cleanImageModifications();
		this.actionMenuItemActions[combineMenuItem(aamig.Action, aamii.Clear_Image)] = () => this.removeImage();
	}

	private removeImage() {
		this.cleanImageModifications();
		this.uploadedFile = undefined;
		this.hoveredActionMenuItem = "";
	}

	private cleanImageModifications() {
		this.imageModification$.next({ filter: PhotonFilters.None, effect: PhotonEffects.None, transform: PhotonTransform.None });
		this.modificationMenuComponent.resetMenu();
	}

	private downloadImage() {
		const link = document.createElement("a");

		link.href = this.processedImageUrl;
		link.download = "modified_" + this.uploadedFile?.name;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}
}
