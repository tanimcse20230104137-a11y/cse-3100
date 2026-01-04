import { useEffect, useMemo, useState } from 'react';

const BREEDS = [
  'Sphynx',
  'Peterbald',
  'Birman',
  'Abyssinian',
  'Persian',
  'Bengal',
  'Siamese',
];

const CAT_DATA = [
  { name: 'Micky ', age: '1', breed: 'Siamese' },
  { name: 'Pussy', age: '2', breed: 'Persian' },
  { name: 'Tommy', age: '3', breed: 'Bengal' },
  { name: 'Jerry', age: '2', breed: 'Abyssinian' },
  { name: 'Alana', age: '4', breed: 'Birman' },
  { name: 'shafe', age: '6', breed: 'Sphynx' },
  { name: 'jenny', age: '1', breed: 'Peterbald' },
];

export default function AvailableCats() {
  const [cats, setCats] = useState([]);
  const [breed, setBreed] = useState('');
  const [search, setSearch] = useState('');
  const [appliedSearch, setAppliedSearch] = useState('');

  useEffect(() => {
    const fetchImages = async () => {
      const responses = await Promise.all(
        CAT_DATA.map(() =>
          fetch('https://api.thecatapi.com/v1/images/search').then(res =>
            res.json()
          )
        )
      );

      setCats(
        CAT_DATA.map((cat, i) => ({
          ...cat,
          image: responses[i][0].url,
        }))
      );
    };

    fetchImages();
  }, []);

  const filteredCats = useMemo(() => {
    return cats.filter(cat => {
      const matchBreed = breed ? cat.breed === breed : true;
      const matchName = appliedSearch
        ? cat.name.toLowerCase().includes(appliedSearch.toLowerCase())
        : true;
      return matchBreed && matchName;
    });
  }, [cats, breed, appliedSearch]);

  return (
    <section className="section">
      <div className="available-header">
        <h2>Available cats</h2>

        <form
          className="filters"
          onSubmit={e => {
            e.preventDefault();
            setAppliedSearch(search);
          }}
        >
          <select
            className="control"
            value={breed}
            onChange={e => setBreed(e.target.value)}
          >
            <option value="">select breed</option>
            {BREEDS.map(b => (
              <option key={b}>{b}</option>
            ))}
          </select>

          <input
            className="control"
            placeholder="search by name"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <button className="btn">Search</button>
        </form>
      </div>

      <div className="cats-grid">
        {filteredCats.map((cat, i) => (
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
