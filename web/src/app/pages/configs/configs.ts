import { Component } from '@angular/core';
import { MoonrakerConfigPage } from "./moonraker-config/moonraker-config";
import { DryerConfigPage } from "./dryer-config/dryer-config";

@Component({
  selector: 'app-configs',
  imports: [MoonrakerConfigPage, DryerConfigPage],
  templateUrl: './configs.html',
  styleUrl: './configs.scss'
})
export class ConfigsPage {
}
