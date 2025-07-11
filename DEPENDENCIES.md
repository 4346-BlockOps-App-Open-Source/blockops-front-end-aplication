# BlockOps Front-End Application - Dependencies Guide

This document provides a comprehensive list of dependencies required to run the BlockOps front-end application, along with installation commands and setup instructions.

## Required Dependencies

### Core Angular Packages

- `@angular/animations`: 17.3.12
- `@angular/common`: 17.3.12
- `@angular/compiler`: 17.3.12
- `@angular/core`: 17.3.12
- `@angular/forms`: 17.3.12
- `@angular/platform-browser`: 17.3.12
- `@angular/platform-browser-dynamic`: 17.3.12
- `@angular/router`: 17.3.12

### International Support

- `@ngx-translate/core`: 16.0.4
- `@ngx-translate/http-loader`: 16.0.1

### Support Libraries

- `rxjs`: 7.8.2
- `tslib`: 2.8.1
- `zone.js`: 0.11.8 (Note: There's a dependency conflict with newer Angular versions)

### Development Tools

- `@angular-devkit/build-angular`: 17.3.17
- `@angular/cli`: 19.2.11
- `@angular/compiler-cli`: 17.3.12
- `typescript`: 5.2.2

### Testing Libraries

- `@types/jasmine`: 5.1.8
- `jasmine-core`: 5.6.0
- `karma`: 6.4.4
- `karma-chrome-launcher`: 3.2.0
- `karma-coverage`: 2.2.1
- `karma-jasmine`: 5.1.0
- `karma-jasmine-html-reporter`: 2.1.0

## Installation Commands

### Setting up a new project

```bash
# Install Angular CLI globally
npm install -g @angular/cli

# Create a new Angular project (if needed)
ng new blockops-front-end-application
cd blockops-front-end-application
```

### Installing dependencies for an existing project

Due to dependency conflicts between Angular 17.3.12 and the current zone.js version, you must use the `--legacy-peer-deps` flag:

```bash
# Navigate to the project directory
cd blockops-front-end-aplication

# Install all dependencies from package.json
npm install --legacy-peer-deps

# Or install individual packages
npm install @angular/core @angular/common @angular/forms @angular/router --legacy-peer-deps
npm install @ngx-translate/core @ngx-translate/http-loader --legacy-peer-deps
```

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd blockops-front-end-aplication
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Run the development server**
   ```bash
   ng serve
   ```
   The application will be available at `http://localhost:4200/`

4. **Build for production**
   ```bash
   ng build --configuration production
   ```
   The build artifacts will be stored in the `dist/` directory.

## Important Notes About Legacy Peer Dependencies

This project requires the use of the `--legacy-peer-deps` flag when installing packages due to a dependency conflict:

- Angular 17.3.12 expects zone.js v0.14.0
- The project is currently using zone.js v0.11.4

Using the `--legacy-peer-deps` flag allows npm to bypass peer dependency checks. While this works for development purposes, a more sustainable long-term solution would be to either:

1. Upgrade zone.js to version 0.14.0 (which may require other code changes), or
2. Downgrade Angular to a version compatible with zone.js v0.11.4

## Troubleshooting

If you encounter compilation errors related to missing modules:

1. Make sure all standalone components import the necessary modules:
   - `CommonModule` for ngFor, ngIf, and pipes like titlecase
   - `FormsModule` for ngModel bindings
   - `RouterModule` for navigation functions

2. Check that all dependencies were installed with the `--legacy-peer-deps` flag

3. Clear npm cache if issues persist:
   ```bash
   npm cache clean --force
   ```

