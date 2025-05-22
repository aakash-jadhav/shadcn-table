import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import type { ColumnDef } from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useMemo, useState } from "react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [searchQuery, setSearchQuery] = useState("")
  const [tableData, setTableData] = useState<TData[]>(data)
  const filteredData = useMemo(() => {
    if (!searchQuery) return tableData
    return tableData.filter(row =>
      Object.values(row).some(
        value =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
  }, [searchQuery, tableData])
  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    meta: {
      updateData: (rowIndex: number, columnId: string, value: string) => {
        setTableData(prev => {
          const updated = [...prev]
          updated[rowIndex] = {
            ...updated[rowIndex],
            [columnId]: value,
          }
          return updated
        })
      },
    },
  })

  return (
    <div>
      <div className="flex gap-4 my-2 justify-between">
        <Input
          className="w-1/4 "
          placeholder="Search..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <Button
          onClick={() =>
            setTableData(prev => [
              {
                // Add empty/default row, type-cast as needed
                firstName: "",
                lastName: "",
                email: "",
                age: "",
                comments: "",
              } as TData,
              ...prev,
            ])
          }
        >
          Add
        </Button>
      </div>
      <div className="w-full h-[800px] flex flex-col gap-4">
        <div className="rounded-md border flex flex-2/3 flex-col overflow-hidden">
          <Table>
            <TableHeader className="sticky top-0 z-10 bg-background shadow-md">
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {/* {tableData.length > 0 && (
                <TableRow>
                  {columns.map((col, index) => {
                    if (col.id === "action" || col.id === "more") {
                      return <TableCell key={index} /> // skip checkboxes and action column
                    }
                    const key = col.accessorKey as keyof TData
                    return (
                      <TableCell key={index}>
                        <Input
                          value={(tableData[0][key] as string) || ""}
                          onChange={e => {
                            const value = e.target.value
                            setTableData(prev => {
                              const newData = [...prev]
                              newData[0] = { ...newData[0], [key]: value }
                              return newData
                            })
                          }}
                        />
                      </TableCell>
                    )
                  })}
                </TableRow>
              )} */}
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map(row => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex justify-end mt-4">
          <Button
            variant="default"
            onClick={() => console.log("Saved data:", tableData)}
          >
            Save
          </Button>
        </div>
        <div className="text-sm text-gray-400 ">
          {table.getSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} rows selected
        </div>
      </div>
    </div>
  )
}
