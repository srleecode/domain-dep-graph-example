import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ng-test-app-second-domain-shell-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class ShellTestComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
