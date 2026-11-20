
import useFetch from "./components/DataGathering";
import "bootstrap"

function CoffeeList() {
  const { data, refetch } = useFetch({});
  refetch()
  return (
    <>
      <button onClick={refetch} className="btn btn-warning">Refresh</button>
        <table>
          <thead>
            <th>
            name

            </th>
            <th>
date

            </th>
            <th>
import

            </th>
            <th>
category

            </th>
origin
            <th>
roast

            </th>
            <th>
price

            </th>
            <th>
weightGrams

            </th>
            <th>
rating

            </th>
            <th>
inStock

            </th>
            <th>

            </th>
            <th>

            </th>
            <th>tags</th>
          </thead>
        </table>
        {data?.map((coffee) => (
          
        ))}
      
    </>
  );
}



function App() {

  return(
    <>
      <CoffeeList></CoffeeList>

    </>)

}

export default App
