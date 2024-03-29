const PostCard = ({ post }) => {
  return (
    <div className="post-card">
      <h4>{post.author}</h4>
      <img src={post.download_url} alt={post.author} loading="lazy"/>
    </div>
  );
};

export default PostCard;
