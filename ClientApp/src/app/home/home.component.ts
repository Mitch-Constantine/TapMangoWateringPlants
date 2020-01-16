import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
    plants = [
        {
            plantName: "Plant 1",
            isWateringNow : false
        },
        {
            plantName: "Plant 2",
            isWateringNow : false
        },
        {
            plantName: "Plant 3",
            isWateringNow : false
        }
    ]

    setWateringStatus(i: number, status: boolean) {
        this.plants[i].isWateringNow = status;
    }
}
