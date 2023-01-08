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

  isPostsLoaded : boolean
  isUserDataLoaded : boolean
  posts : Post[]
  user : User

  constructor(
    private userService : UserService,
    private postService : PostService,
    private commentService : CommentService,
    private notificationService : NotificationService,
    private imageService : ImageUploadService
  ) {
    this.isPostsLoaded = false
    this.isUserDataLoaded = false
    this.posts = []
    this.user = {bio: "", confirmPassword: "",
                  email: "", firstName: "", lastName: "",
                  password: "", username: ""}
  }

  ngOnInit(): void {
    this.postService.getAllPosts()
      .subscribe(data => {
        this.posts = data
        this.getImagesToPosts(this.posts)
        this.getCommentsToPosts(this.posts)
        this.isPostsLoaded = true
      })

    this.userService.getCurrentUser()
      .subscribe(user => {
        this.user = user
        this.isUserDataLoaded = true
      })
  }

  getImagesToPosts(posts : Post[]) : void {
    posts.forEach(post => {
      this.imageService.getImageToPost(post.id)
        .subscribe(image => {
          post.image = image.imageBytes
        })
    })
  }

  getCommentsToPosts(post : Post[]) : void {
    post.forEach(post => {
      this.commentService.getAllCommentsForPost(post.id)
        .subscribe(comment => {
          post.comments = comment
        })
    })
  }

  likePost(postId : number | any, postIndex : number | any) : void {
    const post = this.posts[postIndex]
    const {username} = this.user
    if(!post.usersLiked?.includes(username)) {
      this.postService.likePost(postId, username)
        .subscribe(() => {
          post.usersLiked?.push(username)
          this.notificationService.showSnackBar('Like post')
        })
    }
    else
      this.postService.likePost(postId, username)
        .subscribe(() => {
          const index : number | any = post.usersLiked?.indexOf(username, 0)
          if(index > -1) {
            post.usersLiked?.splice(index, 1)
          }
        })
  }

  postComment(event: any, postId : number | any, postIndex : number) : void {
    const post = this.posts[postIndex]
    const message = event.target.value
    event.target.value = ''
    this.commentService.saveComment(postId, {
      message,
      'username' : this.user.username
    }).subscribe(data => {
      post.comments?.push(data)
    })
  }

  formatImage(image : any) : any {
    return image ? `data:image/jpeg;base64,${image}` : null
  }
}
