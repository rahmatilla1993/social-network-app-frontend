import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Post} from "../models/Post";
import {Observable} from "rxjs";
import * as https from "https";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  // private POST_API = 'https://spring-boot-social-network.herokuapp.com/api/post'
  private POST_API = 'http://localhost:8080/api/post'

  constructor(private http : HttpClient) { }

  createPost(post : Post) : Observable<Post> {
    // @ts-ignore
    return this.http.post(`${this.POST_API}/create`,post)
  }

  getAllPosts() : Observable<Post[]> {
    // @ts-ignore
    return this.http.get(`${this.POST_API}/all`)
  }

  getAllPostsForCurrentUser() : Observable<Post[]> {
    // @ts-ignore
    return this.http.get(`${this.POST_API}/user/posts`)
  }

  likePost(postId : number, username : string) : Observable<Post> {
    // @ts-ignore
    return this.http.post(`${this.POST_API}/${postId}/${username}/like`)
  }

  deletePost(postId : number) : Observable<any> {
    // @ts-ignore
    return this.http.delete(`${this.POST_API}/${postId}/delete`)
  }
}
