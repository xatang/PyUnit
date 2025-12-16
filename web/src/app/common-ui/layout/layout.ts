import { Component } from '@angular/core';
import { Header } from "../header/header";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [Header, RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class LayoutComponent {

}
