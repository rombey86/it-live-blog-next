import { DiscussionEmbed } from 'disqus-react';
const DisqusComments = ({ post }) => {
  const disqusShortname = 'it-live-blog-com';
  const disqusConfig = {
    url: 'https://it-live-blog.com/post-slug',
    identifier: post.id, // Single post id
    title: post.title, // Single post title
  };
  return (
    <div>
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </div>
  );
};
export default DisqusComments;
