import { PresetsPage } from './pages/presets/presets';
import { LogsPage } from './pages/logs/logs';
import { Routes } from '@angular/router';
import { DashboardPage } from './pages/dashboard/dashboard';
import { DashboardDryer } from './pages/dashboard/dashboard-dryer/dashboard-dryer';
import { LayoutComponent } from './common-ui/layout/layout';
import { ConfigsPage } from './pages/configs/configs';
import { DryerChartEmbed } from './pages/embed/dryer-chart-embed/dryer-chart-embed';
import { DryerControlEmbed } from './pages/embed/dryer-control-embed/dryer-control-embed';

export const routes: Routes = [
    {
        path: "", component: LayoutComponent, children: [
            { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
            { path: 'dashboard', component: DashboardPage },
            { path: 'dashboard/:dryerId', component: DashboardDryer },
            { path: 'presets', component: PresetsPage },
            { path: 'logs', component: LogsPage },
            { path: 'config', component: ConfigsPage },
        ]
    },
    // Embedded pages for Klipper HTTP camera (4:3 aspect ratio, no layout)
    { path: 'embed/dryer/:dryerId/chart', component: DryerChartEmbed },
    { path: 'embed/dryer/:dryerId/control', component: DryerControlEmbed }
];

