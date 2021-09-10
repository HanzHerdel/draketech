import PostsCard from "./generic/PostCard";

function Home({ posts = [], isFetching, ...rest }) {
  return (
    <main>
      <header>
        <h1>My blogs</h1>
      </header>
      <section>
        {isFetching ? "Fetching posts..." : `Loaded ${posts.length} posts.`}
      </section>
      {posts.map((p) => (
        <PostsCard onlyHead key={p._id} post={p} />
      ))}
    </main>
  );
}

export default Home;
