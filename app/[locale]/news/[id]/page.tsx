import { notFound } from "next/navigation";

async function fetchPost(id: string) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typiode.com/posts/${id}`
    );
    const data = await response.json();

    return data;
  } catch (err) {
    notFound();
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const data = await fetchPost(id);

  return (
    <div>
      <h1>page: {id}</h1>
      <h2>{data.title}</h2>
      <p>{data.body}</p>
    </div>
  );
}

export async function generateStaticParams() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();
  const paths = data.map((post) => ({ id: post.id.toString() }));

  return paths;
}

export const dynamicParams = false;
