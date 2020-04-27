import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, NgForm, Validators} from '@angular/forms';
import {SingleViewService} from '../../single-view-page/single-view.service';


@Component({
  selector: 'app-user-comment',
  templateUrl: './user-comment.component.html',
  styleUrls: ['./user-comment.component.css']
})
export class UserCommentComponent implements OnInit {

  @Input() userId: any;
  @Input() projectId: any;
  @Output() hideComment = new EventEmitter<boolean>();

  fontSize = 12;
  inputChar: any;

  commentData = this.fb.group({
    userId: ['', Validators.required],
    project: ['', Validators.required], // project_Id
    visibility: [false],
    text: ['', Validators.required]
  });

  constructor(private fb: FormBuilder,
              private singleViewService: SingleViewService) { }

  ngOnInit(): void {
    console.log('user ID: ' + this.userId + ' projectId: ' + this.projectId );
    this.commentData.patchValue({
      project: this.projectId,
      userId: this.userId,
    });
  }
  keyPress(event) {
    const pattern = /[0-9]/;
    this.inputChar = event.key || String.fromCharCode(event.which);
    if (event.keypress !== 8 && !pattern.test(this.inputChar)) {
      event.preventDefault();
    }
  }

  onSubmit() {
    this.commentData.get('visibility').setValue(this.changeVisibilityName(this.commentData.get('visibility').value));
    console.log(this.commentData.value);
    // console.log(this.commentData.valid);
    if (this.commentData.valid) {
      this.singleViewService.createComment(JSON.stringify(this.commentData.value))
        .subscribe( (response) => {
          console.log(response);
          if (response.commentId) {
            document.getElementById('messageTransaction').innerHTML = 'Kommentar wurde hinzugefügt';
            this.hideComment.emit(true);
            this.commentData.patchValue({
              text: '',
              visibility: false,
            });
            document.getElementById('messageTransaction').style.display = 'none';
          }else {
            document.getElementById('messageTransaction').innerHTML = 'Kommentar wurde nicht hinzugefügt; please close the dialog box and try again';
            this.hideComment.emit(false);
          }
        });
    }

  }
  closeComment() {
    this.hideComment.emit(false);
  }

  changeVisibilityName(visibilityFromCheckbox: boolean) {
    if (visibilityFromCheckbox === true) {
      return 'privat';
    } else {
      return 'public';
    }
  }
}

