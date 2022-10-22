import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ShellTestExampleComponent } from '@domain-example/ng-test-app/test-domain/shell-test-example';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ShellTestExampleComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
