import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/User";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private AUTH_API = 'https://spring-boot-social-network.herokuapp.com/api/auth'

  constructor(private http : HttpClient) { }

  public login(user : any) : Observable<any> {
    return this.http.post(`${this.AUTH_API}/signin`, { ...user })
  }

  public register(user : any) : Observable<any> {
    return this.http.post(`${this.AUTH_API}/signup`,{ ...user })
  }
}
