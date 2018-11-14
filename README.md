# PinterestCloneUI

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.4.

## Pre-requisities
### Install Node, Yarn, Angular CLI

`brew install npm` (mac)

`npm --version`
`yarn --version`

Install Angular `npm install -g @angular/cli`
Verify Version `ng -v`

`ng set --global packageManager=yarn`

##Application Setup
Generate Angular App `ng new pinterestclone-ui -routing`

`cd pinterestclone-ui/`

`ng -v`

`npm install`

`npm start`

`cd pinterestclone-ui/src/app/app.module.ts`

Change title to desired text in app-component.html. Modify title variable to see updated changes


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Deployment Strategy

Create Angular as stand-alone app and proxy to backend.

### Configure Backend Proxy
Create `proxy.conf.json`
~~~~
{
  "/backend-server": {
    "target": "http://192.168.22.10/api",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug",
    "pathRewrite": {
      "^/backend-server": ""
    }
  }
}
~~~~

In `package.json`
update `"start": "ng serve"` to `"start": "ng serve --proxy-config proxy.conf.json"`

Any request coming from /backend-server should be redirected to target url. 

### Verify Backend
Access `http://localhost:4200/backend-server`. Should redirect to `http://192.168.22.10/api/`

Test with `http://localhost:4200/backend-server/api/pin`

## Service

### Create Service 
`ng g service services/pin`

It will create pin service in services folder.

`src/app/services/pin.service.ts` & `pin.service.spec.ts`

### Service Usage
Add this service to app.module.ts file
~~~
import { PinService } from './services/pin.service';
~~~
~~~
providers: [PinService],
~~~

Add httpclient module for reading data from server
~~~
import { HttpClientModule } from '@angular/common/http';
~~~
~~~
imports: [
    BrowserModule,
    HttpClientModule
  ],
~~~

Complete `app.module.ts`
~~~
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { PinService } from './services/pin.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [PinService],
  bootstrap: [AppComponent]
})
export class AppModule { }
~~~

### Install rxjs
npm install rxjs@6 rxjs-compat@6 --save


### Add imports to pin.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observerable } from 'rxjs/Observable'


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

constructor(private http:HttpClient) { }

  getPins() {
    return this.http.get('/backend-server/api/pin')
  }


Entire pin.service.ts
~~~~
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observerable } from 'rxjs/Observable'

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class PinService {

  constructor(private http:HttpClient) { }

  getPins() {
    return this.http.get('/backend-server/api/pin')
  }

}
~~~~

## Component

### Create Component 
`ng g component components/admin``

### Router
Add `app-component.ts` in `<router-outlet></router-outlet>`


## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

