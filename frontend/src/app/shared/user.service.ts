import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { Hit, User } from './users.types';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {}


  getUsers(limit:Number = 10, page: Number = 0): Observable<Hit>{
    return this.httpClient.get<Hit>(`${environment.apiUrl}getUsers?limit=${limit}&page=${page}`)
  }

  getUser(id: string): Observable<User>{
    return this.httpClient.get<User>(`${environment.apiUrl}getUser?id=${id}`)
  }

  createUser(user: User): Observable<User>{
    return this.httpClient.post<User>(`${environment.apiUrl}createUser`, user)
  }

  updateUser(user: User, id: string): Observable<User>{
    return this.httpClient.put<User>(`${environment.apiUrl}updateUser?id=${id}`, user)
  }

  deleteUser(id: string): Observable<User>{
    return this.httpClient.delete<User>(`${environment.apiUrl}deleteUser?id=${id}`)
  }

  searchUser(query: string, limit:Number = 10, page: Number = 0): Observable<Hit>{
    return this.httpClient.get<Hit>(`${environment.apiUrl}searchUser?query=${query}&limit=${limit}&page=${page}`)
  }
}
