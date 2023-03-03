import Card from "@/components/shared/Card/Card";


async function getData() {
  const res = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=eae08655283c226acc01fd683762118d&language=en-US&page=1",{
    next: {
      revalidate: 30 //atualiza de 30 em 30 segundos 
    },
  });  
  if (!res.ok) { 
    throw new Error('Falha ao obter os dados');
  }

  return res.json();
}

export default async function Candidaturas() {

  const list = await getData();

  return (
    <>
     <div className="section-container shadow"> 
       <h1>Candidaturas</h1>
       <div className="d-flex flex-wrap justify-content-around gap-4">
          { list.results.map((movie) => <Card title={movie.title} id={movie.id} /> )}
       </div>
     </div>
    </>
  ) 
  }
  