import { PresetsPage } from './pages/presets/presets';
import { LogsPage } from './pages/logs/logs';
import { Routes } from '@angular/router';
import { DashboardPage } from './pages/dashboard/dashboard';
import { DashboardDryer } from './pages/dashboard/dashboard-dryer/dashboard-dryer';
import { LayoutComponent } from './common-ui/layout/layout';
import { ConfigsPage } from './pages/configs/configs';
import { DryerChartEmbed } from './pages/embed/dryer-chart-embed/dryer-chart-embed';
import { DryerControlEmbed } from './pages/embed/dryer-control-embed/dryer-control-embed';
import { WelcomePage } from './pages/welcome/welcome';
import { setupGuard } from './guards/setup.guard';
import { MoonrakerConfigPage } from './pages/configs/moonraker-config/moonraker-config';
import { DryerConfigPage } from './pages/configs/dryer-config/dryer-config';

export const routes: Routes = [
    // Welcome page (no layout, no guard)
    { path: 'welcome', component: WelcomePage },

    // Main application routes with layout and setup guard
    {
        path: "", component: LayoutComponent, canActivate: [setupGuard], children: [
            { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
            { path: 'dashboard', component: DashboardPage },
            { path: 'dashboard/:dryerId', component: DashboardDryer },
            { path: 'presets', component: PresetsPage },
            { path: 'logs', component: LogsPage },
            { path: 'config', component: ConfigsPage },
        ]
    },

    // Config pages with layout but WITHOUT guard (needed for setup)
    {
        path: "configs", component: LayoutComponent, children: [
            { path: 'moonraker', component: MoonrakerConfigPage },
            { path: 'dryer', component: DryerConfigPage },
        ]
    },

    // Embedded pages for Klipper HTTP camera (4:3 aspect ratio, no layout)
    { path: 'embed/dryer/:dryerId/chart', component: DryerChartEmbed },
    { path: 'embed/dryer/:dryerId/control', component: DryerControlEmbed }
];

