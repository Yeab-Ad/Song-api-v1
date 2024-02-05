const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  album: { type: String, required: true },
  genre: { type: String, required: true },
  delete_at: { type: Date, default: null },
  update_at: { type: Date, default: null },
  created_at: { type: Date, default: Date.now },
});

const Song = mongoose.model("Song", songSchema);

module.exports = Song;
