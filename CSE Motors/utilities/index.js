const formatUSD = (value) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
    value
  );

const formatMiles = (value) => Number(value).toLocaleString('en-US');

const vehicleDetailHTML = (v) => `
  <article class="vehicle-detail" aria-labelledby="vehicle-title">
    <div class="inspection-banner" role="note" aria-live="polite">
      This vehicle has passed inspection by an ASE-certified technician.
    </div>
    <div class="vehicle-media">
      <img src="${v.image}" alt="${v.year} ${v.make} ${v.model}">
      <div class="vehicle-thumbs" aria-label="Additional photos">
        <img src="${v.image}" alt="${v.make} ${v.model} view 1">
        <img src="${v.image}" alt="${v.make} ${v.model} view 2">
        <img src="${v.image}" alt="${v.make} ${v.model} view 3">
      </div>
    </div>
    <div class="vehicle-info">
      <h1 id="vehicle-title">${v.year} ${v.make} ${v.model}</h1>
      <div class="vehicle-price">
        <div class="price-badge">No-Haggle Price</div>
        <div class="price-value">${formatUSD(v.price)}</div>
      </div>
      <div class="vehicle-meta">
        <p><strong>Mileage:</strong> ${formatMiles(v.mileage)} miles</p>
        <p><strong>MPG:</strong> ${v.mpg || 'N/A'}</p>
      </div>
      <ul class="vehicle-specs">
        <li><strong>Exterior Color:</strong> ${v.extColor}</li>
        <li><strong>Interior Color:</strong> ${v.intColor}</li>
        <li><strong>Fuel Type:</strong> ${v.fuelType}</li>
        <li><strong>Drivetrain:</strong> ${v.drivetrain}</li>
        <li><strong>Transmission:</strong> ${v.transmission}</li>
        <li><strong>VIN:</strong> ${v.vin}</li>
        <li><strong>Classification:</strong> ${v.classification}</li>
      </ul>
      <p class="vehicle-desc">${v.description}</p>
      <div class="vehicle-actions">
        <a class="btn btn-primary" href="#">Start My Purchase</a>
        <a class="btn" href="#">Schedule Test Drive</a>
        <a class="btn" href="#">Apply for Financing</a>
      </div>
      <div class="vehicle-contact">
        <p><strong>Call Us</strong> 801-396-7886</p>
        <p><strong>Visit Us</strong> 123 Main Street</p>
      </div>
    </div>
  </article>
`;

const classificationGridHTML = (vehicles) => `
  <div class="classification-grid">
    ${vehicles
      .map(
        (v) => `
      <article class="classification-card">
        <a class="card-link" href="/inv/detail/${v.inv_id}">
          <img src="${v.image}" alt="${v.year} ${v.make} ${v.model}">
          <div class="card-body">
            <h2 class="card-title">${v.year} ${v.make} ${v.model}</h2>
            <p class="card-price">${formatUSD(v.price)}</p>
          </div>
        </a>
      </article>
    `
      )
      .join('')}
  </div>
`;

module.exports = { formatUSD, formatMiles, vehicleDetailHTML, classificationGridHTML };
