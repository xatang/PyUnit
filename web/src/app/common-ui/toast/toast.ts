import { Component } from '@angular/core';
import { ToastService } from '../../services/toast';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-toast',
  imports: [NgFor],
  templateUrl: './toast.html',
  styleUrl: './toast.scss'
})
export class ToastComponent {
  constructor(public toastService: ToastService) { }
}
