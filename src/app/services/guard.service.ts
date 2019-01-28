import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';
import { AppComponent } from '../app.component';

@Injectable()
export class GuardService implements CanActivate, CanActivateChild {
    //Constructor
    constructor(private appComponent: AppComponent) { }
    public canActivate(): boolean {
        return this.appComponent.getLogged();
    }
    public canActivateChild() {
        return true;
    }
}