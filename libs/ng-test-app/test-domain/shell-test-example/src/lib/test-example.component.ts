import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureTestExampleComponent } from '@domain-example/ng-test-app/test-domain/feature-test-example';
import { UiStoryTestExampleComponent } from '@domain-example/ng-test-app/test-domain/ui-story-test-example';
import { UiTestExampleComponent } from '@domain-example/ng-test-app/test-domain/ui-test-example';
import { ShellTestComponent } from '@domain-example/ng-test-app/second-domain/shell-test';

@Component({
  selector: 'ng-test-app-test-domain-shell-test-example',
  templateUrl: './test-example.component.html',
  styleUrls: ['./test-example.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FeatureTestExampleComponent,
    UiStoryTestExampleComponent,
    UiTestExampleComponent,
    ShellTestComponent,
  ],
})
export class ShellTestExampleComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
