import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "../models/Post";

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  // private IMAGE_API = 'https://spring-boot-social-network.herokuapp.com/api/image'
  private IMAGE_API = 'http://localhost:8080/api/image'

  constructor(private http: HttpClient) { }

  uploadImageToUser(file : File) : Observable<any> {
    const uploadData = new FormData()
    uploadData.set('file', file)
    return this.http.post(`${this.IMAGE_API}/upload`, uploadData)
  }


  uploadImageToPost(file : File, postId : number | any) : Observable<any> {
    const uploadData = new FormData()
    uploadData.set('file', file)
    return this.http.post(`${this.IMAGE_API}/${postId}/upload`, uploadData)
  }

  getImageToUser() : Observable<any> {
    return this.http.get(`${this.IMAGE_API}/profileImage`)
  }

  getImageToPost(postId: number | any) : Observable<any> {
    return this.http.get(`${this.IMAGE_API}/${postId}/image`)
  }
}
