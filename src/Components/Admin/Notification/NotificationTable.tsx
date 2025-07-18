import React from "react";

interface NotificationLog {
  id?: string;
  title: string;
  body: string;
  sentAt: any; // timestamp
  successCount?: number;
  failureCount?: number;
}

interface Props {
  logs: NotificationLog[];
}

const NotificationTable: React.FC<Props> = ({ logs }) => {
  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto mt-8">
      <div className="px-6 py-4 border-b">
        <h3 className="text-lg font-medium text-gray-900">Notification History</h3>
      </div>
      <table className="min-w-full divide-y divide-gray-200 text-sm md:text-base">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase">Title</th>
            <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase">Body</th>
            <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase">Success</th>
            <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase">Failed</th>
            <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase">Sent At</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {logs.map((log, idx) => (
            <tr key={idx}>
              <td className="px-6 py-4">{log.title}</td>
              <td className="px-6 py-4">{log.body}</td>
              <td className="px-6 py-4 text-green-700">{log.successCount || 0}</td>
              <td className="px-6 py-4 text-red-600">{log.failureCount || 0}</td>
              <td className="px-6 py-4">
                {log.sentAt ? new Date(log.sentAt.seconds * 1000).toLocaleString() : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NotificationTable;
