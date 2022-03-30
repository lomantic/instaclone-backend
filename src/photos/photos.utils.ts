const processHashtags = (caption: String) => {
  let hashtagsObjs = null;
  const hashtags = caption.match(/#[\w]+/g) || [];
  hashtagsObjs = hashtags.map((hashtag: String) => ({
    where: { hashtag },
    create: { hashtag },
  }));
  return hashtagsObjs;
};

export default processHashtags;
