import { Component, OnInit } from '@angular/core';
import $ from 'jquery';
import { AngularFire } from 'angularfire2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-task-checklist',
  templateUrl: './create-task-checklist.component.html',
  styleUrls: ['./create-task-checklist.component.css']
})
export class CreateTaskChecklistComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    $(document).ready(function () {
      var max_fields = 10; //maximum input boxes allowed
      var wrapper = $(".input_fields_wrap"); //Fields wrapper
      var add_button = $(".add_field_button"); //Add button ID

      var x = 1; //initlal text box count
      $(add_button).click(function (e) { //on add input button click
        e.preventDefault();
        if (x < max_fields) { //max input box allowed
          x++; //text box increment
          $(wrapper).append('<div><a href="#" class="remove_field remove"><small>Remove Task</small></a><input type="text" class="form-control" name="challengeName"></div>'); //add input box
        }
      });

      $(wrapper).on("click", ".remove_field", function (e) { //user click on remove text
        e.preventDefault(); $(this).parent('div').remove(); x--;
      })
    });
  }

}
