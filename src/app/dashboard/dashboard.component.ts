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
    this.quoteService.getQuotes()
      .subscribe(quotes => this.quotes = quotes.slice(1, 5));
  }
}
