import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute, RoutesRecognized, NavigationEnd } from '@angular/router';
import {filter} from 'rxjs/operators';

@Directive({
  selector: '[appMarkHeaderLink]'
})
export class MarkHeaderLinkDirective {

  constructor(private el: ElementRef,
    private renderer: Renderer2, 
    private router: Router,
    private activatedRoute:ActivatedRoute
    ) {
      router.events.pipe(
        filter(event => event instanceof NavigationEnd)
    )
        .subscribe(event => {
          const nativeElement = el.nativeElement;
           if(nativeElement.id === router.url.substr(1)){
              renderer.setStyle(nativeElement, "borderBottom","1px solid white")
           } else{
              renderer.removeStyle(nativeElement,"borderBottom" )
           }
        });
     }

}
