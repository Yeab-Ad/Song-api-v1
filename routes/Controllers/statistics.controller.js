// const Song = require("../../Models/Song");

// const generateStatistics = async (req, res) => {
//   try {
//     const totalSongs = await Song.countDocuments({ delete_at: null });
//     const totalArtists = await Song.distinct("artist", {
//       delete_at: null,
//     }).countDocuments();
//     const totalAlbums = await Song.distinct("album", {
//       delete_at: null,
//     }).countDocuments();
//     const totalGenres = await Song.distinct("genre", {
//       delete_at: null,
//     }).countDocuments();

//     const genreCounts = await Song.aggregate([
//       { $match: { delete_at: null } }, // Filter out soft-deleted songs
//       { $group: { _id: "$genre", count: { $sum: 1 } } },
//     ]);

//     const artistAlbumCounts = await Song.aggregate([
//       { $match: { delete_at: null } }, // Filter out soft-deleted songs
//       {
//         $group: {
//           _id: { artist: "$artist", album: "$album" },
//           count: { $sum: 1 },
//         },
//       },
//     ]);

//     const softDeletedSongsCount = await Song.countDocuments({
//       delete_at: { $ne: null },
//     });

//     return res.json({
//       totalSongs,
//       totalArtists,
//       totalAlbums,
//       totalGenres,
//       genreCounts,
//       artistAlbumCounts,
//       softDeletedSongsCount,
//     });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };

// module.exports = {
//   generateStatistics,
// };

const mongoose = require("mongoose");
const Song = require("../../Models/Song");

const generateStatistics = async (req, res) => {
  try {
    // 1. Total number of songs, distinct artists, albums, and genres
    const totalSongs = await Song.countDocuments({ delete_at: null });

    const totalArtists = (await Song.distinct("artist", { delete_at: null }))
      .length;
    const totalAlbums = (await Song.distinct("album", { delete_at: null }))
      .length;
    const totalGenres = (await Song.distinct("genre", { delete_at: null }))
      .length;

    // 2. Number of songs in every genre
    const genreCounts = await Song.aggregate([
      { $match: { delete_at: null } },
      { $group: { _id: "$genre", count: { $sum: 1 } } },
    ]);

    // 3. Number of songs and albums each artist has
    const artistCounts = await Song.aggregate([
      { $match: { delete_at: null } },
      {
        $group: {
          _id: "$artist",
          totalSongs: { $sum: 1 },
          totalAlbums: { $addToSet: "$album" }, // Group unique albums for each artist
        },
      },
      {
        $project: {
          totalSongs: 1,
          totalAlbums: { $size: "$totalAlbums" }, // Get the count of distinct albums
        },
      },
    ]);

    // 4. Number of songs in each album
    const albumCounts = await Song.aggregate([
      { $match: { delete_at: null } },
      { $group: { _id: "$album", count: { $sum: 1 } } },
    ]);

    // Count soft-deleted songs
    const softDeletedSongsCount = await Song.countDocuments({
      delete_at: { $ne: null },
    });

    return res.json({
      totalSongs,
      totalArtists,
      totalAlbums,
      totalGenres,
      genreCounts,
      artistCounts,
      albumCounts,
      softDeletedSongsCount,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  generateStatistics,
};
