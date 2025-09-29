import { Component, EnvironmentInjector, OnInit } from '@angular/core';
import { HeaderComponent } from "../base/header/header.component";
import { Router } from "@angular/router";
import { DashboardServiceService } from '../../services/dashboard-service.service'
import { Veiculo, VeiculoData, Veiculos, VeiculosAPI } from '../../models/veiculo.model';

@Component({
  selector: 'app-dashboard',
  imports: [HeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  constructor(private dashboard: DashboardServiceService, router: Router) { }

  vehicle: Veiculo = {} as Veiculo;
  vehicles: Veiculos = [];

  foundVehiclesData: VeiculoData | null = null;
  searchError: string | null = null;


  ngOnInit(): void {
    this.getVehicles();
  }

  getVehicles() {
    this.dashboard.getVehicles().subscribe((vehicle: VeiculosAPI) => {
      this.vehicles = vehicle.vehicles;
    })
  }

  getSelectVehicle(event: Event): void {
    const select = event.target as HTMLSelectElement;
    for(let vehicle of this.vehicles) {
      if(vehicle.id == select.value){
        this.vehicle = vehicle
      }
    }
  }

  

  searchByVin(vin: string): void {
    if(!vin) return;
    this.foundVehiclesData = null;
    this.searchError = null;

    this.dashboard.getVehiclesData(vin).subscribe({
      next:(data) => {
        this.foundVehiclesData=data
      },

      error:(err) => {
        console.error("erro");
        this.searchError = err.error.message || "falhou na busca"
      }
    })
  }
}
