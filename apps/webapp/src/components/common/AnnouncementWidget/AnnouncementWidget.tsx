import { useState } from "react";
import AnnouncementBanner from "./AnnouncementBanner";

type Props = {
    announcements: string[];
};

export default function AnnouncementWidget (props: Props) {

    const [announcements, setAnnouncements] = useState(props.announcements.map(
        (announcement, index) => {
            return {index, text: announcement};
    }));

    return (
        <div>
            {announcements.map(announcement => (
                <AnnouncementBanner text={announcement.text} key={announcement.index}/>
            ))}
        </div>
    )
}