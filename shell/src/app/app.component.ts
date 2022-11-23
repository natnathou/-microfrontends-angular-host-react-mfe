import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {
  EVENT_NAME_TO_BE_UPDATED_FROM_MFE_ROUTING_CHANGES,
  EVENT_NAME_TO_UPDATE_MFE_FROM_ROUTING_CHANGES,
} from './components/wrapper.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'mfe1';

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((obs) => {
      if (
        obs instanceof NavigationEnd &&
        EVENT_NAME_TO_UPDATE_MFE_FROM_ROUTING_CHANGES
      ) {
        const customEvent = new CustomEvent(
          EVENT_NAME_TO_UPDATE_MFE_FROM_ROUTING_CHANGES,
          {
            detail: obs.url,
          }
        );
        window.dispatchEvent(customEvent);
      }
    });

    window.addEventListener(
      EVENT_NAME_TO_BE_UPDATED_FROM_MFE_ROUTING_CHANGES,
      (event: Event) => {
        const customEvent = event as CustomEvent;
        if (this.router.url !== customEvent.detail) {
          this.router.navigateByUrl(customEvent.detail);
        }
      }
    );
  }

  ngOnDestroy() {
    window.removeEventListener(
      EVENT_NAME_TO_BE_UPDATED_FROM_MFE_ROUTING_CHANGES,
      () => {
        console.log(
          `${EVENT_NAME_TO_BE_UPDATED_FROM_MFE_ROUTING_CHANGES} event is removed from shell`
        );
      }
    );
  }
}
