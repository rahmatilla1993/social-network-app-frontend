import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/User";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private USER_API = 'https://spring-boot-social-network.herokuapp.com/api/user'

  constructor(private http :  HttpClient) { }

  getCurrentUser() : Observable<any> {
    // @ts-ignore
    return this.http.get(this.USER_API)
  }

  getUserById(userId : string) : Observable<User> {
    // @ts-ignore
    return this.http.get(`${this.USER_API}/${userId}`)
  }

  updateUserProfile(user : User) : Observable<User> {
    // @ts-ignore
    return this.http.put(`${this.USER_API}/update`,user)
  }
}
