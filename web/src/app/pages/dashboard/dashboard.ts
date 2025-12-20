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
    // Connect in 'all' mode (legacy) - shows all dryers
    // For individual dryer pages, use connect('single', dryerId) instead
    this.dashboard.connect('all');
  }

  ngOnDestroy(): void {
    this.dashboard.disconnect();
  }
}
