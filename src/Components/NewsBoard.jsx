import { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Pagination from "./Pagination";

const NewsBoard = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const pageSize = 10;

  const fetchArticles = async (page) => {
    let apikey = "d682ff216bbc42c98b0678a510479264";
    let url = `https://newsapi.org/v2/top-headlines?country=us&page=${page}&pageSize=${pageSize}&apikey=${apikey}`;

    try {
      const response = await fetch(url);
      console.log(response);
      const data = await response.json();
      console.log(`API Response for page ${page}:`, data);
      return data;
    } catch (error) {
      console.error("Error fetching the articles:", error);
      return null;
    }
  };

  
  useEffect(() => {
    const fetchAllArticles = async () => {
      const firstPageData = await fetchArticles(1);

      if (firstPageData) {
        const { articles: firstPageArticles, totalResults } = firstPageData;

        setArticles(firstPageArticles);
        setTotalResults(totalResults);
        const totalPages = Math.ceil(totalResults / pageSize);

        const pagePromises = [];
        for (let page = 2; page <= totalPages; page++) {
          pagePromises.push(fetchArticles(page));
        }

        const remainingPagesData = await Promise.all(pagePromises);
        const remainingArticles = remainingPagesData
          .filter((data) => data && data.articles) 
          .flatMap((data) => data.articles);

        setArticles((prevArticles) => [...prevArticles, ...remainingArticles]);
      }
    };

    fetchAllArticles();
  }, [category]);

  const totalPages = Math.ceil(articles.length / pageSize);

  const paginatedArticles = articles.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div >
      <div style={{paddingTop: '100px'}}>
      <h2 className="text-center">
        Trending <span className="badge bg-danger">News</span>
      </h2>
      </div>
      <div className="d-flex flex-wrap justify-content-center">
        
        {paginatedArticles.map((news, index) => (
          <NewsItem
            key={index}
            title={news.title}
            description={news.description}
            src={news.urlToImage}
            url={news.url}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default NewsBoard;

// import { useState, useEffect } from "react";
// import NewsItem from "./NewsItem";
// import Pagination from "./Pagination";

// const NewsBoard = ({ category }) => {
//   const [articles, setArticles] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalResults, setTotalResults] = useState(0);

//   const pageSize = 10;

//   const fetchArticles = async (page) => {
//     let apikey = import.meta.env.VITE_API_KEY;
//     let url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&page=${page}&pageSize=${pageSize}&apikey=${apikey}`;

//     try {
//       const response = await fetch(url);
//       const data = await response.json();
//       console.log(`API Response for page ${page}:`, data);

//       if (data && data.articles) {
//         return data;
//       } else {
//         return { articles: [], totalResults: 0 };
//       }
//     } catch (error) {
//       console.error("Error fetching the articles:", error);
//       return { articles: [], totalResults: 0 };
//     }
//   };

//   useEffect(() => {
//     const fetchCurrentPageArticles = async () => {
//       setArticles([]); // Reset articles when category changes
//       setCurrentPage(1); // Reset pagination

//       const data = await fetchArticles(1);
//       if (data) {
//         setArticles(data.articles);
//         setTotalResults(data.totalResults);
//       }
//     };

//     fetchCurrentPageArticles();
//   }, [category]); // Runs when category changes

//   useEffect(() => {
//     const fetchPageArticles = async () => {
//       const data = await fetchArticles(currentPage);
//       if (data) {
//         setArticles(data.articles);
//       }
//     };

//     fetchPageArticles();
//   }, [currentPage]); // Runs when currentPage changes

//   const totalPages = Math.ceil(totalResults / pageSize);

//   return (
//     <div>
//       <div style={{ paddingTop: "100px" }}>
//         <h2 className="text-center">
//           Trending <span className="badge bg-danger">News</span>
//         </h2>
//       </div>
//       <div className="d-flex flex-wrap justify-content-center">
//         {articles.length > 0 ? (
//           articles.map((news, index) => (
//             <NewsItem
//               key={index}
//               title={news.title}
//               description={news.description}
//               src={news.urlToImage}
//               url={news.url}
//             />
//           ))
//         ) : (
//           <p className="text-center">Loading news...</p>
//         )}
//       </div>
//       {totalPages > 1 && (
//         <Pagination
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onPageChange={(page) => setCurrentPage(page)}
//         />
//       )}
//     </div>
//   );
// };

// export default NewsBoard;
