export default function Contact() {
  return (
    <section className="section">
      <h2>Contact us</h2>

      <form style={{ maxWidth: 500 }}>
        <input className="control" placeholder="Name" />
        <input className="control" placeholder="Phone" />
        <input className="control" placeholder="Email" />
        <button className="btn">Submit</button>
      </form>
    </section>
  );
}
