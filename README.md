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
- RxJS for state management
- Tailwind CSS for styling
- @silvia-odwyer/photon for image processing via WebAssembly

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
