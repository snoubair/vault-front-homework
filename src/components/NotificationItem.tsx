import {
  CryptoCurrency,
  currenciesByName,
  currenciesBySymbol,
} from "../cryptos/currency.model";
import {
  Notif,
  Transaction,
  AccountEvent,
  notificationTypeLabel,
  NotificationType,
} from "../models/notification.model";
import { truncateCryptoAddress } from "../utils/cryptos.util";
import { Card } from "./Card";
import DynamicHeroicon from "./DynamicHeroIcon";

function isTransaction(data: Transaction | AccountEvent): data is Transaction {
  return (data as Transaction).unit !== undefined;
}

function getBadge(
  type: NotificationType,
  data: Transaction | AccountEvent
): {
  className: string;
  iconName: string;
  fillColor: string;
} {
  if (isTransaction(data)) {
    return {
      className: "absolute -top-1 -right-1 size-5",
      iconName:
        type === NotificationType.TRANSACTION_RECEIVED
          ? "ArrowDownCircleIcon"
          : "ArrowUpCircleIcon",
      fillColor: "#47883A",
    };
  } else {
    return {
      className: "absolute -top-1 -right-1 size-5",
      iconName: "PlusCircleIcon",
      fillColor: "#47883A",
    };
  }
}

function formatTransactionAmount(
  data: Transaction | AccountEvent
): string | undefined {
  if (isTransaction(data)) {
    return new Intl.NumberFormat().format(data.amount) + " " + data.unit;
  } else {
    return undefined;
  }
}

export const NotificationItem = ({ item }: { item: Notif }) => {
  let currency: CryptoCurrency | undefined = isTransaction(item.data)
    ? currenciesBySymbol[item.data.unit.toLowerCase()]
    : currenciesByName[item.data.currency.toLowerCase()];

  const badge = getBadge(item.type, item.data);

  return (
    <Card
      image={
        <div className="relative">
          <img
            alt=""
            src={currency ? `/currency-icons/${currency.symbol}.svg` : ""}
            className="size-12 min-w-12 rounded-full z-10"
          />

          <DynamicHeroicon
            className={badge.className + " bg-white z-50 rounded-xl "}
            iconName={badge.iconName}
            fillColor={badge.fillColor}
          ></DynamicHeroicon>
        </div>
      }
      color={currency?.color}
      title={notificationTypeLabel(item.type)}
      description={
        isTransaction(item.data)
          ? (item.type === NotificationType.TRANSACTION_RECEIVED
              ? "From "
              : "To ") + truncateCryptoAddress(item.data.from)
          : item.data.name
      }
      value={formatTransactionAmount(item.data)}
    />
  );
};
