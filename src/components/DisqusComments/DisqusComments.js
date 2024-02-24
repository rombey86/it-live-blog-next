import { DiscussionEmbed } from 'disqus-react';

const DisqusComments = ({ post }) => {
  const disqusConfig = {
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/posts/${post.slug}`,
    identifier: post.id.toString(),
    title: post.title,
  };

  return <DiscussionEmbed shortname={process.env.NEXT_PUBLIC_DISQUS_SHORTNAME} config={disqusConfig} />;
};

export default DisqusComments;
