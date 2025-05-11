import { useVirtualizer } from "@tanstack/react-virtual";
import { Fragment, useRef } from "react";
import { NotificationItem } from "./NotificationItem";
import { Notif } from "../models/notification.model";

const NotificationItemsList = ({ items }: { items: Notif[] }) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 72,
  });

  return (
    <div className="flex flex-col gap-5 min-h-8 " ref={parentRef}>
      {virtualizer.getVirtualItems().map((virtualRow) => {
        const item: Notif | undefined = items[virtualRow.index];
        return (
          <Fragment key={virtualRow.index}>
            {item && <NotificationItem item={item} />}
          </Fragment>
        );
      })}
    </div>
  );
};
export default NotificationItemsList;
