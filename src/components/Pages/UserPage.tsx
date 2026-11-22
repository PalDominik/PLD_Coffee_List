import useFetch from "../Backend_stuff/DataGathering";

export default function CoffeeList() {
  const { data, refetch } = useFetch({});
  refetch()
  return (
    <>
      {/* <button onClick={refetch} className="btn btn-warning mt-1  ms-2 p-1">Refresh</button> */}
      <br />
      
      <div className="border rounded-3 overflow-auto m-2 p-1">
        <table className="table table-striped">
          <thead>
            <tr>
            <th style={{backgroundColor:"#7B3306", color: "#F9FAFB"}}>name</th>
            <th style={{backgroundColor:"#7B3306", color: "#F9FAFB"}}>date</th>
            <th style={{backgroundColor:"#7B3306", color: "#F9FAFB"}}>import</th>
            <th style={{backgroundColor:"#7B3306", color: "#F9FAFB"}}>category</th>
            <th style={{backgroundColor:"#7B3306", color: "#F9FAFB"}}>origin</th>
            <th style={{backgroundColor:"#7B3306", color: "#F9FAFB"}}>roast</th>
            <th style={{backgroundColor:"#7B3306", color: "#F9FAFB"}}>price</th>
            <th style={{backgroundColor:"#7B3306", color: "#F9FAFB"}}>weightGrams</th>
            <th style={{backgroundColor:"#7B3306", color: "#F9FAFB"}}>rating</th>
            <th style={{backgroundColor:"#7B3306", color: "#F9FAFB"}}>inStock</th>
            <th style={{backgroundColor:"#7B3306", color: "#F9FAFB"}}>tags</th>
            </tr>
          </thead>
          <tbody>

            {data?.map((coffee, index) => (
              <tr key={index}>
                <td style={index%2 == 0 ?{backgroundColor: "#E7E5E4", color: "#1E1A4D"}:{backgroundColor: "#1E1A4D", color: "#E2E8F0"}}>{coffee.name}</td>
                <td style={index%2 == 0 ?{backgroundColor: "#E7E5E4", color: "#1E1A4D"}:{backgroundColor: "#1E1A4D", color: "#E2E8F0"}}>{coffee.date}</td>
                <td style={index%2 == 0 ?{backgroundColor: "#E7E5E4", color: "#1E1A4D"}:{backgroundColor: "#1E1A4D", color: "#E2E8F0"}}>{coffee.import ? "✔":"❌"}</td>
                <td style={index%2 == 0 ?{backgroundColor: "#E7E5E4", color: "#1E1A4D"}:{backgroundColor: "#1E1A4D", color: "#E2E8F0"}}>{coffee.category}</td>
                <td style={index%2 == 0 ?{backgroundColor: "#E7E5E4", color: "#1E1A4D"}:{backgroundColor: "#1E1A4D", color: "#E2E8F0"}}>{coffee.origin}</td>
                <td style={index%2 == 0 ?{backgroundColor: "#E7E5E4", color: "#1E1A4D"}:{backgroundColor: "#1E1A4D", color: "#E2E8F0"}}>{coffee.roast}</td>
                <td style={index%2 == 0 ?{backgroundColor: "#E7E5E4", color: "#1E1A4D"}:{backgroundColor: "#1E1A4D", color: "#E2E8F0"}}>{coffee.price}</td>
                <td style={index%2 == 0 ?{backgroundColor: "#E7E5E4", color: "#1E1A4D"}:{backgroundColor: "#1E1A4D", color: "#E2E8F0"}}>{coffee.weightGrams}</td>
                <td style={index%2 == 0 ?{backgroundColor: "#E7E5E4", color: "#1E1A4D"}:{backgroundColor: "#1E1A4D", color: "#E2E8F0"}}>{coffee.rating}</td>
                <td style={index%2 == 0 ?{backgroundColor: "#E7E5E4", color: "#1E1A4D"}:{backgroundColor: "#1E1A4D", color: "#E2E8F0"}}>{coffee.inStock ? "✅" : "❌"}</td>
                <td style={index%2 == 0 ?{backgroundColor: "#E7E5E4", color: "#1E1A4D"}:{backgroundColor: "#1E1A4D", color: "#E2E8F0"}}>{coffee.tags.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>      
    </>
  );
}