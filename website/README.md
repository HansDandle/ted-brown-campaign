# Ted Brown Campaign Website

A modern, responsive website for Ted Brown's U.S. Senate campaign in Texas, rebuilt from the original WordPress site with contemporary web technologies.

## Features

### Modern Design
- **Clean, Professional Layout**: Modern card-based design with smooth animations
- **Fully Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **Fast Loading**: Optimized HTML, CSS, and JavaScript for quick page loads
- **Accessibility**: Built with accessibility best practices

### Key Sections
- **Hero Section**: Compelling introduction with Ted Brown's key message
- **About**: Biographical information and experience
- **Platform**: Detailed policy positions on key issues
- **Quotes**: Inspirational quotes from historical figures
- **Contact**: Easy ways to get in touch
- **Support**: Donation and volunteer opportunities

### Platform Pages
Individual detailed pages for each policy position:
- Healthcare (Free-market solutions)
- Taxes (Repeal income tax, abolish IRS)
- Immigration (Ellis Island-style system)
- Foreign Policy (Non-intervention)
- Gun Rights (2nd Amendment protection)
- War on Drugs (End prohibition)
- Justice Reform (End asset forfeiture)
- Education (Abolish Dept. of Education)
- Police Reform (End qualified immunity)

## Technology Stack

- **HTML5**: Semantic markup for better SEO and accessibility
- **CSS3**: Modern styling with CSS Grid, Flexbox, and CSS variables
- **Vanilla JavaScript**: Lightweight, fast interactions without frameworks
- **Font Awesome**: Professional icons throughout the site
- **Google Fonts**: Inter font family for clean, readable typography

## File Structure

```
website/
├── index.html              # Main homepage
├── css/
│   └── styles.css          # All styling
├── js/
│   └── main.js            # Interactive functionality
├── images/                 # Image assets (placeholder folder)
└── platform/              # Individual platform pages
    ├── healthcare.html
    ├── taxes.html
    ├── immigration.html
    └── [other platform pages]
```

## Getting Started

1. **Open the website**: Simply open `index.html` in any modern web browser
2. **Local development**: Use a local web server for best results:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```
3. **View**: Navigate to `http://localhost:8000` in your browser

## Customization

### Colors
The website uses CSS custom properties (variables) for easy color customization:
```css
:root {
    --primary-color: #1e81cf;    /* Main blue */
    --secondary-color: #0f4b7a;  /* Darker blue */
    --accent-color: #ffd700;     /* Gold accent */
    --text-color: #333;          /* Dark text */
    --light-text: #666;          /* Light text */
}
```

### Content
- **Main content**: Edit `index.html`
- **Platform content**: Edit files in the `platform/` directory
- **Styling**: Modify `css/styles.css`
- **Functionality**: Update `js/main.js`

### Adding Images
1. Place images in the `images/` folder
2. Update the HTML to reference your images:
   ```html
   <img src="images/ted-brown-photo.jpg" alt="Ted Brown">
   ```
3. Replace the placeholder profile photo in the hero section

## Key Features

### Navigation
- **Fixed navigation bar** with smooth scrolling to sections
- **Mobile hamburger menu** for smaller screens
- **Active section highlighting** as you scroll

### Interactive Elements
- **Hover effects** on cards and buttons
- **Smooth animations** when elements come into view
- **Scroll-to-top button** appears after scrolling down
- **Mobile-friendly touch interactions**

### Performance
- **Lazy loading** ready for images
- **Throttled scroll events** for smooth performance
- **Minimal dependencies** for fast loading
- **Optimized CSS** with efficient selectors

## Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## SEO Features

- **Semantic HTML5** structure
- **Meta tags** for social media sharing
- **Descriptive alt text** for images
- **Proper heading hierarchy**
- **Clean URLs** for platform pages

## Accessibility

- **Keyboard navigation** support
- **Screen reader friendly** with ARIA labels
- **High contrast ratios** for readability
- **Focus indicators** for interactive elements

## Analytics Integration

The JavaScript includes placeholder functions for adding analytics tracking:
- Donation button clicks
- Social media shares
- Platform page visits
- Contact form submissions

To add Google Analytics:
1. Include the Google Analytics script in the `<head>`
2. Update the tracking functions in `main.js`

## Social Media Integration

Social sharing buttons are included for:
- Facebook sharing
- Twitter sharing
- Direct links to campaign social media pages

## Deployment

### GitHub Pages
1. Push to a GitHub repository
2. Enable GitHub Pages in repository settings
3. Select source as main branch

### Netlify
1. Connect your GitHub repository
2. Set build command: (none needed)
3. Set publish directory: `/`

### Traditional Web Hosting
1. Upload all files to your web server
2. Ensure `index.html` is in the root directory
3. Update any absolute paths if needed

## Maintenance

### Content Updates
- **News/Updates**: Add to the main page or create a blog section
- **Platform changes**: Edit the relevant platform page
- **Contact info**: Update in both `index.html` and platform pages

### Security
- **Regular backups**: Keep backups of your content
- **HTTPS**: Ensure your hosting supports SSL certificates
- **Contact form**: If adding server-side forms, implement proper validation

## Future Enhancements

Potential additions for future versions:
- **News/Blog section** for campaign updates
- **Event calendar** for campaign appearances
- **Photo gallery** from campaign events
- **Newsletter signup** form
- **Volunteer portal** with more detailed forms
- **Press kit** section for media
- **Endorsements** page

## License

This website template is created for Ted Brown's campaign. The code structure can be adapted for other political campaigns with appropriate modifications to content and branding.

## Support

For technical questions about this website, contact the development team or refer to the documentation in the code comments.

---

**Vote Ted Brown for U.S. Senator - Liberty for each, for all, and forever!**