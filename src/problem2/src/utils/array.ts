/**
 * Sorts an array of objects by a specified field
 * @param array - The array of objects to sort
 * @param field - The field to sort by
 * @param order - Sort order: 'asc' for ascending, 'desc' for descending (default: 'asc')
 * @returns A new sorted array
 */
export function sortByField<T extends Record<string, any>>(
  array: T[],
  field: keyof T,
  order: "asc" | "desc" = "asc"
): T[] {
  return [...array].sort((a, b) => {
    const aValue = a[field];
    const bValue = b[field];

    // Handle null/undefined values
    if (aValue == null && bValue == null) return 0;
    if (aValue == null) return order === "asc" ? -1 : 1;
    if (bValue == null) return order === "asc" ? 1 : -1;

    // Handle different data types
    if (typeof aValue === "string" && typeof bValue === "string") {
      const comparison = aValue.localeCompare(bValue);
      return order === "asc" ? comparison : -comparison;
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      const comparison = aValue - bValue;
      return order === "asc" ? comparison : -comparison;
    }

    if (typeof aValue === "boolean" && typeof bValue === "boolean") {
      const comparison = Number(aValue) - Number(bValue);
      return order === "asc" ? comparison : -comparison;
    }

    // Handle Date objects
    if (
      aValue &&
      bValue &&
      typeof aValue === "object" &&
      typeof bValue === "object" &&
      "getTime" in aValue &&
      "getTime" in bValue &&
      typeof aValue.getTime === "function" &&
      typeof bValue.getTime === "function"
    ) {
      const comparison =
        (aValue as Date).getTime() - (bValue as Date).getTime();
      return order === "asc" ? comparison : -comparison;
    }

    // Handle string dates (ISO format or common date formats)
    if (typeof aValue === "string" && typeof bValue === "string") {
      const aDate = new Date(aValue);
      const bDate = new Date(bValue);

      // Check if both strings are valid dates
      if (!isNaN(aDate.getTime()) && !isNaN(bDate.getTime())) {
        const comparison = aDate.getTime() - bDate.getTime();
        return order === "asc" ? comparison : -comparison;
      }

      // If not valid dates, fall back to string comparison
      const comparison = aValue.localeCompare(bValue);
      return order === "asc" ? comparison : -comparison;
    }

    // Fallback for mixed types or other data types
    const aStr = String(aValue);
    const bStr = String(bValue);
    const comparison = aStr.localeCompare(bStr);

    return order === "asc" ? comparison : -comparison;
  });
}
