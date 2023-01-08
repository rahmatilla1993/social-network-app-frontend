import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Comment} from "../models/Comment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  // private COMMENT_API : string = 'https://spring-boot-social-network.herokuapp.com/api/comment'
  private COMMENT_API : string = 'http://localhost:8080/api/comment'

  constructor(private http : HttpClient) { }

  saveComment(postId : number, comment : Comment) : Observable<Comment> {
    // @ts-ignore
    return this.http.post(`${this.COMMENT_API}/${postId}/create`, comment)
  }

  getAllCommentsForPost(postId: number | any) : Observable<Comment[]> {
    // @ts-ignore
    return this.http.get(`${this.COMMENT_API}/${postId}/all`)
  }

  deleteComment(commentId : number) : Observable<any> {
    return this.http.delete(`${this.COMMENT_API}/${commentId}/delete`)
  }
}
