import React from "react";

interface PopupLog {
  id?: string;
  mediaUrl: string;
  mediaType: string;
  createdAt: { _seconds: number };
  isEnabled: boolean;
}

interface Props {
  items: PopupLog[];
}

const PopupTable: React.FC<Props> = ({ items }) => {
  console.log("Popup items:", items);
  
  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto mt-8">
      <div className="px-6 py-4 border-b">
        <h3 className="text-lg font-medium text-gray-900">Popup History</h3>
      </div>
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-gray-500">Media</th>
            <th className="px-6 py-3 text-left text-gray-500">Type</th>
            <th className="px-6 py-3 text-left text-gray-500">Created At</th>
            <th className="px-6 py-3 text-left text-gray-500">Enabled</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {items.map((item, i) => (
            <tr key={i}>
              <td className="px-6 py-4">
                <a href={item.mediaUrl} className="text-blue-600 underline" target="_blank">
                  View Media
                </a>
              </td>
              <td className="px-6 py-4 capitalize">{item.mediaType}</td>
              <td className="px-6 py-4">{item.createdAt ? new Date(item.createdAt?._seconds * 1000).toLocaleString("en-IN", {
                timeZone: "Asia/Kolkata",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hour12: true,
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
                : "-"}</td>
              <td className="px-6 py-4">{item.isEnabled}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PopupTable;
