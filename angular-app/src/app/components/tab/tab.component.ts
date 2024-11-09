import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

export enum TabOptions {
  STUDENTS,
  COURSES,
  STUDENT_COURSES
}

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.scss'
})
export class TabComponent implements OnInit {
  tabOptions: typeof TabOptions = TabOptions;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.selectTab(null, TabOptions.STUDENTS);
  }

  selectTab(ev: Event | null, tab: TabOptions) {
    // get previous selected tab
    let selTab = document.querySelectorAll(".tab-selected");

    // clear any previous selected tabs
    selTab.forEach(x => {
      x.classList.remove("tab-selected");
    });

    if(ev) {
      // if click event, then the set selected tab
      let elem = ev.currentTarget as HTMLElement;
      elem.classList.add('tab-selected');
    } else {
      // set first tab as selected
      let elems = document.querySelectorAll(".tab");
      if(elems.length > 0) {
        elems.item(0).classList.add('tab-selected');
      }
    }

    // route to content of selected tab
    if(TabOptions.STUDENTS === tab) {
      this.router.navigate(['/students']);
    } else if(TabOptions.COURSES === tab) {
      this.router.navigate(['/courses']);
    } else {
      this.router.navigate(['/student-courses']);
    }
  }
}
