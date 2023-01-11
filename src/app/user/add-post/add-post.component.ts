import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PostService} from "../../services/post.service";
import {NotificationService} from "../../services/notification.service";
import {UserService} from "../../services/user.service";
import {ImageUploadService} from "../../services/image-upload.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent {
  postForm : FormGroup
  previewImgURL : any
  selectedFile : File | any

  constructor(
    private postService : PostService,
    private notificationService : NotificationService,
    private userService : UserService,
    private formBuilder : FormBuilder,
    private imageService : ImageUploadService,
    private router : Router
    ) {
    this.postForm = this.createForm()
  }

  createForm() : FormGroup {
    return this.formBuilder.group({
      'title' : ['',Validators.required],
      'text' : ['',Validators.required],
      'location' : ['',Validators.required],
    })
}

  onFileSelected(event: any) : void {
    this.selectedFile = event.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(this.selectedFile)
    reader.onload = () => {
      this.previewImgURL = reader.result
    }
  }

  submit() : void{
    this.postService.createPost({...this.postForm.value })
      .subscribe((post) => {
        if(this.selectedFile) {
          this.imageService.uploadImageToPost(this.selectedFile, post.id)
            .subscribe(() => {
              this.notificationService.showSnackBar('Post created')
              this.router.navigate(['/profile'])
            })
        }
      })
  }
}
