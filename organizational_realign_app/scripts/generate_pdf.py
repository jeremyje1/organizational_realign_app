from fpdf import FPDF
import os

# Get the directory of the current script
script_dir = os.path.dirname(os.path.abspath(__file__))
# Go up one level to get to the project root
root_dir = os.path.dirname(script_dir)
# Set paths relative to root directory
logo_path = os.path.join(root_dir, 'public', 'images', 'optimized-hero-logo-60.jpg')
output_path = os.path.join(root_dir, 'public', 'downloads', 'NorthPath_Strategies_Profile.pdf')

# Ensure downloads directory exists
os.makedirs(os.path.dirname(output_path), exist_ok=True)

# Define the PDF content
content = """
NorthPath Strategies: Company Profile

About NorthPath Strategies
NorthPath Strategies specializes in strategically realigning and redefining organizational systems and structures to unlock leaders' potential and empower effective execution. We partner with forward-thinking organizations committed to operational excellence, clear strategic direction, and sustainable systemic change.

Our Mission
To redefine and realign organizational structures and systems, enabling leaders to thrive, execute effectively, and achieve sustained success.

Our Vision
To become the preferred strategic partner in driving systemic and structural transformations that empower organizations to achieve operational clarity, effectiveness, and resilience.

Core Services Offered
1. Systemic Realignment and Structural Transformation
- Organizational Structure Optimization
- Strategic Systems Redesign
- Performance Alignment and Accountability

2. Operational Excellence
- Process and Workflow Realignment
- Efficiency and Productivity Enhancement
- Sustainable Change Implementation

3. Strategic Execution Support
- Frameworks for Strategy Implementation
- Realignment of Resources and Capabilities
- Integrated Systems for Performance Management

Our Approach
NorthPath Strategies focuses on systemic solutions, aligning organizational structures with strategic priorities:
- Diagnosis and Analysis
- Strategic Realignment
- Execution Facilitation
- Long-term Sustainability

What Sets Us Apart
- Strategic Focus on Systems and Structures
- Integrated, Systemic Approach
- Empowering Leadership Execution
- Enduring Impact

Industries Served
- Higher Education Institutions
- Nonprofit Organizations
- Government Agencies
- Corporate Enterprises

Contact Information
Website: northpathstrategies.org
Email: info@northpathstrategies.org
Social Media:
- LinkedIn
- Twitter
- Facebook

NorthPath Strategies: Redefining Systems, Empowering Leaders.
"""

# Create the PDF
pdf = FPDF()
pdf.add_page()

# Try to add the logo if it exists
try:
    if os.path.exists(logo_path):
        pdf.image(logo_path, x=10, y=10, w=50)
    else:
        print(f"Warning: Logo file not found at {logo_path}")
except Exception as e:
    print(f"Error adding logo: {e}")

# Set font and size
pdf.set_font("Arial", size=12)

# Add space for logo
pdf.ln(35)

# Add title with larger font
pdf.set_font("Arial", 'B', 16)
pdf.cell(0, 10, "NorthPath Strategies: Company Profile", ln=True, align='C')
pdf.ln(5)

# Reset to normal font
pdf.set_font("Arial", size=12)

# Add content - split by lines for better formatting
for line in content.split('\n'):
    if line.strip() and not line.strip().startswith('NorthPath Strategies: Company Profile'):
        # Check if it's a section header
        if line.strip() and not line.strip().startswith('-') and not line.strip().startswith('1.') and not line.strip().startswith('2.') and not line.strip().startswith('3.'):
            if line.strip() == "About NorthPath Strategies" or line.strip() == "Our Mission" or line.strip() == "Our Vision" or line.strip() == "Core Services Offered" or line.strip() == "Our Approach" or line.strip() == "What Sets Us Apart" or line.strip() == "Industries Served" or line.strip() == "Contact Information":
                pdf.ln(5)
                pdf.set_font("Arial", 'B', 14)
                pdf.cell(0, 10, line.strip(), ln=True)
                pdf.set_font("Arial", size=12)
            else:
                pdf.multi_cell(0, 10, line.strip())
        else:
            # This is a list item
            pdf.multi_cell(0, 10, line.strip())

# Save the PDF to file
pdf.output(output_path)

print(f"PDF created successfully at {output_path}")
print(f"Current working directory: {os.getcwd()}")
print(f"Root directory: {root_dir}")
print(f"Logo path: {logo_path}")
print(f"Exists? {os.path.exists(logo_path)}")
print(f"Download dir exists? {os.path.exists(os.path.dirname(output_path))}")
