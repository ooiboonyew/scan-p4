import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-quiz",
  templateUrl: "./quiz.component.html",
  styleUrls: ["./quiz.component.scss"],
})
export class QuizComponent implements OnInit {
  addrsvp: FormGroup;
  showSubmit: boolean = false;
  isSubmitted: boolean = false;

  constructor() {}

  ngOnInit() {
    this.addrsvp = new FormGroup({
      quiz1: new FormControl({ value: "", disabled: false }, []),
      quiz2: new FormControl({ value: "", disabled: false }, []),
      quiz3: new FormControl({ value: "", disabled: false }, []),
      quiz4: new FormControl({ value: "", disabled: false }, []),
      quiz5: new FormControl({ value: "", disabled: false }, []),
    });
  }

  answer() {
    this.showSubmit = true;
  }

  onSubmit() {
    this.isSubmitted = true;
  }

  scrollToTop(){
    window.scroll(0,0);
  }

}
