"use client"
import { useEffect, useState } from "react";
import Perfis from "./perfil";

export default function Perfil() {

  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://api.themoviedb.org/3/movie/popular?api_key=eae08655283c226acc01fd683762118d&language=en-US&page=1")
    .then((res) => res.json())
    .then((data) => setData(data.results))
    .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h4>Perfil</h4>
      <Perfis list={data} />
    </>
  )
}
