const Song = require("../../Models/Song");

// Create a new song
const createSong = async (req, res) => {
  try {
    const song = new Song(req.body);
    await song.save();
    return res.status(201).json(song);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

// List all songs
const listSongs = async (req, res) => {
  try {
    const { genre, artist, title } = req.query;
    const filterObject = { delete_at: null };
    console.log(req.query);

    if (genre) {
      filterObject.genre = { $regex: new RegExp(genre, "i") };
    }

    if (artist) {
      filterObject.artist = { $regex: new RegExp(artist, "i") };
    }

    if (title) {
      filterObject.title = { $regex: new RegExp(title, "i") };
    }
    const songs = await Song.find(filterObject);
    return res.status(200).json(songs);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

// Update a song by ID
const updateSong = async (req, res) => {
  try {
    const { id } = req.params;
    const song = await Song.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json(song);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

// Remove a song by ID
const removeSong = async (req, res) => {
  try {
    const { id } = req.params;
    await Song.findByIdAndUpdate(id, { delete_at: new Date() }, { new: true });
    return res.status(200).json({ message: "Song removed successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createSong,
  listSongs,
  updateSong,
  removeSong,
};
