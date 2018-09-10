import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const quotes = [
      { id: '11', saying: 'hi'},
      { id: '12', saying: 'hello'},
      { id: '13', saying: 'how'},
      { id: '14', saying: 'are'}
    ];
    return {quotes};
  }
}
