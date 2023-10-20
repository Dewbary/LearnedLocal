type Props = {
    itemTitle: string;
    itemContent: string;
}

export default function HelpMenuItem({itemTitle, itemContent}: Props) {
    return (
        <div className="collapse border border-gray-300">
            <input type="checkbox"/>
            <div className="collapse-title">
                {itemTitle}
            </div>
            <div className="collapse-content border border-t-gray-300">
                <p className="mt-3">{itemContent}</p>
            </div>
        </div>
    )
}