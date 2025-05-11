export enum NotificationType {
  TRANSACTION_RECEIVED = "TRANSACTION_RECEIVED",
  TRANSACTION_SENT = "TRANSACTION_SENT",
  ACCOUNT_CREATED = "ACCOUNT_CREATED",
}

export type Transaction = {
  amount: number;
  from: string;
  to: string;
  unit: string;
};

export type AccountEvent = {
  currency: string;
  id: string;
  name: string;
};

export type Notif = {
  id: string;
  type: NotificationType;
  data: Transaction | AccountEvent;
};

export function notificationTypeLabel(type: NotificationType): string {
  switch (type) {
    case NotificationType.TRANSACTION_RECEIVED:
      return "Received";
    case NotificationType.TRANSACTION_SENT:
      return "Sent";
    case NotificationType.ACCOUNT_CREATED:
      return "Account Created";
  }
}
