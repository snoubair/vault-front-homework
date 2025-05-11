import { useEffect, useState } from "react";

import TextInput from "./TextInput";
import NotificationItemsList from "./NotificationItemsList";
import { fetchNotifications } from "../api/notification.api";
import { Notif } from "../models/notification.model";
import { useDebounce } from "use-debounce";

export const NotificationsHistory = () => {
  const [searchText, setSearchText] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [isSearchingInitiated, setSearchingInitiated] = useState(false);
  const [results, setResults] = useState<Notif[]>([]);

  const [debouncedSearch] = useDebounce(searchText, 300);

  useEffect(() => {
    setLoading(true);
    setSearchingInitiated(false);
    fetchNotifications(searchText).then((data) => {
      setResults(data);
      setLoading(false);
    });
  }, [debouncedSearch, setLoading, setResults]);

  return (
    <div className="flex flex-col  bg-white rounded-4xl outline-1 outline-light">
      <div className="flex flex-col gap-4 px-6 pt-6">
        <span className="font-semibold text-2xl">History</span>
        <TextInput
          isLoading={isLoading}
          onChange={setSearchText}
          onFocus={() => setSearchingInitiated(true)}
          placeHolder="Search"
        />
      </div>
      <div className="flex flex-col gap-8 p-6 h-[380px] overflow-y-auto">
        {!isLoading &&
          !isSearchingInitiated &&
          (results.length > 0 ? (
            <NotificationItemsList items={results} />
          ) : (
            <div className="font-medium flex flex-col self-center items-center justify-center gap-y-4">
              <img src="/no-content.svg" className="h-32 w-110" />
              <div className="self-center">No result found ...</div>
            </div>
          ))}
      </div>
    </div>
  );
};
