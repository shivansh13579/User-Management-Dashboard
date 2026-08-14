const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateUserPayload(req, res, next) {
  const { name, email, phone, address } = req.body;
  const errors = [];

  if (!name || !name.trim()) errors.push('Name is required');
  if (!email || !email.trim()) {
    errors.push('Email is required');
  } else if (!EMAIL_RE.test(email)) {
    errors.push('Email format is invalid');
  }
  if (!phone || !phone.trim()) errors.push('Phone is required');

  if (!address || typeof address !== 'object') {
    errors.push('Address is required');
  } else {
    if (!address.city) errors.push('Address city is required');
    if (!address.zipcode) errors.push('Address zipcode is required');
    if (address.geo) {
      const { lat, lng } = address.geo;
      if (lat !== undefined && isNaN(Number(lat))) errors.push('Address geo.lat must be a number');
      if (lng !== undefined && isNaN(Number(lng))) errors.push('Address geo.lng must be a number');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  next();
}

module.exports = { validateUserPayload };
