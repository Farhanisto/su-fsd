"use client";
import { useEffect, useState } from "react";

interface Item {
  createdAt: string;
  filename: string;
}

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [sortMethod, setSortMethod] = useState<string>("createdAtAsc");

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch("/api/items");
      const data = await response.json();
      setItems(data);
    };
    fetchItems();
  }, []);

  const sortItems = (method: string) => {
    let sortedItems = [...items];
    if (method === "createdAtAsc") {
      sortedItems.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    } else if (method === "filenameAsc") {
      sortedItems.sort((a, b) =>
        a.filename.localeCompare(b.filename, undefined, { numeric: true })
      );
    } else if (method === "filenameDesc") {
      sortedItems.sort((a, b) =>
        b.filename.localeCompare(a.filename, undefined, { numeric: true })
      );
    }
    setSortMethod(method);
    setItems(sortedItems);
  };

  return (
    <div className="p-5">
      <select
        onChange={(e) => sortItems(e.target.value)}
        value={sortMethod}
        className="bg-gray-200 text-black p-2 mb-4 rounded"
      >
        <option value="createdAtAsc">Sort by Created At Asc</option>
        <option value="filenameAsc">Sort by Filename Asc</option>
        <option value="filenameDesc">Sort by Filename Desc</option>
      </select>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div
            key={item.filename}
            className="border rounded-lg p-4 shadow-lg bg-white"
          >
            <h3 className="font-bold text-lg">{item.filename}</h3>
            <p className="text-gray-600">Created At: {item.createdAt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
