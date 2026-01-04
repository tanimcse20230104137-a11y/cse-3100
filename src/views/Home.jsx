import { useEffect, useState } from 'react';

const featuredCats = [
  { name: 'Bob Doe', age: '3', breed: 'Siamese' },
  { name: 'Bob Doe', age: '4', breed: 'Persian' },
  { name: 'Bob Doe', age: '2 months', breed: 'Bengal' },
  { name: 'Bob Doe', age: '2 months', breed: 'Abyssinian' },
];

export default function Home() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const responses = await Promise.all(
        featuredCats.map(() =>
          fetch('https://api.thecatapi.com/v1/images/search').then(res =>
            res.json()
          )
        )
      );

      setCats(
        featuredCats.map((cat, i) => ({
          ...cat,
          image: responses[i][0].url,
        }))
      );
    };

    fetchImages();
  }, []);

  return (
    <section className="section">
      <h2>Welcome to Purrfect Adoption</h2>
      <p>
        Our Goal is to Keep Safe the cats
      </p>

      <h2>Featured cats</h2>
      <div className="cats-grid">
        {cats.map((cat, i) => (
          <div className="cat-card" key={i}>
            <img src={cat.image} className="cat-img" alt={cat.name} />
            <div className="cat-info">
              <div className="cat-name">{cat.name}</div>
              <div className="cat-meta">Age: {cat.age}</div>
              <div className="cat-meta">Breed: {cat.breed}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
