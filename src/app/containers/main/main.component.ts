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
	AvailableTransformMenuItemTitles
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

	selectedFilter: PhotonFilters = PhotonFilters.None;
	selectedEffect: PhotonEffects = PhotonEffects.None;
	selectedTransform: PhotonTransform = PhotonTransform.None;

	hoveredActionMenuItem = "";

	isImageProcessing = false;
	menuGroups: IMenuGroup[] = [];
	menuItemActions: MenuItemAction = {};

	constructor(private menuService: MenuService) {
		this.menuGroups = menuService.getMockupMenuGroups();
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

	menuItemSelected(menuGroupTitle: string, menuItemTitle: string) {
		const combineMenuItem = this.menuService.combineMenuItem(
			menuGroupTitle as AvailableMenuGroupTitles,
			menuItemTitle as AvailableFiltersMenuItemTitles
		);
		this.menuService.invokeMenuItemFunction(combineMenuItem, this.menuItemActions);
	}

	imageProcessingStatusChange(isProcessing: boolean) {
		setTimeout(() => (this.isImageProcessing = isProcessing), 0);
	}

	initMenuItemActions() {
		const combineMenuItem = this.menuService.combineMenuItem;
		const amgt = AvailableMenuGroupTitles;
		const afmi = AvailableFiltersMenuItemTitles;
		const aemi = AvailableEffectsMenuItemTitles;
		const atmi = AvailableTransformMenuItemTitles;

		this.menuItemActions[combineMenuItem(amgt.Filter, afmi.None)] = () => (this.selectedFilter = PhotonFilters.None);
		this.menuItemActions[combineMenuItem(amgt.Filter, afmi.lofi)] = () => (this.selectedFilter = PhotonFilters.LoFi);
		this.menuItemActions[combineMenuItem(amgt.Filter, afmi.radio)] = () => (this.selectedFilter = PhotonFilters.Radio);
		this.menuItemActions[combineMenuItem(amgt.Filter, afmi.Diamante)] = () => (this.selectedFilter = PhotonFilters.Diamante);
		this.menuItemActions[combineMenuItem(amgt.Filter, afmi.Liquid)] = () => (this.selectedFilter = PhotonFilters.Liquid);
		this.menuItemActions[combineMenuItem(amgt.Filter, afmi.Marine)] = () => (this.selectedFilter = PhotonFilters.Marine);
		this.menuItemActions[combineMenuItem(amgt.Filter, afmi.Mauve)] = () => (this.selectedFilter = PhotonFilters.Mauve);
		this.menuItemActions[combineMenuItem(amgt.Filter, afmi.Oceanic)] = () => (this.selectedFilter = PhotonFilters.Oceanic);
		this.menuItemActions[combineMenuItem(amgt.Filter, afmi.Twenties)] = () => (this.selectedFilter = PhotonFilters.Twenties);
		this.menuItemActions[combineMenuItem(amgt.Filter, afmi.Vintage)] = () => (this.selectedFilter = PhotonFilters.Vintage);

		this.menuItemActions[combineMenuItem(amgt.Effects, aemi.None)] = () => (this.selectedEffect = PhotonEffects.None);
		this.menuItemActions[combineMenuItem(amgt.Effects, aemi.Offset_Red)] = () => (this.selectedEffect = PhotonEffects.Offset_Red);
		this.menuItemActions[combineMenuItem(amgt.Effects, aemi.Oil_Painting)] = () => (this.selectedEffect = PhotonEffects.Oil_Painting);
		this.menuItemActions[combineMenuItem(amgt.Effects, aemi.Ryo)] = () => (this.selectedEffect = PhotonEffects.Ryo);
		this.menuItemActions[combineMenuItem(amgt.Effects, aemi.Solarize)] = () => (this.selectedEffect = PhotonEffects.Solarize);

		this.menuItemActions[combineMenuItem(amgt.Transform, atmi.None)] = () => (this.selectedTransform = PhotonTransform.None);
		this.menuItemActions[combineMenuItem(amgt.Transform, atmi.Flip_Horizontal)] = () => (this.selectedTransform = PhotonTransform.Flip_Horizontal);
		this.menuItemActions[combineMenuItem(amgt.Transform, atmi.Flip_Vertical)] = () => (this.selectedTransform = PhotonTransform.Flip_Vertical);
	}
}
