import { Component } from '@angular/core';
import { ApiService } from './api.service'
import { ActivatedRoute } from '@angular/router'

@Component({
    selector: 'login',
    template: `
    <mat-card>
    <mat-card-header>
        <mat-card-title>
            <h2>Profile</h2>
        </mat-card-title>    
    </mat-card-header>
    <mat-card-content>
        <mat-list-item>Name: {{profile?.name}}</mat-list-item>
        <mat-list-item>Email: {{profile?.email}}</mat-list-item>
        <mat-list-item>Description: {{profile?.description}}</mat-list-item>
    </mat-card-content>
    </mat-card>
    <mat-card>
    <mat-card-header>
        <mat-card-title>
            <h2>Posts</h2>
        </mat-card-title>    
    </mat-card-header>
        <mat-card-content>
         <messages></messages>
     </mat-card-content>
    </mat-card>
    `
})
export class ProfileComponent {
    constructor(private apiService: ApiService, private route: ActivatedRoute) { }

    profile

    ngOnInit() {
        var id = this.route.snapshot.params.id
        this.apiService.getProfile(id).subscribe(data => this.profile = data)
    }


}
