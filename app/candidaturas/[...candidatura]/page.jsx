// "use client"

import Link from "next/link";
// import { useRouter } from "next/navigation";


export default async function Candidatura({...props}) {
 
    const data = await fetch("https://api.themoviedb.org/3/movie/"+ props.params["candidatura"] +"?api_key=eae08655283c226acc01fd683762118d")
    const movie = await data.json(); 
    console.log(movie);


    return (
      <>
       <div className="section-container shadow"> 
       <Link href="/candidaturas">Voltar</Link>
         <h1>Candidatura {props.params["candidatura"]}</h1>
         <div className="d-flex flex-wrap justify-content-around gap-4">
            {JSON.stringify(movie)}
         </div>
       </div>
      </>
    )
  }
  