import { Injectable } from '@angular/core';
import {User} from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private TOKEN_KEY: string = 'auth-token';
  private USER_KEY: string = 'auth-user';

  constructor() { }

  public saveToken(token : string) : void {
    window.sessionStorage.removeItem(this.TOKEN_KEY)
    window.sessionStorage.setItem(this.TOKEN_KEY, token)
  }

  public getToken() : string {
    // @ts-ignore
    return sessionStorage.getItem(this.TOKEN_KEY)
  }

  public saveUser(user : any) : void {
    window.sessionStorage.removeItem(this.USER_KEY)
    window.sessionStorage.setItem(this.USER_KEY, JSON.stringify(user))
  }

  public getUser() : any {
    // @ts-ignore
    return JSON.parse(sessionStorage.getItem(this.USER_KEY))
  }

  logout() : void {
    window.sessionStorage.clear()
    window.location.reload()
  }


}
