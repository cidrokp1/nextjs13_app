"use client"
export default function Error({error, reset}) {
    return (
        <>
            <h5>Erro:</h5>
            <p>{error.message}</p>

            <button onClick={() => reset()}>Recarregar</button>
        </>
    )
}