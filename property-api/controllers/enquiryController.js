const Enquiry = require('../models/enquiry');

exports.createEnquiry = async (req, res) => {
  const enquiry = new Enquiry({ user: req.user.id, message: req.body.message });
  await enquiry.save();
  res.json(enquiry);
};

exports.getEnquiries = async (req, res) => {
  const enquiries = await Enquiry.find({ user: req.user.id });
  res.json(enquiries);
};

exports.updateEnquiry = async (req, res) => {
  const enquiry = await Enquiry.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    { message: req.body.message },
    { new: true }
  );
  res.json(enquiry);
};

exports.deleteEnquiry = async (req, res) => {
  try {
      const enquiryId = req.params.id;
      await Enquiry.findByIdAndDelete(enquiryId);
      res.status(200).json({ message: 'Enquiry deleted successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
};
