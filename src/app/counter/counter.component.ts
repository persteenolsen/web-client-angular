import { Component, OnInit } from '@angular/core';


import { StateService } from '@/_services';


@Component({
    selector: 'counter-page',
    templateUrl: './counter.component.html'
})

export class CounterComponent implements OnInit {
    
	count = this.stateService.count$;

    constructor(private stateService: StateService) {}

    increment() {
        this.stateService.increment();
    }

    decrement() {
        this.stateService.decrement();
    }

    ngOnInit() {
      
	  // Just testing :-)
      // alert( "State Demo with Rxjs ! " ) ;
    }

}