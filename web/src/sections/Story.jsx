export default function Story() {
  return (
    <section className="story" id="story" aria-label="Opralvin One">
      <div className="wrap story-hero">
        <div className="story-lead">
          <h1>The same goods. Three different numbers.</h1>
          <p className="lead">
            Sales, the warehouse, and the books each keep their own figure. A receipt posts the quantity and the value once. The first meeting is a free process audit.
          </p>
          <div className="acts">
            <a className="btn amber" href="#book">Book a free process audit</a>
            <a className="tlink" href="#docs">See the paperwork</a>
          </div>
        </div>
        <figure className="triad" aria-label="Sample figures for one delivery to Riverside Metals">
          <div>
            <p>Sales</p>
            <p className="amt">₹59,000</p>
            <p>SINV-0001, Riverside Metals</p>
          </div>
          <div>
            <p>Warehouse</p>
            <p className="amt">10</p>
            <p>units of 12 mm steel rod</p>
          </div>
          <div>
            <p>Accounts</p>
            <p className="amt">Open</p>
            <p>The invoice is still open</p>
          </div>
          <figcaption>Sample. Northline, 24 Oct 2026.</figcaption>
        </figure>
      </div>
    </section>
  );
}
