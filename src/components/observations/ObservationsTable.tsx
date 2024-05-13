import React from "react";
import {
  useTable,
  useGlobalFilter,
  useAsyncDebounce,
  useFilters,
  useSortBy,
  usePagination,
} from "react-table";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleRightIcon,
  ChevronDoubleLeftIcon,
} from "@heroicons/react/24/solid";
import { Button, PageButton } from "./shared/Button.tsx";
import { SortDownIcon, SortUpIcon, SortIcon } from "./shared/Icon.tsx";
import { classNames } from "./shared/Utils.tsx";

// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <label className="flex items-baseline gap-x-2">
      <span className="text-gray-700">Search: </span>
      <input
        type="text"
        class="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
      />
    </label>
  );
}

// This is a custom filter UI for selecting
// a unique option from a list
export function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id, render },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <label className="flex items-baseline gap-x-2">
      <span className="text-gray-700">{render("Header")}: </span>
      <select
        className="block mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        name={id}
        id={id}
        value={filterValue}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}>
        <option value="">All</option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export function StatusPill({ value }) {
  const status = value ? value.toLowerCase() : "unknown";

  return (
    <span
      className={classNames(
        "px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm",
        status.startsWith("active") ? "bg-green-100 text-green-700" : null,
        status.startsWith("inactive") ? "bg-yellow-100 text-yellow-700" : null,
        status.startsWith("offline") ? "bg-red-100 text-red-700" : null
      )}>
      {status}
    </span>
  );
}

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  // Render the UI for your table
  return (
    <>
      <div className="flex flex-col mt-2 bg-slate-900">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
              <table
                {...getTableProps()}
                className="min-w-full divide-y divide-gray-200 bg-slate-900">
                <thead className="border border-white bg-slate-900">
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      <th>
                        <input type="checkbox" />{" "}
                      </th>
                      {headerGroup.headers.map((column) => (
                        // Add the sorting props to control sorting. For this example
                        // we can add them into the header props
                        <th
                          scope="col"
                          className="px-6 py-3 text-sm font-medium tracking-wider text-left text-gray-500 group capatilize"
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}>
                          <div className="flex items-center justify-between">
                            {column.render("Header")}
                            {/* Add a sort direction indicator */}
                            <span>
                              {column.isSorted ? (
                                column.isSortedDesc ? (
                                  <SortDownIcon className="w-4 h-4 text-gray-400" />
                                ) : (
                                  <SortUpIcon className="w-4 h-4 text-gray-400" />
                                )
                              ) : (
                                <SortIcon className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100" />
                              )}
                            </span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody
                  {...getTableBodyProps()}
                  className="divide-y divide-gray-200 bg-slate-900">
                  {page.map((row, i) => {
                    // new
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()} className="bg-slate-900">
                        <td className="px-2 text-center bg-slate-900">
                          <input type="checkbox" />{" "}
                        </td>
                        {row.cells.map((cell) => {
                          return (
                            <>
                              <td
                                {...cell.getCellProps()}
                                className="px-6 py-4 whitespace-nowrap bg-slate-900">
                                {cell.value == "High" ? (
                                  <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>{" "}
                                    {cell.value}
                                  </div>
                                ) : cell.value == "Maintenance" ? (
                                  <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 bg-blue-400 rounded-full"></div>{" "}
                                    {cell.value}
                                  </div>
                                ) : cell.value == "Critical" ? (
                                  <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>{" "}
                                    {cell.value}
                                  </div>
                                ) : (
                                  cell.value
                                )}
                              </td>
                            </>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between py-3 bg-slate-900">
        <div className="flex justify-between flex-1 sm:hidden bg-slate-900">
          <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
            Previous
          </Button>
          <Button onClick={() => nextPage()} disabled={!canNextPage}>
            Next
          </Button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          {/* <div className="flex gap-x-2">
            <span className="text-sm text-gray-700">
              Page <span className="font-medium">{state.pageIndex + 1}</span> of{" "}
              <span className="font-medium">{pageOptions.length}</span>
            </span>
            <label>
              <span className="sr-only">Items Per Page</span>
              <select
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={state.pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                }}>
                {[5, 10, 20].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </label>
          </div> */}
          <div></div>
          <div>
            <nav
              className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm bg-slate-900"
              aria-label="Pagination">
              <PageButton
                className="rounded-l-md"
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}>
                <span className="sr-only">First</span>
                <ChevronDoubleLeftIcon className="w-5 h-5" aria-hidden="true" />
              </PageButton>
              <PageButton
                onClick={() => previousPage()}
                disabled={!canPreviousPage}>
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
              </PageButton>
              <PageButton onClick={() => nextPage()} disabled={!canNextPage}>
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
              </PageButton>
              <PageButton
                className="rounded-r-md"
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}>
                <span className="sr-only">Last</span>
                <ChevronDoubleRightIcon
                  className="w-5 h-5"
                  aria-hidden="true"
                />
              </PageButton>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default Table;
