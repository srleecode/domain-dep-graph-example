import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { GLOBAL_MOUNT_OPTIONS } from '@cypress/component-testing';
import { TestComponent } from './test.component';

export default {
  component: TestComponent,
  title: 'NgTestApp/TestDomain/DirectiveTestExample',
  decorators: [
    moduleMetadata({
      imports: [TestComponent, ...GLOBAL_MOUNT_OPTIONS.imports],
    }),
  ],
} as Meta;

const Template: Story<TestComponent> = (args) => ({
  props: args,
});

export const Default = Template.bind({});
