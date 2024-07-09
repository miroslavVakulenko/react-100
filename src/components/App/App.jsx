import { useEffect, useState } from "react";
import ArticleList from "../ArticleList/ArticleList";
import SearchForm from "../SearchForm/SearchForm";
import { fetchArticles } from "../../articles-api";
import css from "./App.module.css";

export default function App() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [page, setPage] = useState(1);
  // setQuery its for pagination for remember query on other pages

  const [query, setQuery] = useState('');

  const handleSearch = newQuery => {
    setQuery(newQuery);
    setPage(1);
    //for next search to clear ul

    setArticles([]);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    // pattern: not fetch before submit search form
    // we pass mount
    if (query === '') {
      return;
    }

    async function getArticles() {
      try {
        setError(false);
        setIsLoading(true);
        const data = await fetchArticles(query, page);
        //pattern: how rest el from State. react add to arg (prevArticles) prev State.

        setArticles(prevArticles => {
          return [...prevArticles, ...data];
        });
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getArticles();
  }, [page, query]);

  return (
    <div className={css.container}>
      <h1>HTTP requests in React</h1>

      <SearchForm onSearch={handleSearch} />

      {error && <b>Oops! There was an error! Please reload!</b>}

      {articles.length > 0 && <ArticleList items={articles} />}

      {isLoading && <b>Please wait, loading articles...</b>}
      {articles.length > 0 && !isLoading && (
        <button onClick={handleLoadMore}>Load more articles</button>
      )}
    </div>
  );
}

// if we don't need pagination we make request into handleSearch
// useEffect(() => {
//   async function getArticles() {
//     try {
//       setIsLoading(true);
//       const data = await fetchArticles("html");
//       setArticles(data);
//     } catch (error) {
//       setError(true);
//     } finally {
//       setIsLoading(false);
//     }
//   }
//   getArticles();
// }, []);

//css loaders for react https://www.davidhu.io/react-spinners/
