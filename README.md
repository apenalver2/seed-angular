# `seed-angular` — Seed for Angular Systelab projects

This project is an application skeleton for a typical [Angular][Angular] frontend application. You can use it
to quickly bootstrap your projects and dev environment.

The seed contains a Patient Management sample application and is preconfigured to install the Angular
framework and a bunch of development and testing tools for instant development gratification.

The app doesn't do much, just shows how to use different Angular standards and other suggested tools together, including the utilization of the libraries created by Systelab.

## Getting Started

To get you started you can simply clone the `seed-angular` repository and install the dependencies:

### Prerequisites

You need [git][git] to clone the `seed-angular` repository.

You will need [Node.js][node] and [npm][npm].

### Clone `seed-angular`

Clone the `seed-angular` repository using git:

```bash
git clone https://github.com/systelab/seed-angular.git
cd seed-angular
```

If you just want to start a new project without the `seed-angular` commit history then you can do:

```bash
git clone --depth=1 https://github.com/systelab/seed-angular.git <your-project-name>
```

The `depth=1` tells git to only pull down one commit worth of historical data.

### Install Dependencies

To install the dependencies you must run:

```bash
npm install
```

To launch the application you must run:

```bash
ng serve
```

In order to run the application, you need a backend. A JEE Backend is implemented in the https://github.com/systelab/seed-jee repository.

## Docker

### Build docker image

There is an Automated Build Task in Docker Cloud in order to build the Docker Image. 
Autobuild triggers a new build with every git push to your source code repository to create a 'latest' image.
There is another build rule to trigger a new tag and create a 'version-x.y.z' image

You can always manually create the image with the following command:

```bash
docker build -t systelab/seed-angular . 
```

### Run the container

```bash
docker run -d -p 8080:80 systelab/seed-angular
```

The app will be available at http://localhost:8080

You can easily tweak the nginx config in [nginx/default.conf](nginx/default.conf), for example to [configure the server as https](http://nginx.org/en/docs/http/configuring_https_servers.html)

## Going native

Follow the [instructions](ELECTRON.md) to generate native desktop applications.



[git]: https://git-scm.com/
[npm]: https://www.npmjs.com/
[node]: https://nodejs.org
[Angular]: https://angular.io/
