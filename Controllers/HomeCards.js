const HomeCard = require("../Models/HomeCards");
// Create a new card
const createCard = async (req, res) => {
  const { title, description } = req.body;
  try {
    const newCard = new HomeCard({
      title,
      description,
    });
    await newCard.save();
    console.log("annocemfghj   3");
    res.redirect("/api/getCards");
    console.log("annocemfghj   4");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all cards
const getCards = async (req, res) => {
  try {
    const cards = await HomeCard.find();
    res.render("cards", { cards });
    console.log(cards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Frontend
const getCardsJson = async (req, res) => {
  try {
    console.log("cards are here");
    const cards = await HomeCard.find();
    res.status(200).json(cards);
    console.log(cards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single card by ID
const getCardById = async (req, res) => {
  console.log("getCardById here", req.params);
  try {
    const card = await HomeCard.findById(req.params.id);
    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }
    res.render("updatecard", { card });
    console.log("rendered");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a card by ID
const updateCard = async (req, res) => {
  console.log("you will update here");
  try {
    const { title, description } = req.body;

    const updatedCard = await HomeCard.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true }
    );
    if (!updatedCard) {
      return res.status(404).json({ message: "Card not found" });
    }
    const cards = await HomeCard.find();
    res.render("cards", { cards });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a card by ID
const deleteCard = async (req, res) => {
  try {
    const deletedCard = await HomeCard.findByIdAndDelete(req.params.id);
    if (!deletedCard) {
      return res.status(404).json({ message: "Card not found" });
    }
    const cards = await HomeCard.find();
    res.render("cards", { cards });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCard,
  getCards,
  getCardById,
  updateCard,
  deleteCard,
  getCardsJson,
};
