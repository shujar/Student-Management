import { Component } from '@angular/core';
import { TabComponent } from "./components/tab/tab.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TabComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
