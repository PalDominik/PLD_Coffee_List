import { useEffect, useState } from "react";
import type { Coffee } from "../../Types/Type";
import { getCoffees } from "../Backend_stuff/DataGathering";


function UserPage() {
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

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Kávé Válogatások</h2>
        {/* <button className="btn btn-warning" onClick={loadData}>Frissités</button> */}
      </div>

      <div className="border rounded-3 overflow-auto">
        <table className="table table-striped mb-0">
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
                <td>{coffee.import ? "✔" : "❌"}</td>
                <td>{coffee.category}</td>
                <td>{coffee.origin}</td>
                <td>{coffee.roast}</td>
                <td>{coffee.price} €</td>
                <td>{coffee.weightGrams}</td>
                <td>{coffee.rating}</td>
                <td>{coffee.inStock ? "✅" : "❌"}</td>
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

export default UserPage;