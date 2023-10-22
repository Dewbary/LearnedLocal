type Props = {
    itemTitle: string;
    itemContent: React.ReactNode;
}

export default function HelpMenuItem({itemTitle, itemContent}: Props) {
    return (
        <div className="collapse border border-gray-300">
            <input type="checkbox"/>
            <div className="collapse-title">
                {itemTitle}
            </div>
            <div className="collapse-content border-t border-t-gray-300">
                {itemContent}
            </div>
        </div>
    )
}