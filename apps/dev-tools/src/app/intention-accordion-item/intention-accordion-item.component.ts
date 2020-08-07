import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
import { Intention } from '@scion/microfrontend-platform';

@Component({
  selector: 'devtools-intention-accordion-item',
  templateUrl: './intention-accordion-item.component.html',
  styleUrls: ['./intention-accordion-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntentionAccordionItemComponent implements OnChanges {

  public unhandled$: Observable<boolean>;

  @Input()
  public intention: Intention;

  constructor() {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    // this.unhandled$ = this._manifestRegistryService.capabilityProviders$(this.intent.metadata.id)
    //   .pipe(map(providers => providers.length === 0));
  }
}
