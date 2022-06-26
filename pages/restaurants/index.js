import Link from "next/link";

export default function Home() {
  const restaurants = [
    { name: "WoodsHill" },
    { name: "Fiorellas" },
    { name: "Karmar" },
  ];
  return (
    <div>
      <h1>Restaurant List</h1>
      {restaurants.map((item) => {
        return (
          <div>
            <Link
              as={"/restaurants/" + item.name}
              href="restaurants/[restaurant]"
            >
              <a>{item.name}</a>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
