import { useEffect, useState } from "react";
import type { Coffee } from "../../Types/Type";
import { addCoffee, deleteCoffee, getCoffees, updateCoffee } from "../Backend_stuff/DataGathering";
import { makeId, changeNumber } from "../Page_Componets/Utility";


const emptyForm = {
  name: "",
  date: new Date().toISOString().slice(0, 10),
  category: "single-origin",
  origin: "",
  roast: "medium",
  price: "",
  weightGrams: "250",
  rating: "4",
  import: false,
  inStock: true,
  tags: "",
};

function AdminPage() {
  const [coffees, setCoffees] = useState<Coffee[]>([]);
  const [form, setForm] = useState(emptyForm);

  async function loadData() {
    try {
      const data = await getCoffees();
      setCoffees(data);
    } catch (err) {
      console.log("Error while loading: " + err);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleAdd(e: React.SubmitEvent) {
    e.preventDefault();

    if (form.name === "" || form.price === "") {
      alert("Name and price are required!");
      return;
    }

    const newCoffee: Coffee = {
      id: makeId(),
      name: form.name,
      date: form.date,
      import: form.import,
      category: form.category,
      origin: form.origin,
      roast: form.roast,
      price: Number(form.price),
      weightGrams: Number(form.weightGrams),
      rating: Number(form.rating),
      inStock: form.inStock,
      tags: form.tags.split(",").map((t) => t.trim()).filter((t) => t !== ""),
    };

    await addCoffee(newCoffee);
    setForm(emptyForm);
    loadData();
  }

  
  async function handleDelete(coffee: Coffee) {
    if (confirm("Szeretnéd törlni " + coffee.name + "-t a listából?")) {
      await deleteCoffee(coffee.id);
      loadData();
    }
  }

  
  async function toggleImport(coffee: Coffee) {
    await updateCoffee(coffee.id, { import: !coffee.import });
    loadData();
  }

  async function toggleStock(coffee: Coffee) {
    await updateCoffee(coffee.id, { inStock: !coffee.inStock });
    loadData();
  }

  
  async function changePrice(coffee: Coffee, amount: number) {
    const newPrice = changeNumber(coffee.price, amount, 0, 1000);
    await updateCoffee(coffee.id, { price: newPrice });
    loadData();
  }

  async function changeRating(coffee: Coffee, amount: number) {
    const newRating = changeNumber(coffee.rating, amount, 0, 5);
    await updateCoffee(coffee.id, { rating: newRating });
    loadData();
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Giga Kávé Irányitás</h2>
        {/* <button className="btn btn-warning" onClick={loadData}>Frissités</button> */}
      </div>

      <div className="card mb-3">
        <div className="card-header">Új kávék hozzáadása</div>
        <form className="card-body" onSubmit={handleAdd}>
          <div className="row g-2">
            <div className="col-md-4">
              <label className="form-label">Kávé neve</label>
              <input className="form-control" value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Hozzáadás Dátuma</label>
              <input type="date" className="form-control" value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Eredete</label>
              <input className="form-control" value={form.origin}
                onChange={(e) => setForm({ ...form, origin: e.target.value })} />
            </div>

            <div className="col-md-4">
              <label className="form-label">Kávé kategoriája</label>
              <select className="form-select" value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}>
                <option>brand</option>
                <option>single-origin</option>
                <option>blend</option>
                <option>capsule</option>
                <option>ready-to-drink</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Pörkölése</label>
              <select className="form-select" value={form.roast}
                onChange={(e) => setForm({ ...form, roast: e.target.value })}>
                <option>light</option>
                <option>medium-light</option>
                <option>medium</option>
                <option>medium-dark</option>
                <option>dark</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Egyébb részletek (vesszövel elválasztva)</label>
              <input className="form-control" value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })} />
            </div>

            <div className="col-md-4">
              <label className="form-label">Ára (€)</label>
              <input type="number" step="0.1" className="form-control" value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Súlya (g)</label>
              <input type="number" className="form-control" value={form.weightGrams}
                onChange={(e) => setForm({ ...form, weightGrams: e.target.value })} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Értékelés (0-5)</label>
              <input type="number" step="0.1" min="0" max="5" className="form-control" value={form.rating}
                onChange={(e) => setForm({ ...form, rating: e.target.value })} />
            </div>

            <div className="col-12">
              <div className="form-check form-check-inline">
                <input type="checkbox" className="form-check-input" id="importCheck" checked={form.import}
                  onChange={(e) => setForm({ ...form, import: e.target.checked })} />
                <label className="form-check-label" htmlFor="importCheck">Import áru</label>
              </div>
              <div className="form-check form-check-inline">
                <input type="checkbox" className="form-check-input" id="stockCheck" checked={form.inStock}
                  onChange={(e) => setForm({ ...form, inStock: e.target.checked })} />
                <label className="form-check-label" htmlFor="stockCheck">Készleten</label>
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-success mt-3">Kávé hozzáadása</button>
        </form>
      </div>

      <div className="border rounded-3 overflow-auto">
        <table className="table table-striped mb-0 align-middle">
          <thead className="table-dark">
            <tr>
              <th>Kávé neve</th>
              <th>Hozzáadás dátuma</th>
              <th>Import áru</th>
              <th>Kávé kategoriája</th>
              <th>Eredete</th>
              <th>Pörkölése</th>
              <th>Ára</th>
              <th>Súlya (g)</th>
              <th>Értékelés</th>
              <th>Készleten</th>
              <th>Egyébb részletek</th>
              <th>Törlés</th>
            </tr>
          </thead>
          <tbody>
            {coffees.map((coffee) => (
              <tr key={coffee.id}>
                <td>{coffee.name}</td>
                <td>{coffee.date}</td>
                <td>
                  <button className="btn btn-sm btn-light btn-outline-secondary" onClick={() => toggleImport(coffee)}>
                    {coffee.import ? "✔" : "❌"}
                  </button>
                </td>
                <td>{coffee.category}</td>
                <td>{coffee.origin}</td>
                <td>{coffee.roast}</td>
                <td>
                  <button className="btn btn-sm btn-outline-secondary" onClick={() => changePrice(coffee, -0.5)}>-</button>
                  <span className="mx-2">{coffee.price} €</span>
                  <button className="btn btn-sm btn-outline-secondary" onClick={() => changePrice(coffee, 0.5)}>+</button>
                </td>
                <td>{coffee.weightGrams}</td>
                <td>
                  <button className="btn btn-sm btn-outline-secondary" onClick={() => changeRating(coffee, -0.1)}>-</button>
                  <span className="mx-2">{coffee.rating}</span>
                  <button className="btn btn-sm btn-outline-secondary" onClick={() => changeRating(coffee, 0.1)}>+</button>
                </td>
                <td>
                  <button className="btn btn-sm btn-light btn-outline-secondary" onClick={() => toggleStock(coffee)}>
                    {coffee.inStock ? "✅" : "❌"}
                  </button>
                </td>
              <td className="d-flex gap-3">{coffee.tags.map(e => (
                  <span className="btn bg-secondary px-2 py-1" style={{color: "#FFFFFF"}}>{e.toString()}</span>
                ))}</td>
                <td>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(coffee)}>Törlés</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AdminPage;