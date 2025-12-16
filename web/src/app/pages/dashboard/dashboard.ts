import { Component, OnInit, OnDestroy } from '@angular/core';
import { DashboardDryersPage } from "./dashboard-dryers/dashboard-dryers";
import { DashboardChartsPage } from "./dashboard-charts/dashboard-charts";
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  imports: [DashboardDryersPage, DashboardChartsPage],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardPage implements OnInit, OnDestroy {
  constructor(private dashboard: DashboardService) {}

  ngOnInit(): void {
    this.dashboard.connect();
  }

  ngOnDestroy(): void {
    this.dashboard.disconnect();
  }
}
