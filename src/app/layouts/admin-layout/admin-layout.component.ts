import { Component, OnInit, OnDestroy, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
//import { NavItem, NavItemType } from '../../md/md.module';
import { Subscription } from 'rxjs';
import { Location, LocationStrategy, PathLocationStrategy, PopStateEvent } from '@angular/common';
//import 'rxjs/add/operator/filter';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import PerfectScrollbar from 'perfect-scrollbar';
import { filter } from 'rxjs/operators';


declare const $: any;

@Component({
    selector: 'app-admin-layout',
    templateUrl: './admin-layout.component.html',
    styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
    

    ngOnInit() {
        
    }

}
