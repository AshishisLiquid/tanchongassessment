import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { User } from './users.types';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {}


  getUsers(): Observable<User[]>{
    return this.httpClient.get<User[]>('http://localhost:3000/getUsers')
  }

  getUser(id: string): Observable<User>{
    return this.httpClient.get<User>(`http://localhost:3000/getUser/${id}`)
  }

  createUser(user: User): Observable<User>{
    return this.httpClient.post<User>('http://localhost:3000/createUser', user)
  }

  updateUser(user: User, id: string): Observable<User>{
    return this.httpClient.put<User>(`http://localhost:3000/updateUser/${id}`, user)
  }

  deleteUser(id: string): Observable<User>{
    return this.httpClient.delete<User>(`http://localhost:3000/deleteUser/${id}`)
  }
}
