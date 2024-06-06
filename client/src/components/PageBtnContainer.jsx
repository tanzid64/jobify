import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useAllJobsContext } from "../pages/AllJobs";

const PageBtnContainer = () => {
  const { numOfPages, currentPage } = useAllJobsContext();
  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });

  const {pathname, search} = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`, { replace: true });
  };

  const handlePrevPageClick = () => {
    let prevPage = currentPage - 1;
    if (prevPage < 1) {
      prevPage = numOfPages;
    }
    handlePageChange(prevPage);
  };
  const handleNextPageClick = () => {
    let nextPage = currentPage + 1;
    if (nextPage > numOfPages) {
      nextPage = numOfPages;
    }
    handlePageChange(nextPage);
  };
  return (
    <Wrapper>
      <button className="btn prev-btn" onClick={handlePrevPageClick}>
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">
        {pages.map((pageNumber) => {
          return (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`btn page-btn ${
                pageNumber === currentPage && "active"
              }`}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
      <button className="btn next-btn" onClick={handleNextPageClick}>
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};
export default PageBtnContainer;
