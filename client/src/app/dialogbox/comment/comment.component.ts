import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogDataComment} from '../../single-view-page/project-detail/project-detail.component';
import {AuthenticationUserService} from '../../auth/authentication/authentication-user.service';
import {SingleViewService} from '../../single-view-page/single-view.service';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  commentData = this.fb.group({
    userId: [''],
    project: [''], // project_Id
    visibility: [''],
    text: ['']
  });
  visibility: string;

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<CommentComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogDataComment,
              private singleViewService: SingleViewService) { }

  ngOnInit(): void {
    console.log(this.data);
  }

  onSubmit() {
    if ( this.commentData.get('visibility').value === true) {
      this.visibility = 'privat';
    } else {
      this.visibility = 'public';
    }
    this.commentData.patchValue({
      visibility: this.visibility,
      project: this.data.data.project,
      userId: this.data.data.userId,
    });
    console.log(this.commentData.value);
    this.singleViewService.createComment(JSON.stringify(this.commentData.value))
      .subscribe( (response) => {
        console.log(response);
        if (response.commentId) {
          document.getElementById('messageTransaction').innerHTML = 'Kommentar wurde hinzugefügt';
          this.closeComment();
        }else {
          document.getElementById('messageTransaction').innerHTML = 'Kommentar wurde nicht hinzugefügt; please close the dialog box and try again';
        }
      });
  }
  closeComment() {
    this.dialogRef.close();
  }
}
