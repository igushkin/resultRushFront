import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';


export class CommonServiceImpl<T> {

  private readonly url: string;

  constructor(url: string,
              private httpClient: HttpClient
  ) {
    this.url = url;
  }

  add(obj: T): Observable<T> {
    return this.httpClient.post<T>(this.url, obj);
  }

  update(obj: T): Observable<T> {
    return this.httpClient.patch<T>(this.url, obj);
  }

  delete(id: number): Observable<T> {
    return this.httpClient.delete<T>(this.url + '/' + id);
  }

  findById(id: number): Observable<T> {
    return this.httpClient.get<T>(this.url + '/' + id);
  }

  findAll(): Observable<T[]> {
    return this.httpClient.get<T[]>(this.url);
  }
}
