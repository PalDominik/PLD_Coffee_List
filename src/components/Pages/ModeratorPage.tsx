import { useEffect, useState } from "react";
import type { Coffee } from "../../Types/Type";
import { getCoffees, updateCoffee } from "../Backend_stuff/DataGathering";
import { changeNumber } from "../Page_Componets/Utility";


function ModeratorPage() {
  const [coffees, setCoffees] = useState<Coffee[]>([]);

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
        <h2>Kávé adatok változtatása</h2>
        {/* <button className="btn btn-warning" onClick={loadData}>Frissités</button> */}
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ModeratorPage;