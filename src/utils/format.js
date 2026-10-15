const imageUrl = (req, file) => {
  if (!file) return "";
  if (file.startsWith("http://") || file.startsWith("https://")) return file;
  return `${req.protocol}://${req.get("host")}/images/${file}`;
};

const formatUser = (req, u) => {
  if (!u) return null;
  return {
    id: u._id.toString(),
    name: u.name,
    occupation: u.occupation,
    profileImage: imageUrl(req, u.profileImage),
    connectionsCount: u.connectionsCount ?? 0,
  };
};

const formatPost = (req, p, isLiked = false) => {
  if (!p) return null;
  return {
    id: p._id.toString(),
    content: p.content,
    images: (p.images || []).map((img) => imageUrl(req, img)),
    likesCount: p.likesCount ?? 0,
    sharesCount: p.sharesCount ?? 0,
    commentsCount: p.commentsCount ?? 0,
    isLiked: Boolean(isLiked),
    createdAt: p.createdAt,
    author: p.author && p.author.name ? formatUser(req, p.author) : (p.author ? p.author.toString() : null),
  };
};

module.exports = { formatUser, formatPost };