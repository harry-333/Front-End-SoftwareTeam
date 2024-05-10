import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { CsrfService } from './services/csrf.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private _router: Subscription;

  constructor(private router: Router, private csrfService: CsrfService) {
  }

  ngOnInit() {
    this._router = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const body = document.getElementsByTagName('body')[0];
      const modalBackdrop = document.getElementsByClassName('modal-backdrop')[0];
      if (body.classList.contains('modal-open')) {
        body.classList.remove('modal-open');
      }
      if (modalBackdrop) {
        modalBackdrop.remove();
      }
    });

    this.csrfService.getCsrfToken().subscribe();
  }

}
