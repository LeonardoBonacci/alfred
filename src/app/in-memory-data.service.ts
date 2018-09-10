import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const quotes = [
      { id: '11', saying: 'Dont cry because its over, smile because it happened.', author: 'Dr. Seuss'},
      { id: '12', saying: 'Be yourself; everyone else is already taken.', author: 'Oscar Wilde'},
      { id: '13', saying: 'In three words I can sum up everything Ive learned about life: it goes on.', author: 'Robert Frost'},
      { id: '14', saying: 'So many books, so little time.', author: 'Frank Zappa'},
      { id: '15', saying: 'A room without books is like a body without a soul.', author: 'Marcus Tullius Cicero'},
      { id: '16', saying: 'You only live once, but if you do it right, once is enough.', author: 'Mae West'}
    ];
    return {quotes};
  }
}
