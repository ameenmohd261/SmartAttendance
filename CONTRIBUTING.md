# Contributing to Smart Attendance System

Thank you for considering contributing to the Smart Attendance System! This document provides guidelines for contributing to the project.

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them get started
- Focus on constructive feedback
- Respect different viewpoints and experiences

## How to Contribute

### Reporting Bugs

Before creating a bug report:
1. Check existing issues to avoid duplicates
2. Verify you're using the latest version
3. Test with a clean installation

When reporting a bug, include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Browser and OS information
- Console error messages

### Suggesting Features

Feature suggestions are welcome! Please:
1. Check if the feature already exists
2. Describe the feature clearly
3. Explain the use case
4. Consider implementation complexity

### Pull Requests

1. **Fork the repository**
   ```bash
   git clone https://github.com/ameenmohd261/SmartAttendance.git
   ```

2. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the code style guidelines
   - Add comments for complex logic
   - Update documentation if needed

4. **Test your changes**
   ```bash
   npm run build
   ```

5. **Commit your changes**
   ```bash
   git commit -m "Add: brief description of your changes"
   ```
   
   Commit message format:
   - `Add:` for new features
   - `Fix:` for bug fixes
   - `Update:` for updates to existing features
   - `Docs:` for documentation changes
   - `Refactor:` for code refactoring

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Open a Pull Request**
   - Provide a clear description
   - Reference related issues
   - Include screenshots for UI changes

## Development Guidelines

### Code Style

- Use 2 spaces for indentation
- Use semicolons
- Use single quotes for strings
- Use meaningful variable names
- Add JSDoc comments for functions

### Component Structure

```javascript
// Imports
import React, { useState, useEffect } from 'react';
import './Component.css';

// Component
const Component = ({ props }) => {
  // State and hooks
  const [state, setState] = useState(null);
  
  // Effects
  useEffect(() => {
    // Effect logic
  }, []);
  
  // Event handlers
  const handleEvent = () => {
    // Handler logic
  };
  
  // Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
};

export default Component;
```

### CSS Guidelines

- Use BEM naming convention when possible
- Keep selectors simple and specific
- Use CSS variables for repeated values
- Ensure responsive design (mobile-first approach)
- Test on multiple screen sizes

### Testing

Currently, the project doesn't have automated tests. Contributors are encouraged to:
- Manually test all changes
- Test on multiple browsers
- Test responsive design
- Verify face recognition functionality

## Project Structure

```
src/
├── components/     # React components
├── utils/          # Utility functions
├── data/           # Data schemas and samples
├── App.jsx         # Main app component
├── main.jsx        # Entry point
└── index.css       # Global styles
```

## Areas for Contribution

### High Priority
- Backend API implementation
- Database integration
- Enhanced security features
- User management system
- Automated testing

### Medium Priority
- Performance optimizations
- Additional export formats (Excel, PDF)
- Advanced analytics
- Email notifications
- Multi-language support

### Good First Issues
- UI improvements
- Documentation updates
- Bug fixes
- Accessibility improvements
- Code refactoring

## Development Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Download models:
   ```bash
   ./download-models.sh
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Questions?

- Open an issue for questions
- Check existing documentation
- Review closed issues for similar questions

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT License).

Thank you for contributing! 🎉
