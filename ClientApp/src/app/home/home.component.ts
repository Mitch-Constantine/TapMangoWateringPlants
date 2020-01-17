import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {

    constructor(private apiService: ApiService) {}

    plants = [];

    ngOnInit() {
        this.apiService.getPlants().subscribe(data => {
            this.plants = (<Object[]>data).map(row => {
                return {
                    name: row['name'],
                    wateredRecently: row['wateredRecently'],
                    canWater: row['canWater']
                }
            })
        });
    }

    getStatusDescription(plant) {
        if (!plant.canWater)
            return "just watered";

        if (!plant.wateredRecently)
            return "dry";

        return "watered";
    }

    getSelectedIndexes() {

        let selectedIndexes = []
        for (let plantIndex = 0; plantIndex < this.plants.length; plantIndex++) {
            if (this.plants[plantIndex].isSelected) {
                selectedIndexes.push(plantIndex);
            }
        }

        return selectedIndexes;
    }

    startWatering(plantIndex) {
        this.startWateringPlants([plantIndex]);
    }

    startWateringSelected() {
        this.startWateringPlants(this.getSelectedIndexes());
    }

    startWateringPlants(plantIndexes: number[]) {

        // Check with the back end if these plants have been recently watered
        // We need to check with the back end because someone else, on a different browser, might have already watered the plants
        this.apiService.getPlants().subscribe(data => {

            let plantIndexesCantWater = plantIndexes.filter(index => !(<Object[]>data)[index]['canWater']);
            if (plantIndexesCantWater.length > 0) {
                let plantNamesCantWater = plantIndexesCantWater.map(plantIndex => this.plants[plantIndex].name);
                let message = "The following plants have already been watered: " + plantNamesCantWater.join(", ");
                alert(message);
                return;
            }

            for (let plantIndex of plantIndexes) {
                this.plants[plantIndex].startWaterTime = new Date();
                this.plants[plantIndex].isWateringNow = true;
            }

        });
    }

    stopWatering(plantIndex) {
        this.stopWateringPlants([plantIndex]);        
    }


    stopWateringSelected() {
        this.stopWateringPlants(this.getSelectedIndexes());
    }

    stopWateringPlants(plantIndexes) {

        const MIN_WATERING_THRESHOLD = 10 * 1000; // 10 seconds = 10,000 miliseconds

        let now = new Date();
        let plantsWateredIndexes = plantIndexes
            .filter(plantIndex => {
                let startWaterTime = this.plants[plantIndex].startWaterTime;
                let milisElapsed = now.getTime() - startWaterTime;
                return milisElapsed >= MIN_WATERING_THRESHOLD;
            });

        this.apiService.waterPlants(plantsWateredIndexes).subscribe(_ => {

            for (let plantIndex of plantIndexes) {
                this.plants[plantIndex].isWateringNow = false;
                this.plants[plantIndex].startWaterTime = null;
            }

            for (let plantIndex of plantsWateredIndexes) {
                this.plants[plantIndex].wateredRecently = true;
                this.plants[plantIndex].canWater = false;
            }
        })
    }

    displayWaterSelected() {
        return this.plants.some(plant => plant.isSelected && !plant.isWateringNow);          
    }

    displayStopWateringSelected() {
        return this.plants.some(plant => plant.isSelected && plant.isWateringNow);          
    }
}
