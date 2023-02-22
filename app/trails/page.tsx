export default async function TrailsPage() {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos');
    const table = await res.json();

    return <>
        <h1>Trails Page</h1>

        <ul>
            {table.map((todo:any) => (
                <li key={todo.id}>{todo.title}</li>
            ))}
        </ul>
    </>
}
