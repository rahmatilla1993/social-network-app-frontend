import {Component, OnInit} from '@angular/core';
import {Post} from "../../models/Post";
import {User} from "../../models/User";
import {UserService} from "../../services/user.service";
import {PostService} from "../../services/post.service";
import {CommentService} from "../../services/comment.service";
import {NotificationService} from "../../services/notification.service";
import {ImageUploadService} from "../../services/image-upload.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit{

  isPostsLoaded : boolean = false
  isUserDataLoaded : boolean = false
  posts : Post[] = []
  user : User | any

  constructor(
    private userService : UserService,
    private postService : PostService,
    private commentService : CommentService,
    private notificationService : NotificationService,
    private imageService : ImageUploadService
  ) { }

  ngOnInit(): void {

  }



}
