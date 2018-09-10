import { Component, OnInit } from '@angular/core';

import { Quote } from '../quote';
import { QuoteService } from '../quote.service';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {
  quotes: Quote[];

  constructor(private quoteService: QuoteService) { }
    
  ngOnInit() {
      this.getQuotes();
  }
    
  getQuotes(): void {
    this.quoteService.getQuotes()
        .subscribe(quotes => this.quotes = quotes);
  }

  add(saying: string): void {
    saying = saying.trim();
    if (!saying) { return; }
    
    const q: Quote = {
     id: saying,
     saying: saying,
     author: 'bla bla'    
    };
    
    this.quoteService.addQuote(q)
      .subscribe(quote => {
        this.quotes.push(quote);
      });
  }
 
  delete(quote: Quote): void {
    this.quotes = this.quotes.filter(q => q !== quote);
    this.quoteService.deleteQuote(quote).subscribe();
  }
}
