// src/utils/getContent.ts

import { getCollection } from "astro:content"
import type { CollectionKey, CollectionEntry } from "astro:content"

type AnyEntry = CollectionEntry<CollectionKey>

// ---------- HELPERS ----------
const sortByDateDesc = (a: Date, b: Date) => b.getTime() - a.getTime()

const excludeDrafts = (item: AnyEntry) => !item.data.draft

// ---------- GENERIC GETTER ----------
export async function getContent<T extends CollectionKey>(
  collection: T,
  options: {
    drafts?: boolean
    sort?: boolean
  } = {}
) {
  const { drafts = false, sort = true } = options

  const items = await getCollection(collection)

  const filtered = drafts ? items : items.filter(excludeDrafts)
  const sorted = sort
    ? filtered.sort((a, b) =>
        sortByDateDesc(
          "date" in a.data ? (a.data.date ?? new Date(0)) : new Date(0),
          "date" in b.data ? (b.data.date ?? new Date(0)) : new Date(0)
        )
      )
    : filtered
  return sorted
}

// ---------- NAMED GETTER ----------
export const getPages = () => getContent("pages", { sort: false })
export const getWritings = () => getContent("writings")
