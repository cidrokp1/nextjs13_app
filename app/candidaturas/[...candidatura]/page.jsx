import Card from "@/pages/api/components/Card/Card";
export default async function Candidatura({...props}) {


    const data = await fetch("https://api.themoviedb.org/3/movie/"+ props.params["candidatura"] +"/popular?api_key=eae08655283c226acc01fd683762118d&language=en-US&page=1")
    const movie = await data.json(); 
    console.log(movie.results);
 
    return (
      <>
       <div className="section-container shadow"> 
         <h1>Candidatura {props.params["candidatura"]}</h1>
         <div className="d-flex flex-wrap justify-content-around gap-4">
            {JSON.stringify(movie.results)}
         </div>
       </div>
       
      </>
    )
  }
  