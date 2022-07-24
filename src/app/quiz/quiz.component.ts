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

  constructor() {}

  ngOnInit() {
    this.addrsvp = new FormGroup({
      quiz1: new FormControl({ value: "", disabled: false }, [
        Validators.required,
      ]),
      quiz2: new FormControl({ value: "", disabled: false }, [
        Validators.required,
      ]),
    });
  }
}
