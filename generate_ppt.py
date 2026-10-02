from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN

def create_presentation():
    prs = Presentation()
    
    # Define standard layout indexes
    TITLE_SLIDE = 0
    BULLET_SLIDE = 1
    SECTION_HEADER = 2
    BLANK = 6
    
    def set_slide_background(slide, r, g, b):
        background = slide.background
        fill = background.fill
        fill.solid()
        fill.fore_color.rgb = RGBColor(r, g, b)

    # 1. Title Slide
    slide = prs.slides.add_slide(prs.slide_layouts[TITLE_SLIDE])
    set_slide_background(slide, 10, 25, 47)  # Dark Blue
    title = slide.shapes.title
    subtitle = slide.placeholders[1]
    
    title.text = "MAASA Web Platform"
    title.text_frame.paragraphs[0].font.color.rgb = RGBColor(255, 255, 255)
    title.text_frame.paragraphs[0].font.bold = True
    
    subtitle.text = "Medi-Caps University Sports Club\nNext-Gen Web Architecture & Features"
    subtitle.text_frame.paragraphs[0].font.color.rgb = RGBColor(200, 200, 200)

    # 2. Introduction
    slide = prs.slides.add_slide(prs.slide_layouts[BULLET_SLIDE])
    title = slide.shapes.title
    body = slide.shapes.placeholders[1]
    title.text = "Introduction & Vision"
    
    tf = body.text_frame
    tf.text = "What is MAASA?"
    p = tf.add_paragraph()
    p.text = "Medi-Caps Aeronautics and Space Association, also officially representing the Medi-Caps University Sports Club."
    p.level = 1
    
    p = tf.add_paragraph()
    p.text = "Platform Goals:"
    p.level = 0
    p = tf.add_paragraph()
    p.text = "A centralized digital presence for all sports activities, achievements, and member directories."
    p.level = 1
    p = tf.add_paragraph()
    p.text = "Secure, manageable admin dashboard for content updates without requiring code changes."
    p.level = 1

    # 3. Key Features
    slide = prs.slides.add_slide(prs.slide_layouts[BULLET_SLIDE])
    title = slide.shapes.title
    title.text = "Key Features"
    tf = slide.shapes.placeholders[1].text_frame
    
    features = [
        ("Dynamic Event Management", "Schedule and display upcoming and past events."),
        ("Achievements Wall", "Highlight exceptional talents and awards with images and details."),
        ("Categorized Media Gallery", "Grouped photo and video albums by event, with multi-upload support."),
        ("Member Directory", "Searchable database of Core, Faculty, Team, and Alumni members."),
        ("SEO Optimized", "Fully indexed for 'Sports club medicaps' and 'MAASA' keywords.")
    ]
    
    tf.text = "Platform Capabilities:"
    for title_text, desc in features:
        p = tf.add_paragraph()
        p.text = title_text
        p.level = 0
        p = tf.add_paragraph()
        p.text = desc
        p.level = 1

    # 4. Technical Architecture
    slide = prs.slides.add_slide(prs.slide_layouts[BULLET_SLIDE])
    title = slide.shapes.title
    title.text = "Technical Stack"
    tf = slide.shapes.placeholders[1].text_frame
    
    tf.text = "Modern & Scalable Architecture:"
    
    p = tf.add_paragraph()
    p.text = "Frontend: React.js & Vite"
    p.level = 0
    p = tf.add_paragraph()
    p.text = "Fast rendering, component-based UI, highly responsive design."
    p.level = 1
    
    p = tf.add_paragraph()
    p.text = "Backend as a Service: Supabase"
    p.level = 0
    p = tf.add_paragraph()
    p.text = "PostgreSQL Database for structured data (Events, Members, Achievements)."
    p.level = 1
    p = tf.add_paragraph()
    p.text = "Supabase Auth & Storage for media hosting."
    p.level = 1

    p = tf.add_paragraph()
    p.text = "Deployment: Vercel"
    p.level = 0
    p = tf.add_paragraph()
    p.text = "Continuous integration and global CDN delivery."
    p.level = 1

    # 5. Security & RBAC
    slide = prs.slides.add_slide(prs.slide_layouts[BULLET_SLIDE])
    title = slide.shapes.title
    title.text = "Security & Access Control"
    tf = slide.shapes.placeholders[1].text_frame
    
    tf.text = "Role-Based Access Control (RBAC):"
    
    p = tf.add_paragraph()
    p.text = "Superuser & Faculty:"
    p.level = 0
    p = tf.add_paragraph()
    p.text = "Full control: Insert, Update, and Delete operations."
    p.level = 1
    
    p = tf.add_paragraph()
    p.text = "Technical Team:"
    p.level = 0
    p = tf.add_paragraph()
    p.text = "Content management (Insert/Update) but restricted from Deleting."
    p.level = 1
    
    p = tf.add_paragraph()
    p.text = "Row-Level Security (RLS):"
    p.level = 0
    p = tf.add_paragraph()
    p.text = "All database queries are protected at the Postgres level. Only authorized roles can alter data."
    p.level = 1

    # 6. Conclusion
    slide = prs.slides.add_slide(prs.slide_layouts[TITLE_SLIDE])
    set_slide_background(slide, 10, 25, 47)
    title = slide.shapes.title
    subtitle = slide.placeholders[1]
    
    title.text = "Thank You"
    title.text_frame.paragraphs[0].font.color.rgb = RGBColor(255, 255, 255)
    
    subtitle.text = "Ready to elevate Medi-Caps Sports to the next level."
    subtitle.text_frame.paragraphs[0].font.color.rgb = RGBColor(200, 200, 200)

    prs.save('MAASA_Presentation.pptx')
    print("Presentation created successfully as MAASA_Presentation.pptx")

if __name__ == '__main__':
    create_presentation()
