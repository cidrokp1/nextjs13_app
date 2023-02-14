import Card from "@/pages/api/components/Card/Card";

export default async function Candidaturas() {

  const data = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=eae08655283c226acc01fd683762118d&language=en-US&page=1")
  const movies = await data.json(); 
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
  