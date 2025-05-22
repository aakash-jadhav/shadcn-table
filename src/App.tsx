import { createColumnHelper } from "@tanstack/react-table"
import { data, type User } from "./lib/data"
import { DataTable } from "./components/data-table"
import { Checkbox } from "./components/ui/checkbox"
import DefaultHeader from "./components/default-header"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu"
import { Button } from "./components/ui/button"
import { FiMoreVertical } from "react-icons/fi"
import { Input } from "./components/ui/input"
import { useEffect, useState } from "react"

const columnHelper = createColumnHelper<User>()
const columns = [
  columnHelper.display({
    id: "action",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  }),
  columnHelper.accessor("firstName", {
    header: info => <DefaultHeader info={info} name="First Name" />,
    // cell: info => (
    //   <Input
    //     value={info.row.original.firstName}
    //     onChange={e =>
    //       info.table.options.meta?.updateData(
    //         info.row.index,
    //         "firstName",
    //         e.target.value
    //       )
    //     }
    //   />
    // ),
    cell: info => {
      const initialValue = info.getValue()
      const [value, setValue] = useState(initialValue)
      useEffect(() => {
        setValue(initialValue)
      }, [initialValue])
      return (
        <Input
          value={value}
          onChange={e => setValue(e.target.value)}
          onBlur={() =>
            info.table.options.meta?.updateData?.(
              info.row.index,
              info.column.id,
              value
            )
          }
        />
      )
    },
  }),
  columnHelper.accessor("lastName", {
    header: info => <DefaultHeader info={info} name="Last Name" />,
    cell: info => {
      const initialValue = info.getValue()
      const [value, setValue] = useState(initialValue)
      useEffect(() => {
        setValue(initialValue)
      }, [initialValue])
      return (
        <Input
          value={value}
          onChange={e => setValue(e.target.value)}
          onBlur={() =>
            info.table.options.meta?.updateData?.(
              info.row.index,
              info.column.id,
              value
            )
          }
        />
      )
    },
  }),
  columnHelper.accessor("email", {
    header: info => <DefaultHeader info={info} name="Email" />,
    cell: info => {
      const initialValue = info.getValue()
      const [value, setValue] = useState(initialValue)
      useEffect(() => {
        setValue(initialValue)
      }, [initialValue])
      return (
        <Input
          value={value}
          onChange={e => setValue(e.target.value)}
          onBlur={() =>
            info.table.options.meta?.updateData?.(
              info.row.index,
              info.column.id,
              value
            )
          }
        />
      )
    },
  }),
  columnHelper.accessor("age", {
    header: info => <DefaultHeader info={info} name="Age" />,
    cell: info => {
      const initialValue = info.getValue()
      const [value, setValue] = useState(initialValue)
      useEffect(() => {
        setValue(initialValue)
      }, [initialValue])
      return (
        <Input
          value={value}
          onChange={e => setValue(e.target.value)}
          onBlur={() =>
            info.table.options.meta?.updateData?.(
              info.row.index,
              info.column.id,
              value
            )
          }
        />
      )
    },
  }),
  columnHelper.accessor("comments", {
    header: info => <DefaultHeader info={info} name="Comments" />,
    cell: info => {
      const initialValue = info.getValue()
      const [value, setValue] = useState(initialValue)
      useEffect(() => {
        setValue(initialValue)
      }, [initialValue])
      return (
        <Input
          value={value}
          onChange={e => setValue(e.target.value)}
          onBlur={() =>
            info.table.options.meta?.updateData?.(
              info.row.index,
              info.column.id,
              value
            )
          }
        />
      )
    },
  }),

  columnHelper.display({
    id: "more",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              {" "}
              <FiMoreVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent onCloseAutoFocus={e => e.preventDefault()}>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Copy</DropdownMenuItem>
            <DropdownMenuItem>Paste</DropdownMenuItem>
            <DropdownMenuItem>Cut</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }),
]
function App() {
  return (
    <>
      <div className="w-full h-full flex-col justify-center items-center p-10 gap-4">
        <DataTable<User, any> columns={columns} data={data} />
      </div>
    </>
  )
}

export default App
