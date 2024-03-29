import { useInfiniteQuery } from "react-query";
import InfiniteScroller from "./InfiniteScroller";
import PostCard from "./PostCard";
import "./styles.css";

// function fetchPosts that fetches posts from an API endpoint.
const fetchPosts = async ({ pageParam = 1 }) => {
  const response = await fetch(
    `https://picsum.photos/v2/list?page=${pageParam}&limit=5`
  );
  const results = await response.json();
  return { results, nextPage: pageParam + 1, totalPages: 10 };
};

export default function App() {

  // The useInfiniteQuery hook to fetch paginated data. We provide a unique key ('posts'), the fetch function (fetchPosts), and an options object.
  // The getNextPageParam option is a function that returns the parameter for the next page request. In this case, we return the next page number.
  const {
    isLoading,
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useInfiniteQuery("posts", fetchPosts, {
    getNextPageParam(lastPage) {
      if (lastPage.nextPage < lastPage.totalPages) return lastPage.nextPage;
      return undefined;
    }
  });
  if (isLoading) {
    return <h1>Loading</h1>;
  }

  return (
    <div className="App">
      <InfiniteScroller hasMore={hasNextPage} loadMore={fetchNextPage}>
        {data.pages.map((page) =>
          page.results.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </InfiniteScroller>
      {isFetchingNextPage && <h1>Loading more images</h1>}
    </div>
  );
}
