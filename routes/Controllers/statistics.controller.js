const Song = require("../../Models/Song");

const generateStatistics = async (req, res) => {
  try {
    const totalSongs = await Song.countDocuments({ delete_at: null });
    const totalArtists = await Song.distinct("artist", {
      delete_at: null,
    }).countDocuments();
    const totalAlbums = await Song.distinct("album", {
      delete_at: null,
    }).countDocuments();
    const totalGenres = await Song.distinct("genre", {
      delete_at: null,
    }).countDocuments();

    const genreCounts = await Song.aggregate([
      { $match: { delete_at: null } }, // Filter out soft-deleted songs
      { $group: { _id: "$genre", count: { $sum: 1 } } },
    ]);

    const artistAlbumCounts = await Song.aggregate([
      { $match: { delete_at: null } }, // Filter out soft-deleted songs
      {
        $group: {
          _id: { artist: "$artist", album: "$album" },
          count: { $sum: 1 },
        },
      },
    ]);

    const softDeletedSongsCount = await Song.countDocuments({
      delete_at: { $ne: null },
    });

    return res.json({
      totalSongs,
      totalArtists,
      totalAlbums,
      totalGenres,
      genreCounts,
      artistAlbumCounts,
      softDeletedSongsCount,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  generateStatistics,
};
