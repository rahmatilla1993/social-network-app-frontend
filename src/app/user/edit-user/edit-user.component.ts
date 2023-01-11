import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotificationService} from "../../services/notification.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  profileEditForm: FormGroup

  constructor(
    private dialogRef: MatDialogRef<EditUserComponent>,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService
  ) {
    this.profileEditForm = this.createProfileForm()
  }

  createProfileForm(): FormGroup {
    return this.formBuilder.group({
      'firstName': [this.data.user.firstName, Validators.required],
      'lastName': [this.data.user.lastName, Validators.required],
      'bio': [this.data.user.bio, Validators.required]
    })
  }

  closeDialog() {
    this.dialogRef.close()
  }

  submit() {
    this.userService
      .updateUserProfile(this.updateUserProfile())
      .subscribe(() => {
        this.notificationService.showSnackBar('User updated successfully!')
        this.dialogRef.close()
      })
  }

  updateUserProfile() : any {
    this.data.user.firstName = this.profileEditForm.value.firstName
    this.data.user.lastName = this.profileEditForm.value.lastName
    this.data.user.bio = this.profileEditForm.value.bio
    return this.data.user
  }
}
