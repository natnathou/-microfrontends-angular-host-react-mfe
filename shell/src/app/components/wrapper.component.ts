import {
  AfterContentInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { KeyRegistry, registry } from '../../tools/registry';
export const EVENT_NAME_TO_BE_UPDATED_FROM_MFE_ROUTING_CHANGES =
  'shell_router_event_name';
export const EVENT_NAME_TO_UPDATE_MFE_FROM_ROUTING_CHANGES = 'mf1-event-name';

@Component({
  selector: `app-wrapper`,
  template: '<div #vc></div>',
})
export class WrapperComponent implements AfterContentInit {
  @ViewChild('vc', { read: ElementRef, static: true })
  vc: ElementRef;

  @Input() elementName: string;
  @Input() importName: string;
  @Input() isReact: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngAfterContentInit(): void {
    const elementName = this.route.snapshot.data['elementName']
      ? this.route.snapshot.data['elementName']
      : this.elementName;
    const importName = this.route.snapshot.data['importName']
      ? this.route.snapshot.data['importName']
      : this.importName;
    const isReact = this.route.snapshot.data['isReact']
      ? this.route.snapshot.data['isReact']
      : this.isReact;


    const importFn = registry[importName as KeyRegistry];
    importFn()
      .then((_: any) => {
        console.debug(`element ${elementName} loaded!`);
        if (isReact) {
          _.mount(
            this.vc.nativeElement,
            EVENT_NAME_TO_BE_UPDATED_FROM_MFE_ROUTING_CHANGES,
            EVENT_NAME_TO_UPDATE_MFE_FROM_ROUTING_CHANGES,
            this.router.url
          );
        } else {
          _.mount(
            elementName,
            EVENT_NAME_TO_BE_UPDATED_FROM_MFE_ROUTING_CHANGES,
            EVENT_NAME_TO_UPDATE_MFE_FROM_ROUTING_CHANGES,
            this.router.url
          );
          const element = document.createElement(elementName);
          this.vc.nativeElement.appendChild(element);
        }
        if (!isReact) {

        }
      })
      .catch((err: any) => console.error(`error loading ${elementName}:`, err));


  }
}
