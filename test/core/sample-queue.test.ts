import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { SampleQueue } from '../../src/core';

describe('SampleQueue', () => {
  const QUEUE_NAME = 'test-sample-queue';
  const VISIBILITY_TIMEOUT = 300;

  let template: Template;

  beforeEach(() => {
    const app = new App();

    const stack = new Stack(app, 'TestStack');

    new SampleQueue(stack, 'TestSampleQueue', {
      queueName: QUEUE_NAME,
    });

    template = Template.fromStack(stack);
  });

  it('creates the queue with the expected properties', () => {
    template.hasResourceProperties('AWS::SQS::Queue', {
      VisibilityTimeout: VISIBILITY_TIMEOUT,
      QueueName: QUEUE_NAME,
    });
  });

  it('matches the snapshot', () => {
    expect(template.toJSON()).toMatchSnapshot();
  });
});
