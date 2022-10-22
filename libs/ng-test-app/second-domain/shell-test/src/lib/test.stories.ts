import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { ShellTestComponent } from './test.component';
import { GLOBAL_MOUNT_OPTIONS } from '@cypress/component-testing';

export default {
  component: ShellTestComponent,
  title: 'NgTestApp/SecondDomain/ShellTest',
  decorators: [
    moduleMetadata({
      imports: [ShellTestComponent, ...GLOBAL_MOUNT_OPTIONS.imports],
    }),
  ],
} as Meta;

const Template: Story<ShellTestComponent> = (args) => ({
  props: args,
});

export const Default = Template.bind({});
