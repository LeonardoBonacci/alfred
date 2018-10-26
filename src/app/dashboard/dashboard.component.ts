import { Component, OnInit } from '@angular/core';
import { Quote } from '../quote';
import { QuoteService } from '../quote.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  quotes: Quote[] = [];

  constructor(private quoteService: QuoteService) { }

  ngOnInit() {
    this.getQuotes();
  }

  getQuotes(): void {
    this.quotes = [];
    this.quoteService.getQuotes()
            .subscribe(
                x => {
                     console.log('getQuotes next value: ' + x.saying);
                     if (this.quotes.length < 4)
                        this.quotes.push(x);
                },
                err => console.error('getQuotes failed: ' + err),
                () => console.log('getQuotes completed')
            );
    }
}
