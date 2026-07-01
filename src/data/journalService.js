import { supabase } from "../lib/supabaseClient";

function toDb(entry) {
  const row = {};
  if ("restaurantName" in entry) row.restaurant_name = entry.restaurantName;
  if ("location" in entry) row.location = entry.location;
  if ("cuisine" in entry) row.cuisine = entry.cuisine;
  if ("dateVisited" in entry) row.date_visited = entry.dateVisited || null;
  if ("rating" in entry) row.rating = entry.rating;
  if ("notes" in entry) row.notes = entry.notes;
  if ("tags" in entry) row.tags = entry.tags;
  if ("dishes" in entry) row.dishes = entry.dishes;
  if ("photos" in entry) row.photos = entry.photos;
  if ("isFavoriteRestaurant" in entry) row.is_favorite_restaurant = entry.isFavoriteRestaurant;
  return row;
}

function fromDb(row) {
  return {
    id: row.id,
    restaurantName: row.restaurant_name,
    location: row.location ?? "",
    cuisine: row.cuisine,
    dateVisited: row.date_visited,
    rating: row.rating,
    notes: row.notes ?? "",
    tags: row.tags ?? [],
    dishes: row.dishes ?? [],
    photos: row.photos ?? [],
    isFavoriteRestaurant: row.is_favorite_restaurant,
    createdAt: row.created_at,
  };
}

export async function listEntries() {
  const { data, error } = await supabase
    .from("entries")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data.map(fromDb);
}

export async function getEntry(id) {
  const { data, error } = await supabase.from("entries").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data ? fromDb(data) : null;
}

export async function createEntry(data) {
  const { data: row, error } = await supabase
    .from("entries")
    .insert(toDb(data))
    .select()
    .single();
  if (error) throw error;
  return fromDb(row);
}

export async function updateEntry(id, data) {
  const { data: row, error } = await supabase
    .from("entries")
    .update(toDb(data))
    .eq("id", id)
    .select()
    .maybeSingle();
  if (error) throw error;
  return row ? fromDb(row) : null;
}

export async function deleteEntry(id) {
  const { error } = await supabase.from("entries").delete().eq("id", id);
  if (error) throw error;
  return true;
}
