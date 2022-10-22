import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ng-test-app-test-domain-feature-test-example',
  templateUrl: './test-example.component.html',
  styleUrls: ['./test-example.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class FeatureTestExampleComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
