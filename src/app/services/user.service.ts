import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private USER_API = 'https://spring-boot-social-network.herokuapp.com/api/user'
  // private USER_API = 'http://localhost:8080/api/user'

  constructor(private http :  HttpClient) { }

  getCurrentUser() : Observable<any> {
    return this.http.get(`${this.USER_API}/`)
  }

  getUserById(userId : string) : Observable<any> {
    return this.http.get(`${this.USER_API}/${userId}`)
  }

  updateUserProfile(user : any) : Observable<any> {
    return this.http.put(`${this.USER_API}/update`,user)
  }
}
