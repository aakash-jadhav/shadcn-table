import type { HeaderContext } from "@tanstack/react-table"
import type { User } from "../lib/data"
import { FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa"
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuTrigger,
} from "./ui/context-menu"

interface DefaultHeaderProps<T> {
  info: HeaderContext<User, T>
  name: string
}
export default function DefaultHeader<T>({
  info,
  name,
}: DefaultHeaderProps<T>) {
  const sorted = info.column.getIsSorted()
  const { table } = info
  return (
    <ContextMenu>
      <ContextMenuTrigger
        onPointerDown={e => {
          e.preventDefault()
          if (e.button === 2) return //right click

          info.column.toggleSorting(info.column.getIsSorted() === "asc")
        }}
        className=" flex w-full h-full justify-start items-center"
      >
        {name}
        {sorted === "asc" && <FaSortAlphaDown />}
        {sorted === "desc" && <FaSortAlphaUp />}
      </ContextMenuTrigger>
      <ContextMenuContent>
        {table
          .getAllColumns()
          .filter(column => column.getCanHide())
          .map(column => (
            <ContextMenuCheckboxItem
              key={column.id}
              className="capitalize"
              checked={column.getIsVisible()}
              onCheckedChange={value => column.toggleVisibility(!!value)}
            >
              {column.id}
            </ContextMenuCheckboxItem>
          ))}
      </ContextMenuContent>
    </ContextMenu>
  )
}
