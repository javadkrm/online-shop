import type React from "react";

interface ListProp<T> {
    items: T[],
    renderItem: (item: T) => React.ReactNode
}

function List<T>({ items, renderItem }: ListProp<T>) {
    <ul>
        {items.map((item, index) => (
            <li key={index}>
                {renderItem(item)}
            </li>
        ))}
    </ul>
}

export default List