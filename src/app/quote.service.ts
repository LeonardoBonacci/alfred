import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Quote } from './quote';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class QuoteService {

  private quotesUrl = 'api/quotes';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET quotes from the server */
  getQuotes (): Observable<Quote[]> {
    return this.http.get<Quote[]>(this.quotesUrl)
      .pipe(
        tap(quotes => this.log('fetched quotes')),
        catchError(this.handleError('getQuotes', []))
      );
  }

  /** GET quote by id. Return `undefined` when id not found */
  getQuoteNo404<Data>(id: string): Observable<Quote> {
    const url = `${this.quotesUrl}/?id=${id}`;
    return this.http.get<Quote[]>(url)
      .pipe(
        map(quotes => quotes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} quote id=${id}`);
        }),
        catchError(this.handleError<Quote>(`getQuote id=${id}`))
      );
  }

  /** GET quote by id. Will 404 if id not found */
  getQuote(id: string): Observable<Quote> {
    const url = `${this.quotesUrl}/${id}`;
    return this.http.get<Quote>(url).pipe(
      tap(_ => this.log(`fetched quote id=${id}`)),
      catchError(this.handleError<Quote>(`getQuote id=${id}`))
    );
  }

  /* GET quotes whose name contains search term */
  searchQuotes(term: string): Observable<Quote[]> {
    if (!term.trim()) {
      // if not search term, return empty quote array.
      return of([]);
    }
    return this.http.get<Quote[]>(`${this.quotesUrl}/?saying=${term}`).pipe(
      tap(_ => this.log(`found quotes matching "${term}"`)),
      catchError(this.handleError<Quote[]>('searchQuotes', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new quote to the server */
  addQuote (quote: Quote): Observable<Quote> {
    return this.http.post<Quote>(this.quotesUrl, quote, httpOptions).pipe(
      tap((quote: Quote) => this.log(`added quote w/ id=${quote.id}`)),
      catchError(this.handleError<Quote>('addQuote'))
    );
  }

  /** DELETE: delete the quote from the server */
  deleteQuote (quote: Quote | number): Observable<Quote> {
    const id = typeof quote === 'number' ? quote : quote.id;
    const url = `${this.quotesUrl}/${id}`;

    return this.http.delete<Quote>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted quote id=${id}`)),
      catchError(this.handleError<Quote>('deleteQuote'))
    );
  }

  /** PUT: update the quote on the server */
  updateQuote (quote: Quote): Observable<any> {
    return this.http.put(this.quotesUrl, quote, httpOptions).pipe(
      tap(_ => this.log(`updated quote id=${quote.id}`)),
      catchError(this.handleError<any>('updateQuote'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a QuoteService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`QuoteService: ${message}`);
  }
}
