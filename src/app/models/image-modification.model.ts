import { PhotonEffects, PhotonFilters, PhotonTransform } from "./photon-enums";

export interface IImageModification {
	effect: PhotonEffects;
	filter: PhotonFilters;
	transform: PhotonTransform;
}
