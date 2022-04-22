import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from '@snltickets/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
