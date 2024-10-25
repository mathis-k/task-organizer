import { h } from "vue";
import type { ColumnDef } from "@tanstack/vue-table";
import type { TaskDocument } from "~/server/models/Task";

const formatDate = (date: any): string => {
  if (!(date instanceof Date)) {
    if (typeof date === "string") {
      date = new Date(date);
    } else {
      return "";
    }
  }
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

export const columns: ColumnDef<TaskDocument>[] = [
  {
    accessorKey: "title",
    header: () => h("div", { class: "text-center" }, "Title"),
    cell: ({ row }) => {
      const title = row.getValue<string>("title");
      return h("div", { class: "text-left font-medium" }, title);
    },
  },
  {
    accessorKey: "course",
    header: () => h("div", { class: "text-center" }, "Course"),
    cell: ({ row }) => {
      const course = row.getValue<string>("course");
      return h("div", { class: "text-center font-medium" }, course);
    },
  },
  {
    accessorKey: "status",
    header: () => h("div", { class: "text-center" }, "Status"),
    cell: ({ row }) => {
      const status = row.getValue<string>("status");
      return h("div", { class: "text-center font-medium" }, status);
    },
  },
  {
    accessorKey: "priority",
    header: () => h("div", { class: "text-center" }, "Priority"),
    cell: ({ row }) => {
      const priority = row.getValue<string>("priority");
      return h("div", { class: "text-center font-medium" }, priority);
    },
  },
  {
    accessorKey: "dueDate",
    header: () => h("div", { class: "text-center" }, "Due Date"),
    cell: ({ row }) => {
      const dueDate = row.getValue<Date>("dueDate");
      return h(
        "div",
        { class: "text-center font-medium" },
        formatDate(dueDate),
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: () => h("div", { class: "text-center" }, "Created At"),
    cell: ({ row }) => {
      const createdAt = row.getValue<Date>("createdAt");
      return h(
        "div",
        { class: "text-center font-medium" },
        formatDate(createdAt),
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: () => h("div", { class: "text-center" }, "Updated At"),
    cell: ({ row }) => {
      const updatedAt = row.getValue<Date>("updatedAt");
      return h(
        "div",
        { class: "text-center font-medium" },
        formatDate(updatedAt),
      );
    },
  },
];
