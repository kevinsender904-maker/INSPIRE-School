import React from 'react';
import { Skeleton } from './Skeleton';

export interface Column<T> {
  key: string;
  header: React.ReactNode;
  render?: (item: T, index: number) => React.ReactNode;
  className?: string;
  headerClassName?: string;
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
}

export function Table<T extends Record<string, unknown>>({
  columns,
  data,
  loading = false,
  emptyMessage = 'No records found.',
  className = '',
}: TableProps<T>) {
  return (
    <div className={`w-full overflow-hidden rounded-xl border border-slate-200 bg-white ${className}`}>
      {/* Desktop / Tablet View (>= 768px) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm rtl:text-right">
          <thead className="sticky top-0 z-10 bg-slate-50 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  className={`px-4 py-3.5 tracking-wider ${col.headerClassName || ''}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              Array.from({ length: 4 }).map((_, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50">
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3.5">
                      <Skeleton variant="text" height="18px" />
                    </td>
                  ))}
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-8 text-center text-slate-400 font-medium"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((item, rowIdx) => (
                <tr
                  key={rowIdx}
                  className="hover:bg-slate-50/70 transition-colors duration-150"
                >
                  {columns.map((col) => {
                    const cellVal = item[col.key];
                    return (
                      <td
                        key={col.key}
                        className={`px-4 py-3.5 text-slate-700 whitespace-nowrap ${
                          col.className || ''
                        }`}
                      >
                        {col.render ? col.render(item, rowIdx) : (cellVal as React.ReactNode)}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked View (< 768px) */}
      <div className="md:hidden divide-y divide-slate-100">
        {loading ? (
          <div className="p-4 space-y-4">
            <Skeleton variant="card" />
            <Skeleton variant="card" />
          </div>
        ) : data.length === 0 ? (
          <div className="p-6 text-center text-slate-400 text-sm font-medium">
            {emptyMessage}
          </div>
        ) : (
          data.map((item, rowIdx) => (
            <div key={rowIdx} className="p-4 space-y-2 hover:bg-slate-50 transition-colors">
              {columns.map((col) => (
                <div
                  key={col.key}
                  className="flex items-center justify-between text-xs py-1"
                >
                  <span className="font-semibold text-slate-500 uppercase tracking-wide">
                    {col.header}
                  </span>
                  <div className="text-slate-800 text-right rtl:text-left font-medium">
                    {col.render ? col.render(item, rowIdx) : (item[col.key] as React.ReactNode)}
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
