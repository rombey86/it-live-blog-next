import React from 'react';
import { DiscussionEmbed } from 'disqus-react';

const DisqusComments = ({ postUrl, postId, postTitle }) => {
  const disqusShortname = 'it-live-blog-com'; // Ersetzen Sie "Ihr-Disqus-Shortname" durch Ihren tatsächlichen shortname von Disqus.

  const disqusConfig = {
    url: postUrl,
    identifier: postId, // Eindeutige ID für den Post
    title: postTitle, // Titel des Posts
  };

  return <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />;
};
export default DisqusComments;
