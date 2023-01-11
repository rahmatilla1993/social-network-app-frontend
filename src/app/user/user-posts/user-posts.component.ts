import {Component, OnInit} from '@angular/core';
import {Post} from "../../models/Post";
import {PostService} from "../../services/post.service";
import {ImageUploadService} from "../../services/image-upload.service";
import {NotificationService} from "../../services/notification.service";
import {CommentService} from "../../services/comment.service";

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements OnInit {
  isUserPostsLoaded: boolean = false
  posts: Post[] = []

  constructor(
    private postService: PostService,
    private imageService: ImageUploadService,
    private notificationService: NotificationService,
    private commentService: CommentService
  ) {
  }

  ngOnInit(): void {
    this.postService.getAllPostsForCurrentUser()
      .subscribe(posts => {
        this.posts = posts
        this.getImagesToPosts(this.posts)
        this.getCommentsToPosts(this.posts)
        this.isUserPostsLoaded = true
      })
  }

  formatImage(image: any) {
    return image ? `data:image/jpeg;base64,${image}` : null
  }

  getImagesToPosts(posts: Post[]): void {
    posts.forEach(post => {
      this.imageService.getImageToPost(post.id)
        .subscribe(image => {
          post.image = image.imageBytes
        })
    })
  }

  getCommentsToPosts(posts: Post[]): void {
    posts.forEach(post => {
      this.commentService.getAllCommentsForPost(post.id)
        .subscribe(comments => {
          post.comments = comments
        })
    })
  }

  removePost(post: Post, index: number): void {
    const isConfirm = confirm('Are you sure delete this post?')
    isConfirm && this.postService.deletePost(post.id)
      .subscribe(({message}) => {
        this.notificationService.showSnackBar(message)
        this.posts.splice(index, 1)
      })
  }

  deleteComment(id: number | any, postIndex: number, commentIndex: number): void {
    this.commentService.deleteComment(id)
      .subscribe(({message}) => {
        this.notificationService.showSnackBar(message)
        const post = this.posts[postIndex]
        post.comments?.splice(commentIndex, 1)
      })
  }
}
