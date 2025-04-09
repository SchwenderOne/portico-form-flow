
#!/bin/bash

# Make the script executable
chmod +x run-tests.js

echo "Running Vitest tests..."

# Run tests without coverage
node run-tests.js

# If you want to run with coverage:
# node run-tests.js --coverage

