"use client";
import { useEffect, useState } from "react";

interface Item {
  createdAt: string;
  filename: string;
}

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [sortMethod, _] = useState("createdAtAsc");

  useEffect(() => {
    const fetchItems = async () => {
      const res = await fetch("/api/items");
      const data: Item[] = await res.json();
      setItems(data);
    };
    fetchItems();
  }, []);

  const sortItems = (method: string) => {
    const sortedItems = [...items];
    switch (method) {
      case "createdAtAsc":
        sortedItems.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      case "filenameAsc":
        sortedItems.sort((a, b) => {
          const aNum = parseInt(a.filename.match(/\d+/)?.[0] || "0", 10);
          const bNum = parseInt(b.filename.match(/\d+/)?.[0] || "0", 10);
          return a.filename.localeCompare(b.filename) || aNum - bNum;
        });
        break;
      case "filenameDesc":
        sortedItems.sort((a, b) => {
          const aNum = parseInt(a.filename.match(/\d+/)?.[0] || "0", 10);
          const bNum = parseInt(b.filename.match(/\d+/)?.[0] || "0", 10);
          return b.filename.localeCompare(a.filename) || bNum - aNum;
        });
        break;
      default:
        break;
    }
    setItems(sortedItems);
  };

  return (
    <div>
      <h1>Items List</h1>
      <select
        onChange={(e) => sortItems(e.target.value)}
        value={sortMethod}
        className="bg-gray-300 text-black p-2 rounded border border-gray-400"
      >
        <option value="createdAtAsc">Sort by Created At Asc</option>
        <option value="filenameAsc">Sort by Filename Asc</option>
        <option value="filenameDesc">Sort by Filename Desc</option>
      </select>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.filename} - {new Date(item.createdAt).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
