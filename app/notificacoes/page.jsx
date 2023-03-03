"use client"
import { useEffect, useState } from "react";
import TableComponent from "../../components/shared/candidaturas/TableComponent"; 

export default function Notificacoes() {

  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://api.themoviedb.org/3/movie/popular?api_key=eae08655283c226acc01fd683762118d&language=en-US&page=1")
    .then((res) => res.json())
    .then((data) => setData(data.results))
    .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h4>Notificacoes</h4>
      <TableComponent list={data} />
    </>
  )
}
