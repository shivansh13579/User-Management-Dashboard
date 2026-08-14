import { useState } from 'react';

const EMPTY_FORM = {
  name: '',
  email: '',
  phone: '',
  company: '',
  street: '',
  city: '',
  zipcode: '',
  lat: '',
  lng: '',
};

function toFormState(user) {
  if (!user) return EMPTY_FORM;
  return {
    name: user.name || '',
    email: user.email || '',
    phone: user.phone || '',
    company: user.company || '',
    street: user.address?.street || '',
    city: user.address?.city || '',
    zipcode: user.address?.zipcode || '',
    lat: user.address?.geo?.lat ?? '',
    lng: user.address?.geo?.lng ?? '',
  };
}

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Name is required';
  if (!form.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Enter a valid email address';
  }
  if (!form.phone.trim()) errors.phone = 'Phone is required';
  if (!form.city.trim()) errors.city = 'City is required';
  if (!form.zipcode.trim()) errors.zipcode = 'Zipcode is required';
  if (form.lat && isNaN(Number(form.lat))) errors.lat = 'Latitude must be a number';
  if (form.lng && isNaN(Number(form.lng))) errors.lng = 'Longitude must be a number';
  return errors;
}

export default function UserForm({ initialUser, onSubmit, submitLabel = 'Save', serverError }) {
  const [form, setForm] = useState(toFormState(initialUser));
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      company: form.company.trim(),
      address: {
        street: form.street.trim(),
        city: form.city.trim(),
        zipcode: form.zipcode.trim(),
        geo: {
          lat: form.lat ? Number(form.lat) : null,
          lng: form.lng ? Number(form.lng) : null,
        },
      },
    };

    setSubmitting(true);
    try {
      await onSubmit(payload);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {serverError && <div className="error-banner">{serverError}</div>}

      <div className="section-title">Basic details</div>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="name">Name *</label>
          <input id="name" name="name" value={form.name} onChange={handleChange} />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div className="field">
          <label htmlFor="email">Email *</label>
          <input id="email" name="email" type="email" value={form.email} onChange={handleChange} />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="field">
          <label htmlFor="phone">Phone *</label>
          <input id="phone" name="phone" value={form.phone} onChange={handleChange} />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>
        <div className="field">
          <label htmlFor="company">Company</label>
          <input id="company" name="company" value={form.company} onChange={handleChange} />
        </div>
      </div>

      <div className="section-title">Address</div>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="street">Street</label>
          <input id="street" name="street" value={form.street} onChange={handleChange} />
        </div>
        <div className="field">
          <label htmlFor="city">City *</label>
          <input id="city" name="city" value={form.city} onChange={handleChange} />
          {errors.city && <span className="error">{errors.city}</span>}
        </div>
        <div className="field">
          <label htmlFor="zipcode">Zipcode *</label>
          <input id="zipcode" name="zipcode" value={form.zipcode} onChange={handleChange} />
          {errors.zipcode && <span className="error">{errors.zipcode}</span>}
        </div>
      </div>

      <div className="section-title">Geo coordinates</div>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="lat">Latitude</label>
          <input id="lat" name="lat" value={form.lat} onChange={handleChange} />
          {errors.lat && <span className="error">{errors.lat}</span>}
        </div>
        <div className="field">
          <label htmlFor="lng">Longitude</label>
          <input id="lng" name="lng" value={form.lng} onChange={handleChange} />
          {errors.lng && <span className="error">{errors.lng}</span>}
        </div>
      </div>

      <button type="submit" className="btn btn-primary" disabled={submitting}>
        {submitting ? 'Saving...' : submitLabel}
      </button>
    </form>
  );
}
