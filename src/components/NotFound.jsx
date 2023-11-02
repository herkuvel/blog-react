import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div>
      <h1>Sayfa Bulunamadı</h1>
      <Link to="/">Ana Sayfaya Dön</Link>
    </div>
  );
}

export default NotFound;
