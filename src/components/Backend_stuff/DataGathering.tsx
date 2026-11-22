import type { Coffee } from "../../Types/Type";


const url = "http://localhost:3000/Coffees";

export async function getCoffees(): Promise<Coffee[]> {
  const response = await fetch(url);
  return response.json();
}

export async function addCoffee(coffee: Coffee) {
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(coffee),
  });
}


export async function deleteCoffee(id: string) {
  await fetch(url + "/" + id, {
    method: "DELETE",
  });
}


export async function updateCoffee(id: string, changes: Partial<Coffee>) {
  await fetch(url + "/" + id, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(changes),
  });
}