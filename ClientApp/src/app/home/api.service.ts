import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    apiUrl = "api/waterplants"; 

    constructor(private httpClient: HttpClient) { }

    getPlants() {
        return this.httpClient.get(this.apiUrl);
    }

    waterPlants(plantIndexes) {
        return this.httpClient.post(this.apiUrl, plantIndexes)
    }
}
