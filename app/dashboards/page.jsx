import Perfis from "../perfil/perfil";

async function getData() {
  const res = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=eae08655283c226acc01fd683762118d&language=en-US&page=1",{
    next: {
      revalidate: 30, //atualiza de 30 em 30 segundos
      cache: "force-cache", //no-store, no-cache, force-cache, only-if-cached
    },
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Dashboards() {

  const data = await getData();

  return (
    <>
     <div className="section-container shadow">
        <h1>Dashboards</h1>
        <Perfis list={data.results}/>
     </div>
    
    </>
  )
  
  }
  