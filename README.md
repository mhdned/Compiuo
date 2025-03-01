# Compiuo

#### Image Compression Application

Compiuo is a sample image compression application built with **Express.js**. It allows users to upload and compress images, reducing their file size without sacrificing too much quality.

> Note: This project is intended to be a sample project for my GitHub profile and is not an official release.

## Features

- Upload images in various formats (e.g., JPG, PNG).
- Compress images to reduce file size.
- Simple and easy-to-use interface.
- Built with **Node.js** and **Express.js** for server-side functionality.

## Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/mhdned/compiuo.git
   cd compiuo
   ```

2. Start the application:

   ```bash
   npm start
   ```

3. Open your browser and go to http://localhost:3000/v1 to use the app.

4. Create _uploads_ folder inside project folder

   ```bash
   mkdir uploads
   ```

## Usage

To compress an image, simply upload it via the web interface.
The app will handle the compression and provide you with a download link to the compressed image.

## Running with Docker

You can also run **Compiuo** inside a Docker container.

> Note: This Docker setup and image are not fully completed and may require additional configuration.

1. Build the Docker image:

   ```bash
   docker build -t compiuo:1.0.0 .
   ```

2. Run the container:

   ```bash
   docker run -i -p 8000:8000 --name compiuo-app compiuo:1.0.0
   ```

## Technologies Used

<p align="left">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=nodejs,expressjs,prisma,docker" />
  </a>
</p>

## License

This project is licensed under the **MIT** License.
