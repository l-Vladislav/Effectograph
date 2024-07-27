import { Component, OnInit } from "@angular/core";
import { MenuComponent } from "../../components/menu/menu.component";
import { FileUploadComponent } from "../../components/file-upload/file-upload.component";
import { IUploadedFile } from "../../models/upload-file.model";
import { DrawImageComponent } from "../../components/image/draw-image/draw-image.component";
import {
	AvailableMenuGroupTitles,
	AvailableFiltersMenuItemTitles,
	MenuItemAction,
	MenuService,
	AvailableEffectsMenuItemTitles,
	AvailableTransformMenuItemTitles,
	AvailableActionMenuGroupTitles,
	AvailableActionMenuItemTitles
} from "../../services/menu.service";
import { PhotonEffects, PhotonFilters, PhotonTransform } from "../../services/photon.service";
import { IMenuGroup } from "../../models/menu-group.model";
import { ActionMenuComponent } from "../../components/action-menu/action-menu.component";

@Component({
	selector: "app-main",
	standalone: true,
	templateUrl: "./main.component.html",
	imports: [FileUploadComponent, MenuComponent, DrawImageComponent, ActionMenuComponent]
})
export class MainComponent implements OnInit {
	uploadedFile?: File;
	imageUrl = "";

	selectedFilter: PhotonFilters = PhotonFilters.None;
	selectedEffect: PhotonEffects = PhotonEffects.None;
	selectedTransform: PhotonTransform = PhotonTransform.None;

	hoveredActionMenuItem = "";

	isImageProcessing = false;

	menuGroups: IMenuGroup[] = [];
	actionMenuGroups: IMenuGroup[] = [];

	modificationMenuItemActions: MenuItemAction = {};
	actionMenuItemActions: MenuItemAction = {};

	constructor(private menuService: MenuService) {
		this.menuGroups = menuService.getMockupMenuGroups();
		this.actionMenuGroups = menuService.getMockupActionMenuGroups();
	}

	ngOnInit(): void {
		this.initMenuItemActions();
	}

	onImageFileUploaded(uploadedFiles: IUploadedFile) {
		this.uploadedFile = uploadedFiles.file;
	}

	removeImage() {
		this.uploadedFile = undefined;
		this.selectedFilter = PhotonFilters.None;
		this.selectedEffect = PhotonEffects.None;
		this.selectedTransform = PhotonTransform.None;
	}

	modificationMenuItemSelected(menuGroupTitle: string, menuItemTitle: string) {
		const combineMenuItem = this.menuService.combineMenuItem(
			menuGroupTitle as AvailableMenuGroupTitles,
			menuItemTitle as AvailableFiltersMenuItemTitles
		);
		this.menuService.invokeMenuItemFunction(combineMenuItem, this.modificationMenuItemActions);
	}

	actionMenuItemSelected(menuGroupTitle: string, menuItemTitle: string) {
		const combineMenuItem = this.menuService.combineMenuItem(
			menuGroupTitle as AvailableMenuGroupTitles,
			menuItemTitle as AvailableFiltersMenuItemTitles
		);
		this.menuService.invokeMenuItemFunction(combineMenuItem, this.actionMenuItemActions);
	}

	imageProcessingStatusChange(isProcessing: boolean) {
		setTimeout(() => (this.isImageProcessing = isProcessing), 0);
	}

	downloadImage() {
		const link = document.createElement("a");

		link.href = this.imageUrl;
		link.download = "test42";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}

	private initMenuItemActions() {
		const combineMenuItem = this.menuService.combineMenuItem;
		const amgt = AvailableMenuGroupTitles;
		const afmi = AvailableFiltersMenuItemTitles;
		const aemi = AvailableEffectsMenuItemTitles;
		const atmi = AvailableTransformMenuItemTitles;
		const aamig = AvailableActionMenuGroupTitles;
		const aamii = AvailableActionMenuItemTitles;

		this.modificationMenuItemActions[combineMenuItem(amgt.Filter, afmi.None)] = () => (this.selectedFilter = PhotonFilters.None);
		this.modificationMenuItemActions[combineMenuItem(amgt.Filter, afmi.lofi)] = () => (this.selectedFilter = PhotonFilters.LoFi);
		this.modificationMenuItemActions[combineMenuItem(amgt.Filter, afmi.radio)] = () => (this.selectedFilter = PhotonFilters.Radio);
		this.modificationMenuItemActions[combineMenuItem(amgt.Filter, afmi.Diamante)] = () => (this.selectedFilter = PhotonFilters.Diamante);
		this.modificationMenuItemActions[combineMenuItem(amgt.Filter, afmi.Liquid)] = () => (this.selectedFilter = PhotonFilters.Liquid);
		this.modificationMenuItemActions[combineMenuItem(amgt.Filter, afmi.Marine)] = () => (this.selectedFilter = PhotonFilters.Marine);
		this.modificationMenuItemActions[combineMenuItem(amgt.Filter, afmi.Mauve)] = () => (this.selectedFilter = PhotonFilters.Mauve);
		this.modificationMenuItemActions[combineMenuItem(amgt.Filter, afmi.Oceanic)] = () => (this.selectedFilter = PhotonFilters.Oceanic);
		this.modificationMenuItemActions[combineMenuItem(amgt.Filter, afmi.Twenties)] = () => (this.selectedFilter = PhotonFilters.Twenties);
		this.modificationMenuItemActions[combineMenuItem(amgt.Filter, afmi.Vintage)] = () => (this.selectedFilter = PhotonFilters.Vintage);

		this.modificationMenuItemActions[combineMenuItem(amgt.Effects, aemi.None)] = () => (this.selectedEffect = PhotonEffects.None);
		this.modificationMenuItemActions[combineMenuItem(amgt.Effects, aemi.Offset_Red)] = () => (this.selectedEffect = PhotonEffects.Offset_Red);
		this.modificationMenuItemActions[combineMenuItem(amgt.Effects, aemi.Oil_Painting)] = () => (this.selectedEffect = PhotonEffects.Oil_Painting);
		this.modificationMenuItemActions[combineMenuItem(amgt.Effects, aemi.Ryo)] = () => (this.selectedEffect = PhotonEffects.Ryo);
		this.modificationMenuItemActions[combineMenuItem(amgt.Effects, aemi.Solarize)] = () => (this.selectedEffect = PhotonEffects.Solarize);

		this.modificationMenuItemActions[combineMenuItem(amgt.Transform, atmi.None)] = () => (this.selectedTransform = PhotonTransform.None);

		this.modificationMenuItemActions[combineMenuItem(amgt.Transform, atmi.Flip_Horizontal)] = () =>
			(this.selectedTransform = PhotonTransform.Flip_Horizontal);
		this.modificationMenuItemActions[combineMenuItem(amgt.Transform, atmi.Flip_Vertical)] = () =>
			(this.selectedTransform = PhotonTransform.Flip_Vertical);

		this.actionMenuItemActions[combineMenuItem(aamig.Action, aamii.Save_Image)] = () => console.log(this.downloadImage());
		this.actionMenuItemActions[combineMenuItem(aamig.Action, aamii.Clear_Image_Modifications)] = () => this.cleanImageModifications();
		this.actionMenuItemActions[combineMenuItem(aamig.Action, aamii.Delete_Image)] = () => (this.uploadedFile = undefined);
	}

	private cleanImageModifications() {
		this.selectedEffect = PhotonEffects.None;
		this.selectedFilter = PhotonFilters.None;
		this.selectedTransform = PhotonTransform.None;
	}
}
