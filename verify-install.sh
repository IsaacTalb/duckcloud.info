#!/bin/bash
# Installation Verification Script
# Run: chmod +x verify-install.sh && ./verify-install.sh

echo "🦆 Duck Cloud Website - Installation Verification"
echo "=================================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

checks_passed=0
checks_total=0

# Function to check if command exists
check_command() {
  if command -v $1 &> /dev/null; then
    echo -e "${GREEN}✓${NC} $1 is installed: $($1 --version 2>&1 | head -n 1)"
    ((checks_passed++))
  else
    echo -e "${RED}✗${NC} $1 is NOT installed"
  fi
  ((checks_total++))
}

# Function to check if file exists
check_file() {
  if [ -f "$1" ]; then
    echo -e "${GREEN}✓${NC} $1 exists"
    ((checks_passed++))
  else
    echo -e "${RED}✗${NC} $1 does NOT exist"
  fi
  ((checks_total++))
}

# Function to check if directory exists
check_dir() {
  if [ -d "$1" ]; then
    echo -e "${GREEN}✓${NC} $1/ directory exists"
    ((checks_passed++))
  else
    echo -e "${RED}✗${NC} $1/ directory does NOT exist"
  fi
  ((checks_total++))
}

echo "📋 System Requirements:"
echo "-----------------------"
check_command node
check_command npm
check_command git
echo ""

echo "📁 Project Structure:"
echo "--------------------"
check_file "package.json"
check_file "tsconfig.json"
check_file "tailwind.config.ts"
check_file "next.config.js"
check_dir "src"
check_dir "public"
echo ""

echo "📂 Source Directories:"
echo "---------------------"
check_dir "src/app"
check_dir "src/components"
check_dir "src/types"
check_dir "src/utils"
check_dir "src/hooks"
echo ""

echo "📚 Documentation Files:"
echo "----------------------"
check_file "README.md"
check_file "SETUP.md"
check_file "DEVELOPMENT.md"
check_file "QUICK_REFERENCE.md"
check_file "API_INTEGRATION.md"
check_file "INDEX.md"
echo ""

echo "⚙️  Configuration Files:"
echo "----------------------"
check_file ".eslintrc.json"
check_file ".prettierrc"
check_file ".gitignore"
check_file ".env.example"
echo ""

echo "📦 Dependencies:"
echo "---------------"
if [ -d "node_modules" ]; then
  echo -e "${GREEN}✓${NC} node_modules/ exists"
  ((checks_passed++))
  echo "  Installed packages: $(ls -1 node_modules | wc -l)"
else
  echo -e "${YELLOW}⚠${NC} node_modules/ NOT found"
  echo "  Run: npm install"
fi
((checks_total++))
echo ""

echo "🧪 Quick Tests:"
echo "---------------"
if [ -f "package.json" ]; then
  if grep -q '"dev"' package.json; then
    echo -e "${GREEN}✓${NC} npm run dev script exists"
    ((checks_passed++))
  fi
  if grep -q '"build"' package.json; then
    echo -e "${GREEN}✓${NC} npm run build script exists"
    ((checks_passed++))
  fi
  if grep -q '"lint"' package.json; then
    echo -e "${GREEN}✓${NC} npm run lint script exists"
    ((checks_passed++))
  fi
fi
checks_total=$((checks_total + 3))
echo ""

echo "=================================================="
echo "✅ Verification Complete!"
echo ""
echo "Results: ${GREEN}${checks_passed}${NC}/${checks_total} checks passed"
echo ""

if [ $checks_passed -eq $checks_total ]; then
  echo -e "${GREEN}🎉 Everything looks good!${NC}"
  echo ""
  echo "Next steps:"
  echo "1. npm install        (if node_modules not found)"
  echo "2. npm run dev        (start development server)"
  echo "3. Open http://localhost:3000"
  echo ""
  exit 0
else
  echo -e "${YELLOW}⚠️  Some checks failed${NC}"
  echo ""
  echo "Troubleshooting:"
  echo "1. Ensure Node.js v18+ is installed"
  echo "2. Run: npm install"
  echo "3. Check documentation in README.md"
  echo ""
  exit 1
fi
