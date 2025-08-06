import { Duration } from 'aws-cdk-lib';
import { Queue, QueueProps } from 'aws-cdk-lib/aws-sqs';
import { Construct } from 'constructs';

export class SampleQueue extends Construct {
  readonly queue: Queue;

  constructor(scope: Construct, id: string, props: QueueProps) {
    super(scope, id);

    this.queue = new Queue(this, 'Queue', {
      visibilityTimeout: Duration.seconds(300),
      ...props,
    });
  }
}
