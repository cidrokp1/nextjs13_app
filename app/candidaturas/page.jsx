import Card from "@/pages/api/components/Card/Card";

export default async function Candidaturas() {

  const response = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=eae08655283c226acc01fd683762118d&language=en-US&page=1",{
    next: {
      revalidate: 30, //atualiza de 30 em 30 segundos
      cache: "force-cache", //no-store, no-cache, force-cache, only-if-cached
    },
  })
  const movies = await response.json(); 
  console.log(movies.results);

  return (
    <>
     <div className="section-container shadow"> 
       <h1>Candidaturas</h1>
       <div className="d-flex flex-wrap justify-content-around gap-4">
          { movies.results.map((movie) => <Card title={movie.title} id={movie.id} /> )}
       </div>
     </div>
     
    </>
  ) 
  }
  