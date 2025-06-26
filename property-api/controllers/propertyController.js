const Property = require('../models/property');

exports.createProperty = async (req, res) => {
  try {
    const { title, description, price, location } = req.body;
    const image = req.file?.filename;

    const property = new Property({
      user: req.user.id,
      title,
      description,
      price,
      location,
      image,
    });

    await property.save();
    res.status(201).json(property);
  } catch (err) {
    res.status(500).json({ msg: 'Error creating property', error: err.message });
  }
};

exports.getProperties = async (req, res) => {
  const properties = await Property.find({ user: req.user.id });
  res.json(properties);
};

exports.getPropertyById = async (req, res) => {
  const property = await Property.findOne({ _id: req.params.id, user: req.user.id });
  if (!property) return res.status(404).json({ msg: 'Property not found' });
  res.json(property);
};

exports.updateProperty = async (req, res) => {
  const { title, description, price, location } = req.body;
  const updates = { title, description, price, location };

  if (req.file) updates.image = req.file.filename;

  const property = await Property.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    updates,
    { new: true }
  );

  if (!property) return res.status(404).json({ msg: 'Property not found or unauthorized' });
  res.json(property);
};

exports.deleteProperty = async (req, res) => {
  const property = await Property.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  if (!property) return res.status(404).json({ msg: 'Property not found' });
  res.json({ msg: 'Property deleted' });
};
