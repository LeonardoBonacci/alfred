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
    this.quotes = [];
    this.quoteService.getQuotes()
            .subscribe(
                x => {
                        this.quotes.push(x);
                },
                err => console.error('getQuotes failed: ' + err),
                () => console.log('getQuotes completed')
            );
    }

  add(saying: string): void {
    saying = saying.trim();
    if (!saying) { return; }
    
    const q: Quote = {
     id: '',
     saying: saying,
     author: 'you'    
    };
    
    this.quoteService.addQuote(q)
      .subscribe(quote => {
        this.getQuotes();
//        this.quotes.push(quote);
      });
  }
 
  delete(quote: Quote): void {
    this.quotes = this.quotes.filter(q => q !== quote);
    this.quoteService.deleteQuote(quote).subscribe();
  }
}
