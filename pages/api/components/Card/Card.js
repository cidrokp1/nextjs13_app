"use client"

import Link from "next/link";

export default function Card({ title, id, posterImg }) {
  return (
    <div className="card my-2 p-3">
        <h5>{title}</h5>
        <p>{id}</p>
        <Link href={`/candidaturas/${id}`}>Candidatura {id}</Link>
    </div>
  );
}