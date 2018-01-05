import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  template: `
              <mat-toolbar> 
              Social
              <span style = "flex: 1 1 auto"></span>
              <a routerLink="/register"><button class="btn btn-success pull-right"> Register</button></a>
              </mat-toolbar>
              <router-outlet></router-outlet> `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my app';
}
