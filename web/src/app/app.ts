import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ToastComponent } from "./common-ui/toast/toast";

@Component({
  selector: 'app-root',
  imports: [RouterModule, HttpClientModule, ToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('pyunit');
}
