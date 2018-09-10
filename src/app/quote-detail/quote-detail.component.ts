import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Quote }         from '../quote';
import { QuoteService }  from '../quote.service';

@Component({
  selector: 'app-quote-detail',
  templateUrl: './quote-detail.component.html',
  styleUrls: [ './quote-detail.component.css' ]
})
export class QuoteDetailComponent implements OnInit {
  @Input() quote: Quote;
    
  constructor(
    private route: ActivatedRoute,
    private quoteService: QuoteService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getQuote();
  }

  getQuote(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.quoteService.getQuote(id)
      .subscribe(quote => this.quote = quote);
  }

  goBack(): void {
    this.location.back();
  }
    
  save(): void {
    this.quoteService.updateQuote(this.quote)
      .subscribe(() => this.goBack());
  }
}
