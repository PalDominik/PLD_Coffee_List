import { useState } from "react";
import type { Coffee } from "../../Types/Type";

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function generateId(): string {
  return Math.random().toString(36).slice(2, 7);
}

function parseTags(input: string): string[] {
  return input
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}




interface AddCoffeeFormProps {
  onAdd: (coffee: Coffee) => Promise<boolean>;
}

const createInitial = () => ({
  name: "",
  date: todayISO(),
  category: "single-origin",
  origin: "",
  roast: "medium",
  price: "",
  weightGrams: "250",
  rating: "4",
  import: false,
  inStock: true,
  tags: "",
});

type FormState = ReturnType<typeof createInitial>;

export default function AddCoffeeForm({ onAdd }: AddCoffeeFormProps) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(createInitial);
  const [formError, setFormError] = useState<string | null>(null);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    const price = Number(form.price);
    const weightGrams = Number(form.weightGrams);
    const rating = Number(form.rating);

    if (!form.name.trim()) return setFormError("Name is required.");
    if (form.price === "" || !(price >= 0)) return setFormError("Price must be 0 or more.");
    if (!(weightGrams > 0)) return setFormError("Weight must be greater than 0.");
    if (!(rating >= 0 && rating <= 5)) return setFormError("Rating must be between 0 and 5.");

    setFormError(null);

    const success = await onAdd({
        //Tesztelés, lehet hogy inkább manuális ID megadás lesz...
      id: generateId(),
      name: form.name.trim(),
      date: form.date,
      import: form.import,
      category: form.category,
      origin: form.origin.trim(),
      roast: form.roast,
      price,
      weightGrams,
      rating,
      inStock: form.inStock,
      tags: parseTags(form.tags),
    });

    if (success) setForm(createInitial());
  }

  if (!open) {
    return (
      <button className="btn btn-success mb-3" onClick={() => setOpen(true)}>
        ＋ Add new coffee
      </button>
    );
  }

  return (
    <div className="card shadow-sm mb-3">
      <div className="card-header d-flex justify-content-between align-items-center">
        <strong>Add new coffee</strong>
        <button className="btn-close" aria-label="Close" onClick={() => setOpen(false)} />
      </div>
      <form className="card-body" onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">Name</label>
            <input className="form-control" value={form.name} onChange={(e) => set("name", e.target.value)} />
          </div>
          <div className="col-md-4">
            <label className="form-label">Date</label>
            <input type="date" className="form-control" value={form.date} onChange={(e) => set("date", e.target.value)} />
          </div>
          <div className="col-md-4">
            <label className="form-label">Origin</label>
            <input className="form-control" value={form.origin} onChange={(e) => set("origin", e.target.value)} />
          </div>

          <div className="col-md-4">
            <label className="form-label">Category</label>
            <select className="form-select" value={form.category} onChange={(e) => set("category", e.target.value)}>
              <option>brand</option>
              <option>single-origin</option>
              <option>blend</option>
              <option>capsule</option>
              <option>ready-to-drink</option>
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label">Roast</label>
            <select className="form-select" value={form.roast} onChange={(e) => set("roast", e.target.value)}>
              <option>light</option>
              <option>medium-light</option>
              <option>medium</option>
              <option>medium-dark</option>
              <option>dark</option>
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label">Tags (comma separated)</label>
            <input className="form-control" value={form.tags} onChange={(e) => set("tags", e.target.value)} />
          </div>

          <div className="col-md-4">
            <label className="form-label">Price (€)</label>
            <input type="number" step="0.1" min="0" className="form-control" value={form.price} onChange={(e) => set("price", e.target.value)} />
          </div>
          <div className="col-md-4">
            <label className="form-label">Weight (g)</label>
            <input type="number" min="1" className="form-control" value={form.weightGrams} onChange={(e) => set("weightGrams", e.target.value)} />
          </div>
          <div className="col-md-4">
            <label className="form-label">Rating (0-5)</label>
            <input type="number" step="0.1" min="0" max="5" className="form-control" value={form.rating} onChange={(e) => set("rating", e.target.value)} />
          </div>

          <div className="col-12 d-flex gap-4">
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" id="importSwitch" checked={form.import} onChange={(e) => set("import", e.target.checked)} />
              <label className="form-check-label" htmlFor="importSwitch">Import</label>
            </div>
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" id="stockSwitch" checked={form.inStock} onChange={(e) => set("inStock", e.target.checked)} />
              <label className="form-check-label" htmlFor="stockSwitch">In stock</label>
            </div>
          </div>
        </div>

        {formError && <div className="alert alert-warning mt-3 mb-0">{formError}</div>}

        <button type="submit" className="btn btn-success mt-3">Add coffee</button>
      </form>
    </div>
  );
}