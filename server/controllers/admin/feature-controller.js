const Feature = require("../../models/Feature");

const addFeatureImage = async (req, res) => {
  const { image } = req.body;

  const featureImages = new Feature({
    image,
  });

  await featureImages.save();

  res.status(201).json({
    success: true,
    data: featureImages,
  });
};

const getFeatureImages = async (req, res) => {
  const images = await Feature.find({});

  res.status(200).json({
    success: true,
    data: images,
  });
};

module.exports = { addFeatureImage, getFeatureImages };
