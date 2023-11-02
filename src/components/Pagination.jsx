import { useContext } from "react";
import BlogContext from "../context/blog";
import PropTypes from "prop-types";

function Pagination({ totalPosts }) {
  const { postsPerPage, paginate } = useContext(BlogContext);

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a onClick={() => paginate(number)} className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;

Pagination.propTypes = {
  totalPosts: PropTypes.any,
};
