import { Component} from '@angular/core';
import { NgIf } from '@angular/common';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { AboutComponent } from '../about/about.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf, NavBarComponent, AboutComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor() {}
}
