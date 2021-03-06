 import { Component } from '@angular/core'
import { ApiService } from './api.service'

@Component({
  selector: 'post',
  template: `<mat-card>
  <mat-card-header>
      <mat-card-title>
          <h2> New Post</h2>
      </mat-card-title>
  </mat-card-header>
  <mat-card-content>
      <form>
           <mat-input-container style="width: 85%">
              <textarea [(ngModel)]="postMsg" name="description" matInput placeholder="Post Message"></textarea>
          </mat-input-container>
          <br>
          <button (click)="post()" mat-raised-button color="primary">Post</button>
      </form>
  </mat-card-content>
</mat-card>`

})

export class PostComponent {
  constructor( private apiService: ApiService){}
  postMsg = ''  
  post() {
    this.apiService.postMessage({msg: this.postMsg})    
}

 
}
