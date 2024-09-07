# Effectograph

Effectograph is a simple web application for applying image effects and filters. Built with Angular, it allows users to upload images and apply various modifications easily.

## Features

- Image upload with drag-and-drop functionality
- Apply various filters (e.g., LoFi, Radio, Diamante, Oceanic)
- Apply effects (e.g., Oil Painting, Solarize, Offset Red)
- Transform images (Flip Horizontal, Flip Vertical)
- Download modified images

## Technologies Used

- Angular 18
- RxJS
- Tailwind
- silvia-odwyer/photon for image processing via WebAssembly

## Known Issues

1. **Image Download on iOS Chrome**: You can't download modified images when using the Chrome browser on iOS devices.
   - Workaround: Try using Safari or another browser on iOS, or use a desktop browser for downloading images.

2. **Slow Filter Application**: Some filters might take a bit longer to apply, especially on larger images or less powerful devices.
   - I'm working on optimizing filter performance in future updates.
   - For now, using smaller images or trying a different filter might help if one is particularly slow.

## Roadmap

### Short-term Goals

- [ ] **Allow Multiple Image Uploads**: Enable users to upload and edit multiple images at once.
- [ ] **Edit File Metadata**: Provide functionality to edit the metadata of the uploaded images.

### Mid-term Goals

- [ ] **Image Cropping**: Allow users to crop images to a specific aspect ratio.
- [ ] **Image Resizing**: Provide options to resize images to different dimensions.
- [ ] **Image Rotation**: Allow users to rotate images by specific angles.

### Long-term Goals

- [ ] **Image Format Conversion**: Enable conversion between different image formats (e.g., PNG to JPG).
- [ ] **More Image Effects**: Add more effects to the image editing process.
- [ ] **User Authentication**: Implement user authentication to allow users to save their favorite images and effects.
- [ ] **Image Sharing**: Allow users to share their edited images with others.
- [ ] **Performance Optimization**: Improve the performance of filter applications, especially for larger images.

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
	```
	git clone https://github.com/l-Vladislav/effectograph.git
	cd effectograph
	```

2. Install dependencies:
	```
	npm install
	```

### Running the Application

To start the development server:
npm start

Navigate to `http://localhost:4200/`.
The application will automatically reload if you change any of the source files.

### Building for Production

To build the project for production:
```
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Running Tests

To execute the unit tests:
```
npm test
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments
- Silvia O'Dwyer for the Photon library used for image processing
