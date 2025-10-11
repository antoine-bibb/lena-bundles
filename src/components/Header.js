import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import { products } from "../lib/products";
import { formatPrice } from "../lib/price";

export default function Header() {
  const { count } = useCart();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container">
        <Link className="navbar-brand" to="/">Lena’s Bundles</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
          </ul>

          <button className="btn btn-outline-light">
            <ShoppingCart className="me-1" /> Cart <span className="badge bg-light text-dark ms-1">{count}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}


export function Home() {
  return (
    <div className="container py-5">
      <div className="row g-4">
        {products.map((p) => (
          <div key={p.id} className="col-12 col-sm-6 col-lg-4">
            <div className="card h-100 shadow-sm">
              <img src={p.images[0]} className="card-img-top" alt={p.name} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text text-muted small">{p.origin} • {p.texture}</p>
                <p className="fw-semibold text-primary">{formatPrice(p.basePrice)}</p>
                <Link to={`/product/${p.id}`} className="btn btn-outline-primary mt-auto">See More</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
