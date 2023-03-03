import TableComponent from "@/components/shared/candidaturas/TableComponent";

async function getData() {
   const res = await fetch(process.env.NEXT_PUBLIC_LOCAL_API + "/api");
  // const res = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=eae08655283c226acc01fd683762118d&language=en-US&page=1");  
  
  if (!res.ok) { 
    throw new Error('Falha ao obter os dados');
  }
  return res.json();
}

export default async function Dashboards() {

  const data = await getData();

  return (
    <>
     <div className="section-container shadow">
        <h1>Dashboards</h1>
        <TableComponent list={data}/>
     </div>
    
    </>
  )
  
  }
  