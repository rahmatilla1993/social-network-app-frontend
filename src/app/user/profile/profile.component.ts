import {Component, OnInit} from '@angular/core';
import {User} from "../../models/User";
import {TokenStorageService} from "../../services/token-storage.service";
import {PostService} from "../../services/post.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {NotificationService} from "../../services/notification.service";
import {ImageUploadService} from "../../services/image-upload.service";
import {UserService} from "../../services/user.service";
import {EditUserComponent} from "../edit-user/edit-user.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  isUserDataLoaded = false
  user: User
  selectedFile: File | any
  userProfileImage: File | any
  previewImgURL: any

  constructor(
    private tokenService: TokenStorageService,
    private postService: PostService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private imageService: ImageUploadService,
    private userService: UserService
  ) {
    this.user = {bio: "", confirmPassword: "",
                  email: "", firstName: "",
                  lastName: "", password: "", username: ""}
  }

  ngOnInit(): void {
    this.userService.getCurrentUser()
      .subscribe(data => {
        this.user = data
        this.isUserDataLoaded = true
      })

    this.imageService.getImageToUser()
      .subscribe(data => {
        this.userProfileImage = data.imageBytes
      })
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(this.selectedFile)
    reader.onload = () => {
      this.previewImgURL = reader.result
    }
  }

  openEditDialog(): void {
    const dialogUserEditConfig = new MatDialogConfig()
    dialogUserEditConfig.width = '400px'
    dialogUserEditConfig.data = {
      user: this.user
    }
    this.dialog.open(EditUserComponent, dialogUserEditConfig)
  }

  formatImage(img: any): any {
    return img ? `data:image/jpeg;base64,${img}` : null
  }

  onUpload() {
    if (this.selectedFile) {
      this.imageService.uploadImageToUser(this.selectedFile)
        .subscribe(() => {
          this.notificationService.showSnackBar('Profile image upload')
        })
    }
  }
}
